import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/CachedImage.js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getMealData(item.idMeal);
    },[])

    const getMealData = async (id)=>{
        try{
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //   console.log('got meal data: ',response.data);
        if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
        }
        }catch(err){
        console.log('error: ',err.message);
        }
    }

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
        return match[1];
        }
        return null;
    }

    const handleOpenLink = url=>{
        Linking.openURL(url);
    }

return (
    <View className="flex-1 bg-white relative">
        <StatusBar style={"light"} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
        
        {/* recipe image */}
        <View className="flex-row justify-center">
            <CachedImage
                uri={item.strMealThumb}
                style={{width: wp(100), height: hp(50),borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
            />
        </View>

        {/* back button and favs heart icon*/}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} />
            </TouchableOpacity>
        </Animated.View>




        </ScrollView>
    </View>
    
)
}