import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/Home';
import TAB from './TAB';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalkthroughScreen from "./src/screens/WalkthroughScreen";
import WalkthroughAppConfig from "./Components/WalkthroughAppConfig";
import DynamicAppStyles from "./Styles/DynamicAppStyles";
import Signin from'./src/screens/Signin'
import EditProfile from './src/screens/EditProfile';
import Register from'./src/screens/Register'
import SplashScreen from './src/screens/SplashScreen';
import PostsScreen from './src/screens/PostsScreen'
import AskDevice from './src/screens/AskDevice';
import Cart from './src/screens/Cart';
import Test from './src/screens/Test';
import Checkout from './src/screens/Checkout';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
 import Notification from './src/screens/Notification';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUpNurse from './src/screens/SignUpNurse'
 import { I18nManager } from 'react-native';
import SignupScreen from './src/screens/SignUp';
import NurseProfilePatientView from './src/screens/NurseProfilePatientView';
import Articels from './src/screens/Articels';
import Shift from './src/screens/AskNurseShift';
import Chat from './src/screens/Chat';
import EditInfo from './src/screens/nurseProfile/EditInfo';
import AddExperience from './src/screens/nurseProfile/AddExperience';
import AddDate from './src/screens/nurseProfile/AddDate';
import AddEducation from './src/screens/nurseProfile/AddEducation';
import OldNotification from './src/screens/OldNotification';
import NurseNotification from './src/screens/NurseNotification';
import  PatientPosts from './src/screens/PatientPosts';
import AskNurseService from './src/screens/AskNurseService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./src/screens/PatientProfile";
import NurseProfile from "./src/screens/nurseProfile/NurseProfile";
const Stack = createNativeStackNavigator();
export default function App() {
  I18nManager.forceRTL(true);
    const [isLoading, setIsLoading] = useState(true);

    const [patientData, setPatientData] = useState(null);
    let myData = null;
  
    useEffect(() => {
    console.disableYellowBox = true;

      const getPatientData = async () => {
        const patient = await AsyncStorage.getItem('data');
        if (patient) {
          const datapatient = JSON.parse(patient);
          setPatientData(datapatient);
        }
      };
      getPatientData();
    }, []);
  
    if (patientData) {
      myData = patientData;
    }
    
    console.log(myData , "my data")
    const getProfileScreen = () => {
      if (myData && myData.role === 'patient') {
        return { component: ProfileScreen };
      } else {
        return { component: NurseProfile };
      }
    };

  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin}  options={{  headerShown:false}}/>
          <Stack.Screen options={{ headerShown: false }} name="navbar" component={TAB} /> 
          <Stack.Screen name="Walkthrough" options={{ headerShown: false }}>
            {() => <WalkthroughScreen appConfig={WalkthroughAppConfig} appStyles={DynamicAppStyles} />}
          </Stack.Screen>
          <Stack.Screen name="Nursique" component={SplashScreen} options={{  headerShown:false}} /> 
          <Stack.Screen name="SignUp" component={SignupScreen} options={{ title: " تسجيل " }} />
          <Stack.Screen name="test" component={Test} />
          <Stack.Screen name="Register" component={Register} options={{ title: " تسجيل كمستخدم" }} />
          <Stack.Screen name="SignupNurse" component={SignUpNurse} options={{ title: "تسجيل كممرض" }} /> 
          <Stack.Screen name="PostsScreen" component={PostsScreen} options={{ title: "posts" }} />
          <Stack.Screen name="cart" component={Cart} options={{ title: "السلة" }} />
          <Stack.Screen name="notification" component={Notification} options={{ title: "الإشعارات" }} />
          <Stack.Screen name="allNotification" component={OldNotification} options={{ title: "الإشعارات" }} />
          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="nurseProfile" component={NurseProfilePatientView} />
          <Stack.Screen name="askDevice" component={AskDevice} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Articel" component={Articels} />
          <Stack.Screen name="AskNurseShift" component={Shift} />
          <Stack.Screen name="NurseNotification" component={NurseNotification}/>
          <Stack.Screen name="Chat" component={Chat} options={{ title: "محادثة" }}/>
          <Stack.Screen name="dates" component={AddDate}/>
          <Stack.Screen name="education" component={AddEducation}/>
          <Stack.Screen name="experience" component={AddExperience}/>
          <Stack.Screen name="info" component={EditInfo}/>
          <Stack.Screen name="patientPost" component={PatientPosts} />
          <Stack.Screen name="service" component={AskNurseService} />
          <Stack.Screen name="Profile" {...getProfileScreen()} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});