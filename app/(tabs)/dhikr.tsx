import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Button, StyleSheet, Image, Platform, Text, View, TouchableOpacity, Alert} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



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
      </View>
      <View style={styles.circle}>
        <TouchableOpacity onPress={handlePress}>
          <Image
          source={require('@/assets/images/Circle_(transparent).png')}
          style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity  onPress={reset}>
        <Text>Reset</Text>
      </TouchableOpacity>
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
    justifyContent:'center',
    alignItems: 'center',
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
