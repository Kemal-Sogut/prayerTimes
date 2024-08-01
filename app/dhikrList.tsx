import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

const DATA = [
    {
      id: '01',
      title: 'SubhannAllah',
      count:3,
    },
    {
      id: '02',
      title: 'Elhamdulillah',
      count:33,
    },
    {
      id: '03',
      title: 'Allahuekber',
      count:333,
    },
  ];
  type ItemProps = {title: string, count:number};
  const Item = ({title, count}:ItemProps) => (
    <View style={styles.container}>
      <Text style={styles.list}> {title}: {count}</Text>
    </View>
  );
const dhikrList = () => {
  return (
    
      <FlatList 
        data={DATA}
        renderItem={({item}) => <Item  title={item.title} count={item.count}/>}
        keyExtractor={item => item.id}
        
      />
    
  )
}

export default dhikrList


const styles = StyleSheet.create({
    list:{
        alignItems:'center',
        justifyContent:'center',
        fontSize:22,
        
       
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
  });