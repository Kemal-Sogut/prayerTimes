import { Button, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

// Define the types for the items in the list
interface ItemProps {
  id: string;
  title: string;
  count: number;
}

// Initial data array
const initialData: ItemProps[] = [
  {
    id: '01',
    title: 'SubhannAllah',
    count: 3,
  },
  {
    id: '02',
    title: 'Elhamdulillah',
    count: 33,
  },
  {
    id: '03',
    title: 'Allahuekber',
    count: 333,
  },
];

const DhikrList = () => {
  // useState hook to manage the data array
  const [data, setData] = useState<ItemProps[]>(initialData);

  // Function to update the count of an item to 10 based on its id
  const updateCount = (id: string) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, count: 10 } : item
    );
    setData(updatedData);
  };

  // Component to render each item in the list
  const Item: React.FC<ItemProps> = ({ title, count, id }) => (
    <View style={styles.itemContainer}>
      {/* TouchableOpacity component to detect touch events */}
      <TouchableOpacity onPress={() => updateCount(id)}>
        {/* Text component to display the title and count */}
        <Text style={styles.list}>{title}: {count}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link href={'/'}>
          <Text>Edit</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FlatList component to render the list of items */}
      <FlatList
        data={data}
        renderItem={({ item }) => <Item id={item.id} title={item.title} count={item.count} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

export default DhikrList

// Styles for the components
const styles = StyleSheet.create({
  list: {
    fontSize: 22,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
