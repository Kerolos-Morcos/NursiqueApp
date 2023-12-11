import React, { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllCartProduct, deleteFromCart, emptyFromCart, addQuantity, minusQuantity } from '../../Redux/Slices/CartSlice'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from  '../../src/screens/Theme'
const DetailsScreen = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const plant = route.params;
  const { cart } = useSelector(state => state.CartSlice);
  console.log(cart)
  const dispatch = useDispatch();
 

 

  useEffect(() => {
    if (cart) {
      const quantity = cart.reduce((total, item) => total + item.quantitycart, 0);
      const price = cart.reduce((total, item) => total + item.totalPrice, 0);
      AsyncStorage.setItem('CartTotalQuantity',JSON.stringify(quantity));
      AsyncStorage.setItem('CartTotalPrice',JSON.stringify(price));
    }
  }, [cart]);

  const handledeletefromCart = (product) => {
    console.log(product)
    dispatch(deleteFromCart(product._id))
  }

  const handleAddQ = (itemQ) => {
    dispatch(addQuantity(itemQ))
  }

  const handleMinusQ = (itemQ) => {
    // console.log(itemQ)
    dispatch(minusQuantity(itemQ)).then(()=> dispatch(getAllCartProduct()))
  }
  // function handleMinusQ(itemQ){
  //   // console.log(itemQ)
  //   dispatch(minusQuantity(itemQ))
  // }

  useEffect(() => {
    dispatch(getAllCartProduct())
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:'white',
      }}>
      {/* <View style={style.header}>
        <Icon style={style.icon} name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon style={style.icon} name="shopping-cart" size={28} />
      </View> */}
      <Animatable.View animation="fadeInUpBig" style={style.footer}>
        <ScrollView>
      <View style={style.imageContainer}>
        <Image source={require('../../assets/devicetooljpg.jpg')} style={{resizeMode: 'contain', flex: 1}} />
      </View>
      <View style={style.detailsContainer}>
   
      {cart && cart.map((item) => {   
  return (
    <View style={{paddingHorizontal: 20, marginTop: 10, marginBottom:25}}>
      <View style={{
        flexDirection:"row",            
        justifyContent:'space-between'
      }}>
       <Image style={style.imgDev} source={{ uri: `http://${IP}:3500/${item.image[0]}`}} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color:"#041858" , marginTop:35}}>   {item.name} </Text>
    
        <Icon style={{marginTop:-10 }}  name="delete" color={'#d13333'} size={33} onPress={()=>{handledeletefromCart(item)}} />
      
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* <Counter count={count} setCount={setCount} /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={style.borderBtn} onPress={()=>{handleMinusQ(item._id)}}>
        <Text style={style.borderBtnText}>-</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          marginHorizontal: 10,
          fontWeight: 'bold',
        }}>
        {item.quantitycart}
      </Text>
      <TouchableOpacity style={style.borderBtn} onPress={()=>{handleAddQ(item._id)}}>
        <Text style={style.borderBtnText}>+</Text>
      </TouchableOpacity>
    </View>
        <View>
          <Text
            style={{color:'#041585', fontSize: 18, fontWeight: 'bold'}}>
            السعر:{" "}  {item.totalPrice}ج
          </Text>
        </View>
      </View>
    </View>
  );
})}
        <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('askDevice')} style={style.button}>
          <Text style={style.buttonText}>اشترى</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};



const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 3,
    width:200,
    height:200,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf:"center",
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 3,
    marginBottom: 3,
    borderRadius: 20,
    marginTop: 20,
    paddingTop: 20,
  },
  imgDev:{
    width: 90,
    height:90
      },
  // line: {
  //   width: 25,
  //   height: 2,
  //   backgroundColor:'#000',
  //   marginBottom: 5,
  //   marginRight: 3,
  // },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
   height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#041858',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
 icon:{
color:"#041858"
  },
  footer: {
    flex: 10,
    // backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  priceTag: {
    backgroundColor: '#041858',
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
   
  },
  button: {
    backgroundColor: '#041585a9',
    paddingVertical: 15,
    // paddingHorizontal: 150,
  
    borderRadius: 50,
    width:300,
    elevation:3
   

    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DetailsScreen;