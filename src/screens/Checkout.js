import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { CreditCardInput } from '@jaidis/react-native-credit-card-input';
import { Avatar, Card, IconButton, Paragraph, Button } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPatient } from '../../Redux/Slices/PatientSlice'
import { checkOutOrder } from '../../Redux/Slices/OrderSlice'
import { useDispatch, useSelector } from 'react-redux';
import { IP } from  '../../src/screens/Theme'

const Checkout = ({navigation}) => {
  const [cardDetails, setCardDetails] = useState({});
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const dispatch = useDispatch();
   const patient = useSelector(state => state.PatientSlice.patient)
  console.log(patient);
  function CheckOut(id) {
    // console.log(id);
    dispatch(checkOutOrder(id))

  }
  useEffect(() => {
    dispatch(getPatient());
    //  console.log(patientes.data)
  }, [])

  useEffect(() => {
    const data = async () => {
      const tokenString = await AsyncStorage.getItem('data');
      const CartTotalQuantity = await AsyncStorage.getItem('CartTotalQuantity');
      const CartTotalPrice = await AsyncStorage.getItem('CartTotalPrice');
      const parsedUser = JSON.parse(tokenString);
      setUser(patient)
      setTotalPrice(CartTotalPrice)
      setTotalQuantity(CartTotalQuantity)
      console.log(CartTotalQuantity);
    };
    data();
  }, []);




  const handleCheckout = (id) => {
    console.log(id)
    dispatch(checkOutOrder(id))

    // Alert.alert(
    //   'Payment Successful',
    //   'Thank you for your purchase!',
    //   [{ text: 'OK' }],
    //   { cancelable: false }
    // );
    console.log(cardDetails);
    // Show an alert to the user
    const alertPromise = new Promise((resolve, reject) => {
      Alert.alert(
        'نحن نقوم بخدمتك في اسرع وقت ',
        'شكرا لطلبك  خدمتك قيد التقدم الان',
        [{ text: 'OK', onPress: () => resolve(
        //  navigation.goBack(),
        //  navigation.goBack()
         navigation.navigate("الرئيسية")
        ) }],
        { cancelable: false }
      );
    });
  };
  // imageFront = require('../../assets/download.png');

  return (
    <ScrollView>
      <View style={styles.container}>
        <CreditCardInput onChange={form => setCardDetails(form.values)}
          //  cardImageFront={{ uri : 'https://cdn.dribbble.com/users/2266184/screenshots/6670557/tomorrow-01_4x.jpg'}}
          allowScroll={true}
        />

      </View>
      <View>

        <View style={styles.container2}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader} >
              <Text style={styles.cardHeaderText}>تفاصيل الطلب</Text>
              <View style={styles.hr}></View>
            </View>
            <View style={styles.cardSectionDet}>
              <Text style={styles.cardSecText}>
                <Text style={styles.SecText}>
                  الإسم:  {" "}
                </Text>
                {user.name}
              </Text>

              <Text style={styles.cardSecText}>
                <Text style={styles.SecText}>
                  عدد الأجهزة: {" "}
                </Text>
                {totalQuantity}
              </Text>
              {/* <Text style={styles.cardHeaderText}>تفاصيل الطلب</Text> */}
              <View style={styles.hr}></View>
            </View>
            {user.order && user.order.length > 0 && user.order[user.order.length - 1].products.map((item) => {
              return (
                <View style={styles.cardSectionDev}>
                <View style={styles.SectionDev}>
                  <Image style={styles.imgDev} source={{ uri: `http://${IP}:3500/${item.image[0]}`}} />
                  <Text style={styles.Dev}>
                     {item.name}
                    
                  </Text>
  
                  <Text style={styles.Dev}>
                  {item.price}ج.م
                  </Text>
                  <Text style={styles.Dev}>
                  {item.totalPrice}ج.م
                  </Text>
                </View>
                <View style={styles.hr}></View>
              </View>
              );
            })}

            {/* <View style={styles.cardSectionDev}>
              <View style={styles.SectionDev}>
                <Image style={styles.imgDev} source={require('../../assets/med.png')} />
                <Text style={styles.Dev}>
                  جهاز قياس الضغط</Text>

                <Text style={styles.Dev}>
                  700ج
                </Text>
              </View>
              <View style={styles.hr}></View>
            </View> */}
            <View style={styles.totalpriceSec}>
              <Text style={styles.totalprice}>
                التكلفة الإجمالية:{" "}
                <Text style={styles.total}>{totalPrice} ج.م</Text>
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{handleCheckout(user.order && user.order.length > 0 && user.order[user.order.length - 1]._id)}} style={styles.button}>
              <Text style={styles.buttonText}>اتمم الطلب</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 50
  },
  container2: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    // height:400,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    elevation: 5
  },
  cardContainer: {
    // backgroundColor: '#faf8f8',
    width: 300,
    // paddingHorizontal:30,
    paddingTop: 20
    // marginTop: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: 50,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#041585',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    marginVertical: 10,
    left: 20
  },
  cardHeader: {
    //  position:'relative',
    // top: -150,
    left: 20
  },
  cardSectionDet: {
    // position:'relative',
    // top: -150,
    left: 20,
    //  padding:13
  },
  cardSecText: {
    // textAlign: 'center',
    // fontStyle: "italic",
    fontSize: 15,
    padding: 13
  },
  SecText: {
    // textAlign: 'center',
    // fontStyle: "italic",
    color: '#041585',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardSectionDev: {
    // position:'relative',
    // top: -150,
    // left:20,
    // padding: 10,
    // flexDirection:"row",
    // justifyContent:"space-between"
  },
  SectionDev: {
    // position:'relative',
    // top: -150,
    left: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imgDev: {
    width: 90,
    height: 90
  },
  Dev: {
    marginTop: 35,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#041585'
  },
  totalpriceSec: {
    padding: 13,
    paddingHorizontal: 50
  },
  totalprice: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#041585'
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
    width: 300,
    elevation: 3



  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});



export default Checkout;