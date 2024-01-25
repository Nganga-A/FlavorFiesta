import { View, Text,Image, StatusBar } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {
    return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
        <StatusBar style="light"/>

        {/* logo image with rings */}
        <View className="bg-white/20 rounded-full">
        <View className="bg-white/20 rounded-full">
            <Image source={require('../../assets/images/welcome.png')}
                style={{width:200, height: 200}} />
        </View>
        </View>

        {/* tittle and punchline */}
        <View className="flex items-center space-y-2">
            <Text className="font-bold text-6xl text-white tracking-widest">
                Foody
            </Text>
            <Text className="font-medium text-white tracking-widest text-lg">
                Food is always right
            </Text>
        </View>



    </View>
    )
}

