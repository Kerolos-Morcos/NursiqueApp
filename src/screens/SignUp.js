import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground , Image } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const SignupScreen = ({navigation}) => {
  const handlePatientCardPress = () => {
    // Handle patient card press event
  };

  const handleNurseCardPress = () => {
    
   };

  return (
    <ImageBackground source={require('../images/R.png')} style={[styles.backgroundImage]} blurRadius={70}>
      <View style={styles.container}>
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.cardTitle}>  انضم كمستخدم</Text>
          <View style={{flexDirection:'row'}}>

          <View style={styles.after} />
          <View style={styles.after} />
          <View style={styles.after} />
          </View>
          <Text style={styles.cardDescription}> انضم الينا الان واستفيد من خدمات الموقع وسرعة الوصول</Text>
        </TouchableOpacity> */}
        <View style={styles.card}>
      <View>
      <Image
        source={require('../images/care66.jpg')}
        style={[styles.image ]}
      />
      <Text style={styles.title}>انضم كمستخدم</Text>
      </View>
      <Text style={styles.subtitle}> انضم الينا الان واستفيد من خدمات الموقع وسرعة الوصول</Text>
      
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
  <FontAwesome5Icon name="arrow-left" size={16} color="white" style={styles.icon} />
  {/* <Text style={styles.buttonText}></Text> */}
</TouchableOpacity>
    </View>
        {/* <TouchableOpacity style={styles.card} activeOpacity={0.7}
        // underlayColor='red'
        onPress={() => navigation.navigate("SignupNurse")}>
          <Text style={styles.cardTitle}>انضم كممرض</Text>
          <View style={{flexDirection:'row'}}>

          <View style={styles.after} />
          <View style={styles.after} />
          <View style={styles.after} />
          </View>
          <Text style={styles.cardDescription}>سجل كممرض وحقق ارباح اكثر من خلال نشاطك علي الموقع </Text>
        </TouchableOpacity> */}
        <View style={styles.card}>
      <View>
      <Image
        source={require('../images/eee.jpeg')}
        style={styles.image}
      />
      <Text style={styles.title}>انضم كممرض </Text>
      </View>
      <Text style={styles.subtitle}>سجل كممرض وحقق ارباح اكثر من خلال نشاطك علي الموقع</Text>
      
<TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("SignupNurse")}>
  <FontAwesome5Icon name="arrow-left" size={16} color="white" style={styles.icon} />
  {/* <Text style={styles.buttonText}></Text> */}
</TouchableOpacity>
    </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //  opacity: 0.7 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    
  },
  card: {
    borderWidth: 0,
    //  borderColor: 'transparent',
    alignItems: 'center',
borderBottomWidth:2,
borderBottomColor:'#00000031',
    // width: '100%',
    // backgroundColor: '#0415855f',
    borderRadius: 8,
    // padding: 16,
    marginBottom: 16,
    // shadowColor: '#041585',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: 4,
    padding: 25,
  },
  cardTitle: {
    fontSize: 20,
    // fontWeight: 600,
    marginBottom: 3,
    color: '#04581d',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 4,
    // textShadowColor: 'rgba(245, 241, 241, 0.5)',
    textAlign:'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#041585',
    width:250,
    textAlign:'center',
    // fontWeight: '600',
  //  lineHeight: 170 / 10,
  marginVertical: 10
  },
  after: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#00000093',
    marginLeft: 5,
    
  },
  ////////////new style////////////
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin:20,
    width:300,
    height:200
  },
  image: {
    width: 130,
    height: 220,
    // marginBottom: 16,
    // borderRadius: 10,
    position:'absolute',
top:-10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: -60,
    margin: 10,
    textAlign:"center",
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    marginTop: 16,
    width:160,
    textAlign:"center",
    marginLeft:135
  },
  button: {
    backgroundColor: '#041585',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width:50,
    height:50, 
    position:'absolute',
    top:165,
    left:260
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    marginTop: 5,
    // alignSelf:"center"
  },
});

export default SignupScreen;