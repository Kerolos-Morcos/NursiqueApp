import React, { useState, useEffect , useLayoutEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, Image, ImageBackground, TextInput, StyleSheet , ScrollView , TouchableOpacity } from 'react-native';
import { Avatar, Card, Button , Paragraph } from 'react-native-paper';
import ModalComponent from '../../Components/Modal';
import axios from 'axios';
import { IP } from '../../src/screens/Theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }) => {
  const [topRated, getTopRated] = useState([])
  const [userRole, userRoleState] = useState('')
  const [patientData, setPatientData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  let myData = null;

  useEffect(() => {
    const getPatientData = async () => {
      const patient = await AsyncStorage.getItem('data');
      const data = JSON.parse(patient);
      setPatientData(data);
    };
    getPatientData();
  }, []);

  if (patientData) {
    myData = patientData;
  }

// console.log(myData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP}:3500/nurse/top-rated`);
        console.log(response.data.data , "my top rated")
        getTopRated(response.data.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    // console.log(topRated);

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={{ height: 255 }}
        onPress={() => navigation.navigate('NurseProfile')}
      >
        <View
          style={{
            backgroundColor: '#FEFEFE',
            height: 200,
            width: 190,
            borderRadius: 15,
            marginLeft: 20,
            padding: 5,
            paddingTop: -40,
            shadowColor: '#041858',
            elevation: 6,
          }}
        >
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: `http://${IP}:3500/${item.profile}` }}
              style={{
                width: '100%',
                borderRadius: 10,
                height: 150,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: -10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="star" color="#f5ca3c" size={20} />
                <Text style={{ marginLeft: 0 }}>{item.rates.toFixed(1)}</Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  fontSize: 15,
                  color: '#522289',
                  textAlign: 'center',
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <ScrollView>
    {/* <InformationCard /> */}
    
      <View 
        style={{ width: "100%", height: "100%" , backgroundColor: "white" }}
      >
      {/* start Appbar */}
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
            paddingHorizontal: 40,
          }}
        >
          <Icon
            name="stethoscope"
            size={33}
            color="#041858"
            
          />
         <TouchableOpacity onPress={ () => {
    navigation.navigate("Chat");
  }}>
      <Icon
        name="account-circle-outline"
        size={33}
        color="#041858"
        style={{ marginLeft: 230 }}
      />
    </TouchableOpacity>

        </View> */}
 {/* end Appbar */}


 {/* start ContentPage */}
        <View >


         {/* start mainSection */}
          <View style={styles.section1}>
          <Text style={{  marginTop: 50 , color: "white" , width:100   }}>
          مرحبا بكم فى تطبيق <Text style={{  fontWeight:700  }}>NurseQuie</Text> للخدمات التمريضية
          </Text>
          <Image source={require('../../assets/Medicalresearch.gif')} style={styles.image} />
         
          </View>
           {/* end mainSection */}


            {/* start serviceSection */}
        <View  style={{ 
          marginTop: 20, 
          justifyContent: 'center' , 
          alignItems: 'center', 
         display: 'flex'
  }}>
        <Text style={{ marginTop: 20 , fontSize:20  , fontWeight:'700' , borderBottomColor: '#041585' , borderBottomWidth: 2 }}>
خدماتنا      
  </Text>
        <Card style={{ margin:20 , width:300 ,  backgroundColor: '#041585' , color:'white' }}  >
    <Card.Title
       style={{ fontWeight: 700,
  fontSize: 200,
  backgroundColor: 'white',
  borderColor: '#041585',
  borderTopWidth:2,
  // borderBottomColor: '#041585',
  borderTopColor: '#04158546',
  borderTopRightRadius: 12,
  borderTopLeftRadius: 12 }}
  titleStyle={{ fontWeight: 'bold' , fontSize: 19}}
      title="الأجهزة"
   
      left={(props) => <Avatar.Icon {...props} icon="medical-bag" color="white" style={{ backgroundColor: "#00A02B" }}
      
       />}
    />
     <View style={{ backgroundColor: 'white' , justifyContent:'center'}}>
    <Image
        source={require('../../assets/medical-tools.png')}
        style={{ width: 200, height: 200, marginLeft:50  }}
      />
    </View>
    <Card.Content>
   
      <Paragraph style={{color:'white' , fontSize: 15 , marginTop: 20  }}>  توفير أجهزة طبية عالية الجودة للمستأجر بتكلفة مناسبة</Paragraph>
    </Card.Content>
    <Card.Actions>
    {myData && myData.role === 'nurse' ? null : (
  <TouchableOpacity onPress={() => { navigation.navigate("جهاز طبي"); }}>
    <Button labelStyle={{ color: 'white' , fontWeight:'bold'  }} style={{ borderWidth: 1, borderColor: "#0bc13c" , backgroundColor: '#0bc13c' }}>عرض</Button>
  </TouchableOpacity>
)}
    </Card.Actions>
  </Card>
  <Card style={{ margin:20 , width:300 ,  backgroundColor: '#041585' , color:'white' }} >
    <Card.Title
    style={{ fontWeight: 'bold',
  fontSize: 200,
  backgroundColor: 'white',
  borderColor: '#041585',
  borderTopWidth:2,
  // borderBottomColor: '#041585',
  borderTopColor: '#041585',
  borderTopRightRadius: 12,
  borderTopRightRadius: 12,
  borderTopLeftRadius: 12 }}
  titleStyle={{ fontWeight: 'bold' , fontSize: 19 }}
      title="الممرضين"
      left={(props) => <Avatar.Icon {...props} icon="doctor" color="white" style={{ backgroundColor: "#00A02B" }} />}
    />
     <View style={{width:'100%' , backgroundColor: 'white' , justifyContent:'center'}}>
    <Image
        source={require('../../assets/teeam.png')}
        style={{ width: 200, height: 200 , marginLeft:50 }}
      />
    </View>
    <Card.Content>
      <Paragraph style={{color:'white' , fontSize: 15 , marginTop: 20 }}>ممرضين ذو خبرات و كفاءة عالية </Paragraph>
    </Card.Content>
    <Card.Actions>
    {myData && myData.role === 'nurse' ? null : (
  <TouchableOpacity onPress={() => { navigation.navigate("ممرض"); }}>
    <Button labelStyle={{ color: 'white' , fontWeight:'bold'  }} style={{ borderWidth: 1, borderColor: "#0bc13c" , backgroundColor: '#0bc13c' }}>عرض</Button>
  </TouchableOpacity>
)}
    </Card.Actions>
  </Card>
  <Card style={{ margin:20 , width:300 ,  backgroundColor: '#041585' , color:'white' }}>
    <Card.Title
     style={{ fontWeight: 'bold',
  fontSize: 200,
  backgroundColor: 'white',
  borderColor: '#041585',
  borderTopWidth:2,
  // borderBottomColor: '#041585',
  borderTopColor: '#041585',
  borderTopRightRadius: 12,
  borderTopRightRadius: 12,
  borderTopLeftRadius: 12 }}
  titleStyle={{ fontWeight: 'bold' , fontSize: 19 }}
      title="الطلبات"
    
      left={(props) => <Avatar.Icon {...props} icon="comment-text-multiple-outline" color="white" style={{ backgroundColor: "#00A02B" }} />}
    />
     <View style={{width:'100%' , backgroundColor: 'white' , justifyContent:'center'}}>
    <Image
        source={require('../../assets/discussion.png')}
        style={{ width: 200, height: 200, marginLeft:50 }}
      />
    </View>
    <Card.Content>
      <Paragraph style={{color:'white' , fontSize: 15 , marginTop: 20}}>تواصل مع الممرضين المتواجدين بموقعنا  لعرض طلبك</Paragraph>
    </Card.Content>
    <Card.Actions>
    {myData && myData.role === 'nurse' ? null : (
  <TouchableOpacity onPress={() => { navigation.navigate("طلبات"); }}>
    <Button labelStyle={{ color: 'white' , fontWeight:'bold'  }} style={{ borderWidth: 1, borderColor: "#0bc13c" , backgroundColor: '#0bc13c' }}>عرض</Button>
  </TouchableOpacity>
)}
    </Card.Actions>
  </Card>
        </View>
        {/* end serviceSection */}


        {/* start featuresSection */}
     <View  style={{ 
          marginTop: 20, 
          justifyContent: 'center' , 
          alignItems: 'center', 
         display: 'flex'}} >
<Text  style={{ marginTop: 20 , marginBottom:30 , fontSize:30  , fontWeight: '700' , borderBottomColor: '#041585' , borderBottomWidth: 2}}>
مميزاتنا      
  </Text>
  <Card.Title
    title="سرعة الاستجابة والردود من الممرضين "
    style={{  padding:30 , backgroundColor:'#04258943'}}
    left={(props) => <Avatar.Icon {...props} color="white" size={53}  icon="clock-fast"  style={{ borderRadius: 10 , elevation:5 , backgroundColor: '#041585' , shadowColor: '#0bc13c' , width:60, height:60}}  />}
  />
  
    <Card.Title
    title="أجهزة عالية الجودة وسرعة التوصيل "
    style={{ padding:30 ,  backgroundColor:'#0fc0533a'}}
    left={(props) => <Avatar.Icon {...props} color="white" size={53}  icon="truck-fast-outline"  style={{ borderRadius: 10 , elevation:5 , backgroundColor: '#041585' , shadowColor: 'black' , width:60, height:60}} />}
  />
    <Card.Title
    title="ممرضين متخصصين وذو خبرات عالية"
    style={{ padding:30 ,  backgroundColor:'#80890427'}}
    left={(props) => <Avatar.Icon {...props} color="white" size={53}  icon="account-group-outline"  style={{ borderRadius: 10 , elevation:5 , backgroundColor: '#041585' , shadowColor: '#0bc13c' , width:60, height:60}} />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />

     </View>
        {/* end featuresSection */}


 

 {/* start topRatedSection */}
 <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                marginTop: 20,
                marginBottom: 30,
                fontSize: 20,
                fontWeight: '700',
                borderBottomColor: '#041585',
                borderBottomWidth: 2,
              }}
            >
              الممرضين الأعلى تقييما
            </Text>

            <Carousel
              data={topRated}
              renderItem={renderItem}
              sliderWidth={300}
              itemWidth={200}
              onSnapToItem={(index) => setActiveSlide(index)}
              // layout='tinder'
            // style={{elevation:3}} 
            />

            <Pagination
              dotsLength={topRated.length}
              activeDotIndex={activeSlide}
              containerStyle={{ marginTop: -45 }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 3,
                backgroundColor: '#041585',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          {/* end topRatedSection */}
    {/* start contactSection */} 

    <View style={{ 
          marginTop: 20, 
          justifyContent: 'center' , 
          alignItems: 'center', 
         display: 'flex',
         marginBottom: 20
  }}>
    <Text  style={{ marginTop: 5 , marginBottom: 30, fontSize:30  , fontWeight: '700' , borderBottomColor: '#041585' , borderBottomWidth: 2}}>
تواصل معنا      
  </Text>
   {/* start mainSection */}
   <View style={{ justifyContent:'center',
   alignItems:'center'}}>
          <Image source={require('../../assets/Callcenter.gif')} style={{
             width:350,
             flexDirection: 'row',
  height:350,
  justifyContent:'center',
  alignSelf:'center',

  marginLeft:-25,
          }} />
       <Text style={{ margin: 15, fontWeight: 'bold' }}>
  <Text style={{position:'relative' , bottom:100 , left:0}}>
  <Icon
    name="phone"
    size={20}
    color="#041858"
  />{' '}
  +012785453534
  </Text>
  
</Text>
    <Text>     
         <Icon
    name="email"
    size={20}
    color="#041858"
  />{'  '}
  <Text style={{fontWeight: 'bold' , textDecorationLine: 'underline' , marginTop: -50 }}>
          nurseQuie@mail.com
         </Text>
         </Text>
          </View>
           {/* end mainSection */}
</View>
     {/* end contactSection */} 
     
        </View>
      </View>
    </ScrollView>
    
    {myData && myData.role === 'nurse' ? null : (
 <ModalComponent/>
)}

 </> 
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  section1:{
  flexDirection: "row",
  flex:1,
  width: '100%',
  justifyContent: 'space-between',
  backgroundColor: '#041858',
  padding:20,
 },
 image:{
  width:200,
  height:200,
  justifyContent:'center',
  alignSelf:'center',

  marginLeft:-25,
  // alignItems:"center"
 },

})