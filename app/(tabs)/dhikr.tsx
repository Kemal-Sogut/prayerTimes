import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Button, StyleSheet, Image, Platform, Text, View, TouchableOpacity, Alert} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';



export default function TabTwoScreen() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1);
  };
  const reset = () => {
    setCount(0);
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.dash}>
        <Text style={styles.dashText}>{count}</Text>
        <Link href="/dhikrList">
        
        <Text>List</Text></Link>
      </View>
      <View style={styles.circle}>
        <TouchableOpacity onPress={handlePress}>
          <Image
          source={require('@/assets/images/Circle_(transparent).png')}
          style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>

        <Button title='Reset'onPress={reset} />
        </View>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  dashText:{
    fontSize: 55,
  },
  dash:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  buttonContainer:{
    marginTop:20,
    color:' red',
  },
  container:{
    height:'100%',
  },
  circle:{
    flex:1,
    paddingBottom:100,
    justifyContent:'flex-end',
    alignItems: 'center',

 },
  image: {
    width: 200,
    height: 200,
  },
});
