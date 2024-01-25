import { View, Text, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios';

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

    useEffect(()=>{
      getCategories();
    },[])

    const handleChangeCategory = category=>{
      getRecipes(category);
      setActiveCategory(category);
      setMeals([]);
    }

    //get categories
    const getCategories = async () => {
      try{
        const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
        // console.log('got categories: ',response.data);
        if(response && response.data){
          setCategories(response.data.categories);
        }
      }catch(err){
        console.log('error: ',err.message);
      }
    }


  // const getRecipes = async (category="Beef")=>{
  //   try{
  //     const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  //     // console.log('got recipes: ',response.data);
  //     if(response && response.data){
  //       setMeals(response.data.meals);
  //     }
  //   }catch(err){
  //     console.log('error: ',err.message);
  //   }
  // }

  return (
    <View className="flex-1 bg-white">   
      <StatusBar style="dark"/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      className="space-y-6 pt-14"
      >

        {/*Avatar and bell icon*/}
        <View className="mx-4 flex-row justify-between items-center mb-2">
        <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(2.5)}} className="text-neutral-600">Hello, Abed!</Text>
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your own food,</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
            stay at <Text className="text-amber-400">home</Text>
          </Text>
      </View>

      {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(2)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

          {/* categories */}
            <View>
          { Categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} handleChangeCategory={handleChangeCategory} /> }

        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen