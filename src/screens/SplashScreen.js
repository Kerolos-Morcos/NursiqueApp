import React ,{useRef} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,  
     Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import MedicineBroImage from '../../assets/Medicine.gif';
// import SvgUri from 'react-native-svg-uri';
// import MedicineBroSvg from '../../assets/Medicine-bro.svg';
// import { Home } from 'react-native-feather';
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
 
    const opacity = new Animated.Value(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ).start();
    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#041858' barStyle="light-content"/>
        <View style={styles.header}>
            <Image 
                // animation="bounceIn"
                // duraton="1500"
                style={{width:370 , height:370 }}
                source={MedicineBroImage}
          
            />
            </View>
            
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
                
            }]}
            animation="fadeInUpBig">
            <Text style={styles.title}>اهلا بكم فى موقع خدمات طبية Nursique</Text>
           
            <View style={styles.button}>
            <TouchableOpacity onPress={() => {
  navigation.navigate('Signin');
  // onPressButton();
}}>
  {/* <View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}> */}
  <View>
    <Text style={styles.textSign}> 
    سجل الآن
    </Text>
  </View>             
</TouchableOpacity>

<Animated.View style={{ opacity }}>
  <MaterialIcons
    style={styles.next}
    name="leftcircleo"
    color="#00A02B"
    size={20}
  />
</Animated.View>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
    
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',

       paddingTop:30
  },
  footer: {
      flex: 1,
      // backgroundColor: '#fff',
      marginTop:30,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 40,
      // width: 370
  },
//   logo: {
//       width: height_logo,
//       height: height_logo
//   },
  title: {
      color: '#041858',
      fontSize: 28,
      fontWeight: 'bold',
      marginTop:20
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
    
      flexDirection:'row',
      marginTop: 30,
      justifyContent:'flex-end'
  },
  
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: '#00A02B',
      fontWeight: '900',
      fontSize:19
      
  },
  next:{
    marginTop:2,
    marginLeft:6
    
  }
});