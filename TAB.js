import React ,{useState, useEffect}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import PatientProfile from './src/screens/PatientProfile';
import Home from './src/screens/Home';
import Cart from './src/screens/Cart';
import Nurses from './src/screens/Nurses';
import Device from './src/screens/Devices';
import Test from './src/screens/Test';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PostsScreen from './src/screens/PostsScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Articels from './src/screens/Articels';
import NurseProfile from './src/screens/nurseProfile/NurseProfile';
import { TouchableOpacity } from 'react-native';
import Iconbar from "@expo/vector-icons/MaterialCommunityIcons";
function TAB({ navigation}) {
  const Tab = createBottomTabNavigator();
  const [patientData, setPatientData] = useState(null);
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
  console.log(myData)
  const profileScreen = myData && myData.role === 'patient' ? (
    <Tab.Screen name="جهاز طبي" component={Device} />
  ) : null;

  const Profile = myData && myData.role === 'patient' ? (
    <Tab.Screen name=" البروفايل" component={PatientProfile} />
      ) :  <Tab.Screen name=" البروفايل" component={NurseProfile}  options={{
        headerTitle: props => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
        </View>
      ),
      headerStyle: {
        height: 50,
      },
      }} />



  const testScreen = myData && myData.role === 'nurse' ? (
    <Tab.Screen name="مقالات" component={Articels} />
  ) : null;
  return (
    <GestureHandlerRootView style={styles.container}>
      <Tab.Navigator
        initialRouteName="الرئيسية" // set the default screen to Home
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'الرئيسية':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'طلبات':
                iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                break;
              case 'ممرض':
                iconName = focused ? 'medkit' : 'medkit-outline';
                break;
              case ' البروفايل':
                iconName = focused ? 'person-circle' : 'person-circle-outline';
                break;
              case 'جهاز طبي':
                iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
                break;
                case 'مقالات':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              default:
                iconName = focused ? 'home' : 'home-outline';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#7C7C7C',
          tabBarStyle: {
            backgroundColor: '#041585',
            height: 60,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        })}
      >
        <Tab.Screen name="ممرض" component={Nurses} />
        {/* <Tab.Screen name='جهاز طبي' component={Device} /> */}
        {profileScreen}
      {testScreen}
      <Tab.Screen
  name="الرئيسية"
  component={Home}
  options={{
    headerTitle: props => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Iconbar name="stethoscope"
            size={33}
            color="#041858"style={{ marginRight: 180 , marginLeft: 30 }} />
       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Iconbar name="account-circle-outline" size={33} color="#041858" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    height: 100,
  },
  }}
/>
        <Tab.Screen name="طلبات" component={PostsScreen} />
        {/* <Tab.Screen name=" البروفايل" component={PatientProfile} /> */}
        {/* <Tab.Screen name=" البروفايل" component={NurseProfile} /> */}
        {Profile}
        {/* <Tab.Screen name="test" component={Test} /> */}
      </Tab.Navigator>
      <View style={styles.activeTabIndicator} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: 5,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});

export default TAB;