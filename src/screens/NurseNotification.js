import React, { useEffect, useState } from 'react'
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import {  } from "react-native-gesture-handler";
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Card, IconButton, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
 import { getPatient } from '../../Redux/Slices/PatientSlice';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { IP } from  '../../src/screens/Theme'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";
import {getBookingNurse} from '../../Redux/Slices/PatientSlice';


export default function Notification({ Navigation }) {

  const navigation = useNavigation();
    // Socketr
    const API_URL = `http://${IP}:3500`;
    const Socket = io(API_URL);
  const patient = useSelector((state) => state.PatientSlice.patient);
  const dispatch = useDispatch();
   const [notificationBook, setNotificationBook] = useState([]);

   
   useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        if (tokenString) {
          const token = JSON.parse(tokenString);
          const decoded = jwtDecode(token);
          const nurseId = decoded.userid;
          // Further code using the `nurseId` variable
  
          Socket.on('connect', () => {
            console.log('Socket connected');
  
            Socket?.on("getNotificationBookNurse", (data) => {
              if (data.NurseId == nurseId) {
                setNotificationBook((prevNotifications) => {
                  const updatedNotifications = [...prevNotifications, data];
                  AsyncStorage.setItem('notificationBook', JSON.stringify(updatedNotifications));
                  return updatedNotifications;
                });
              }
            });
  
          });
          Socket.on('disconnect', () => {
            console.log('Socket.IO connection closed');
          });
        }
      } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
      }
    };
  
    fetchData();
  
    return () => {
      Socket.off('connect');
      Socket?.off("getNotificationBookNurse");
      Socket.off('disconnect');
    };
  }, []);
  
  const currentTime = moment.utc();
    const commentTimeFormatted = currentTime.format('YYYY-MM-DDTHH:mm:ss[Z]');
    // setcomments({ ...comments, [item._id]: comments[item._id] ? [...comments[item._id], comment] : [comment] });
    // setCommentTime({ ...commentTime, [item._id]: commentTime[item._id] ? [...commentTime[item._id], commentTimeFormatted] : [commentTimeFormatted] });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const not = await AsyncStorage.getItem("notificationBook");
            if (not) {
              const storedNotificationBook = JSON.parse(not);
              setNotificationBook(storedNotificationBook);
              // Move the second if statement here
              if (storedNotificationBook) {
                setNotificationBook(storedNotificationBook);
              }
            }
          } catch (error) {
            // Handle any errors that occur during the process
            console.error(error);
          }
        };
      
        fetchData();
      
        return () => {
          // Clean up any resources if needed
        };
      }, []);
      
       
      const acceptBooking = async (notification) => {
        console.log("acceptBooking..", notification.bookId);
        try {
          const response = await axios.put(`http://${IP}:3500/book/bookings/${notification.bookId}`, {
            status: "accepted"
          });
          console.log(response.data);
          dispatch(getBookingNurse());
        
          const updatedNotifications = notificationBook.filter((item) => item._id !== notification._id);
          setNotificationBook(updatedNotifications);
        
          const storedNotificationBook = await AsyncStorage.getItem("notificationBook");
          if (storedNotificationBook) {
            const parsedNotificationBook = JSON.parse(storedNotificationBook);
            const updatedLocalStorage = parsedNotificationBook.filter((item) => item._id !== notification._id);
            await AsyncStorage.setItem("notificationBook", JSON.stringify(updatedLocalStorage));
          }
        } catch (error) {
          console.error(error);
        }
      };
      
      const refuseBooking = async (notification) => {
        try {
          const updatedNotifications = notificationBook.filter((item) => item._id !== notification._id);
          setNotificationBook(updatedNotifications);
      
          const storedNotificationBook = await AsyncStorage.getItem("notificationBook");
          if (storedNotificationBook) {
            const parsedNotificationBook = JSON.parse(storedNotificationBook);
            const updatedLocalStorage = parsedNotificationBook.filter((item) => item._id !== notification._id);
            await AsyncStorage.setItem("notificationBook", JSON.stringify(updatedLocalStorage));
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
    <ScrollView>
      <View style={{
        marginTop: 20,
      }} >
        {notificationBook.map((notificationBook, index) => (
        <View style={styles.cardSectionNot}>
          <View style={styles.SectionNot}>
            <Image style={styles.imgNot}  source={{uri : `${notificationBook.status}`}} />
            <View style={styles.container}>
            <Text style={styles.Notf}>طلب {" "}
            <Text style={{fontWeight:'bold' , color:"#041585"}}>{notificationBook.patientName}</Text> {" "}
             منك خدمة شفت طويل </Text>
            <View style={styles.row}>
              <Text style={styles.Notftitle}>
              {notificationBook.times}
              </Text>
             </View>
             <View style={{flexDirection:'row' , justifyContent:'space-evenly' , width:'80%' , marginTop:-20 }}
             >
             <Button
              onPress={()=>{
                  acceptBooking(notificationBook)

              }}
              style={{backgroundColor:'#ffd000'  }}
              >
              <Text style={{color:'#041585' , fontWeight:'bold'}}>
              قبول
              </Text>
              
              </Button>
              <Button
                onPress={()=>{
                    refuseBooking(notificationBook)
                }}
                style={{backgroundColor:'#041585'  }}
              >
              <Text style={{color:'white' , fontWeight:'bold'}}>
              رفض
              </Text>
             
              </Button>
             </View>
            
              </View>
              </View>
              {/* <Text style={styles.time}>
                {getElapsedTime(item.createdAt)}
                </Text> */}
          </View>
        
        ))}
      </View>
      {/* <Button
  mode="contained"
  onPress={() => navigation.navigate('allNotification')}
  style={styles.viewAllButton}
>
  كل الاشعارات
</Button> */}
                
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  cardSectionNot: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 7,
    elevation: 5
  },
  viewAllButton: {
    marginTop: 10,
    backgroundColor: '#041585',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  SectionNot: {
    padding: 10,
    flexDirection: "row",
    // marginTop:300
    // justifyContent: "space-between",
    
  },
  Notf:{
    fontWeight: 'bold',
    fontSize: 19,
    color: '#041585',
  },
  imgNot: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#eee",
  },

  row: {
    // flexDirection: 'row',
    // backgroundColor:"red",
    // alignItems: 'center',
  },
  Notf: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    // backgroundColor:"red",
    // textAlign: 'right'
    marginTop:30,
    marginLeft:30
  },
  Notftitle: {
    marginTop: 35,
    fontSize: 16,
    // marginRight: -15,
    color: '#041585',
    // alignItems: 'center',
    flexWrap: 'wrap',
    // margin:15,
    
  },
  container: {
    // flexDirection: 'row',
    // alignItems: 'stretch',
  },
 
  time: {
    fontSize: 13,
    color: '#041585bb',
    // marginLeft:100
  },
});