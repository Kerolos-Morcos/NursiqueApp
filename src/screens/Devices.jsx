import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Card from './Card';
import axios from 'axios';
import { IP } from  '../../src/screens/Theme'
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
const Device = ({navigation}) => {
  const [arr, setArr] = useState([])
  const [searchText, setSearchText] = useState('')
  const { cart } = useSelector(state => state.CartSlice);
  const dispatch=useDispatch()
  const nav=useNavigation();
  useEffect(() => {
    axios.get(`http://${IP}:3500/device/getdevices`).then((res) => {
      setArr(res.data.data);
    }).catch((error) => {
      alert(error)
    });
    nav.setOptions({
      headerRight:()=><View><TouchableOpacity onPress={() => navigation.navigate('cart')} style={{  padding:20 }}>
      <AntDesign name="shoppingcart" size={32} color="white" style={{ backgroundColor: '#00A02B' ,width:50 , height:50 , borderRadius:50 , textAlign: 'center' , lineHeight:50}}  />
    </TouchableOpacity>
    <Badge
            visible={cart.length&&true}
            size={20}
            style={{ position: 'absolute', top: 25, right: 54 }}
          >
            {cart.length}
          </Badge>
    </View>
    })

  }, [cart]);


  function renderCard({ item }) {
    return <Card data={item} />
  }

  function handleSearch(text) {
    setSearchText(text)
  }

  function filteredData() {
    return arr.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  }

  return (
    <View style={styles.container}>
      
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData()}
        keyExtractor={(item) => item._id}
        renderItem={renderCard}
      />
    </View>
  );
}

const CartScreen = () => {
  return (
    <View>
      <Text>Cart Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius:15
  },
});

export default Device;