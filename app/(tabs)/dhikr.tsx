import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TouchableOpacity, Alert} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



export default function TabTwoScreen() {


  const handlePress = () => {
    Alert.alert('Image Pressed!', 'You pressed the image.');
  };


  return (
    <View>
      <View style={styles.circle}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('@/assets/images/Circle_(transparent).png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    flex: 1,
    
    justifyContent: 'center',
    
    alignItems:"center"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  border: {
    width:'100%',
    borderWidth:1,
    borderColor:'black'
  }
});
