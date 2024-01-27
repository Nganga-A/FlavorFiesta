import { View, Text, StatusBar, ScrollView, Image, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
import Loading from '../components/Loading';

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); 

    useEffect(()=>{
      getCategories();
      getRecipes();
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

    // New function for searching recipes
    const getSearchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (response && response.data) {
          setMeals(response.data.meals);
        }
      } catch (err) {
        console.log('error: ', err.message);
      } finally {
        setLoading(false);
      }
    };
    

    //get recipes
    const getRecipes = async (category="Beef")=>{
      try{
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        // console.log('got recipes: ',response.data);
        if(response && response.data){
          setMeals(response.data.meals);
        }
      }catch(err){
        console.log('error: ',err.message);
      }
    }

  return (
    <View style={{backgroundColor: '#F0F8FF' }} className="flex-1">   
      <StatusBar style="dark"/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      className="space-y-6 pt-7"
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
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={getSearchRecipe}
          />
          <TouchableOpacity onPress={() => getSearchRecipe(searchTerm)}>
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

          {/* categories */}
            <View>
          { Categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} searchTerm={searchTerm} />
        </View>

                {/* Loader */}
                {loading && <Loading size="large" className="mt-20" />}

        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen