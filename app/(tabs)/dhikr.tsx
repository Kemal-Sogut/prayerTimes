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
    <View style={styles.circle}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('@/assets/images/Circle_(transparent).png')}
          style={styles.image}
        />
      </TouchableOpacity>
    
    
      <div style={styles.border}>
        <View style={styles.border}>
          <Text>
            Test
          </Text>
        </View>
      </div>
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
    justifyContent: 'flex-end',
    paddingBottom: 100,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  plus: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24,
    color: 'black', // Adjust the color as needed
  },
  minus: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 24,
    color: 'black', // Adjust the color as needed
  },
  border: {
    width:'100%',
    borderWidth:1,
    borderColor:'black'

  }
});
