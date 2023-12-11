import React, { useEffect, useState } from 'react'
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import {  } from "react-native-gesture-handler";
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Card, IconButton, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPatient } from '../../Redux/Slices/PatientSlice';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { IP } from  '../../src/screens/Theme'
import moment from 'moment';
import jwtDecode from "jwt-decode";

 

export default function Notification() {
  const API_URL = `http://${IP}:3500`;
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
   
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const token = JSON.parse(tokenString);
    
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        // console.log('Patient ID:', patientId,token);
  
        const response = await axios.get(`http://${IP}:3500/notificationPost/getNotif?patientId=${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('API Response:', response);
        setNotifications(response.data.data);
      } catch (error) {
        console.log('Error:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    };
  
    getNotifications();
  }, []);
  
  

 
  return (
    <ScrollView>
      <View style={{ marginTop: 20 }}>
        {notifications.map((notification, index) => (
          <View style={styles.cardSectionNot} key={index}>
            <View style={styles.SectionNot}>
              <Image style={styles.imgNot} source={{ uri: `${notification.nurseImg}` }} />
              <View style={styles.container}>
                <Text style={styles.Notf}>
                  علق {notification.postNurseName} على الطلب الخاص بك.
                </Text>
                <View style={styles.row}>
                  <Text style={styles.Notftitle}>{notification.postTitle}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.time}>{moment(notification.createdAt).fromNow()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

  
  const styles = StyleSheet.create({
    cardSectionNot: {
      width: '100%',
      backgroundColor: 'white',
      marginBottom: 7,
      elevation: 5,
    },
    SectionNot: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Notf: {
      fontWeight: 'bold',
      fontSize: 19,
      color: '#041585',
    },
    imgNot: {
      width: 90,
      height: 90,
      borderRadius: 100 / 2,
    },
    container: {
      width: '70%',
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    Notftitle: {
      fontSize: 16,
      color: '#7b7b7b',
      fontWeight: 'bold',
      marginTop: 5,
      alignSelf: 'flex-start',
    },
    time: {
      alignSelf: 'flex-end',
      marginRight: 10,
      color: '#7b7b7b',
      marginTop: 5,
    },
  });