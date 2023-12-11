import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  onPress,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Button
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,

  Card,
} from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ion from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome5";
import { getPatient, getBookingNurse } from '../../Redux/Slices/PatientSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import ModalComponent from "../../Components/Modal";
import { IP } from '../../src/screens/Theme'
import jwtDecode from "jwt-decode";
import { Badge } from 'react-native-paper';
import io from 'socket.io-client';
import { decreaseNotificationCount, increaseNotificationCount } from '../../Redux/Slices/NotificationCountSlice';
import { decreaseNotification, increaseNotification } from '../../Redux/Slices/NotificationArrSlice';


//rating
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStars = Math.round(rating - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(filledStars)].map((_, i) => (
        <Icon name="star" key={`star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <Icon name="star-half" key={`half-star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon name="star-outline" key={`empty-star-${i}`} size={30} color="gold" />
      ))}
    </View>
  );
};



// end rating



// const direction = isRTL ? 'rtl' : 'ltr';

// import { I18nManager } from 'react-native';
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const notificationCount = useSelector((state) => state.notificationCount.notificationCount);
  console.log("notificationCount...", notificationCount);
  const notificationArr = useSelector((state) => state.notificationArr.notificationArr);
  const patient = useSelector((state) => state.PatientSlice.patient);
  // H
  const nursesBooking = useSelector((state) => state.PatientSlice.booking);
  console.log("nursesBooking...",nursesBooking);

  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
  const [notifications, setNotifications] = useState([]);
  // const [notificationNum, setNotificationNum] = useState([]);
  // useEffect(()=>{
  // },[])
  const [bookingUpdated, setBookingUpdated] = useState(false);

  useEffect(() => {
    dispatch(getPatient());
    dispatch(getBookingNurse())
    Socket.on('connect', () => {
      console.log('Socket connected');
      Socket?.on("getNotification", (data) => {
        setNotifications((prevNotifications) => {
          const updatedNotificationComment = [...prevNotifications, data];
          dispatch(increaseNotificationCount());
          dispatch(increaseNotification(data));
          AsyncStorage.setItem(
            "notificationComment",
            JSON.stringify(updatedNotificationComment)
          );
          // const notifi = await AsyncStorage.getItem("notificationComment");
          return updatedNotificationComment;
        });
      });
    });

    Socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    return () => {
      Socket.off('connect');
      Socket.off('getNotification');
      Socket.off('disconnect');
    };
  }, [dispatch, patient._id]);


  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  const [topRated, getTopRated] = useState([])
  // console.log(topRated);
  const [data, setData] = useState([]);
  console.log(topRated);
  // useEffect(() => {
  //  dispatch(getPatient());
  // }, [notificationCount]);
  // useEffect(() => {
  //   dispatch(getPatient());
  //  }, []);
  async function logout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('data');
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
      // Handle the error gracefully, such as showing an error message to the user
    }
  }

  const [rating, setRating] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const submitRating = (id) => {
    const patientId = patient._id
    const nurseId = id
    // console.log("nurseId....",id);
    console.log('Rating submitted:', rating, id, patientId);
    axios.put(`http://${IP}:3500/patient/addrate/${patientId}/${nurseId} `, { "rate": rating }).then((res) => {
      // console.log(res.data, "fghgjgfhj")
      dispatch(getBookingNurse())
    }).catch((error) => {
      alert(error)
    });
    setModalVisible(false);
  };

  const isValidRating = () => {
    return !isNaN(parseFloat(rating)) && rating >= 0 && rating <= 5;
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View>
            {notificationCount > 0 && (
              <Badge
                visible={true}
                size={20}
                style={{ position: 'absolute', top: 1, right: 19 }}
              >
                {notificationCount}
              </Badge>
            )}


            <Ion
              onPress={() => navigation.navigate("notification")}
              name="notifications"
              color="#041858"
              size={30}
              containerStyle={{
                position: "absolute",
                left: -10,
                top: 10,
                alignSelf: "left",
              }} // set the left value to -10
            />
          </View>
          <Font
            onPress={() => navigation.navigate("editProfile")}
            name="user-edit"
            color="#041858"
            size={30}
            containerStyle={{
              position: "absolute",
              left: -10,
              top: 10,
              alignSelf: "left",
            }} // set the left value to -10
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Avatar.Image
            source={{ uri: `http://${IP}:3500/${patient.profile}` }}

            size={80}
            style={{ borderWidth: 2, borderColor: "#041858", elevation: 5 }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {" "}
              {patient.name}{" "}
            </Title>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20, marginLeft: 10 }}>
            {patient.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20, marginLeft: 10 }}>{patient.phoneNumber} </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20, marginLeft: 10 }}>
            {patient.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              // borderLeftWidth: 1,
              alignItems: "center",
              justifyContent: 'center',
            },
          ]}
        >
          <Title>5</Title>
          <Caption>مرات طلب ممرض</Caption>
        </View>
        <View style={[styles.infoBox, {
          borderRightColor: "#dddddd",
          // borderLeftWidth: 1,
          alignItems: "center",
          justifyContent: 'center',
        }]}>
          <Title>12</Title>
          <Caption>الطلبات</Caption>
        </View>
      </View>
      {/* start bookedNurseSection */}

      <View style={{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginBottom: 30
      }}
      >
        <Text
          style={{ marginTop: 20, color: "#041585", marginBottom: 30, fontSize: 20, fontWeight: '700', borderBottomColor: '#041585', borderBottomWidth: 2 }}
        >
          الممرضين الذين قمت بحجزهم
        </Text>

        <ScrollView
          style={{ height: 350 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 40, marginTop: 30, height: 900, }}
        >

{nursesBooking && nursesBooking.length !== 0 && nursesBooking.map((nurse, index) => {
  // Check if the nurse's status is 'accepted'
  if(nurse.status === 'accepted'){
    return (
      // Render a Card component for the nurse's profile
      <Card key={index} style={{ // Specify styles for the Card component
        height: 300, 
        marginLeft: 30, 
        backgroundColor: "#FEFEFE", 
        justifyContent: "center",
        alignItems: "center"
      }}
        onPress={() => navigation.navigate("NurseProfile")} // Navigate to the nurse's profile screen when the Card is pressed
      >
        <View style={{ // Specify styles for the View component inside the Card
          width: 210,
          borderRadius: 15,
          shadowColor: "#041858",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{ // Specify styles for the View component that contains the nurse's image
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <Image // Display the nurse's image
              source={{ uri: `http://${IP}:3500/${nurse.profile}` }}
              style={{
                width: "100%",
                borderRadius: 10,
                height: 200,
                resizeMode: "contain",
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
          <View style={{ // Specify styles for the View component that contains the nurse's name and rating button
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}>
            <View style={{ // Specify styles for the View component that contains the nurse's name and rating button
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: -10
            }}>
              <Text // Display the nurse's name
                style={{
                  width: "100%",
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 7,
                  marginTop: 7,
                  color: "#041585",
                  textAlign: 'center',
                }}
              >
                {nurse.name}
              </Text>
              <Button // Display the rating button
                title="قيم الآن"
                style={{ width: 100, backgroundColor: '#0bc13c' }} 
                onPress={() => handlePress()} // Call the handlePress function when the button is pressed
              />
            </View>
          </View>
        </View>
        <Modal // Render a Modal component for rating the nurse
          visible={modalVisible} // Show the modal if modalVisible is true
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal} // Call the closeModal function when the user closes the modal
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>تقييم الممرض</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>التقييم:</Text>
                <TextInput // Display an input field for the rating
                  style={styles.ratingInput}
                  placeholder="ادخل التقييم (0-5)"
                  keyboardType="numeric"
                  value={rating}
                  onChangeText={(value) => setRating(value)} // Update the rating state when the user types in the input field
                />
              </View>
              {isValidRating() && ( // Display the StarRating component if the rating is valid
                <View style={styles.starRatingContainer}>
                  <StarRating rating={parseFloat(rating)} />
                </View>
              )}
              <View style={styles.buttonContainer}>
                <Button // Display a button for submitting the rating
                  title="ارسل التقييم"
                  onPress={() => { submitRating(nurse.NurseId._id) }} // Call the submitRating function when the button is pressed
                  disabled={!isValidRating()} // Disable the button if the rating is not valid
                  color="#4CAF50"
                />
                <Button title="اغلق" onPress={closeModal} color="#f44336" /> 
              </View>
            </View>
          </View>
        </Modal>
      </Card>
    )
  } else {
    return null; // Return null if the nurse's status is not 'accepted'
  }
})}
        </ScrollView>

      </View>
      {/* end bookedNurseSection */}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => { navigation.navigate('patientPost', { patientId: patient._id }) }}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#041858" size={25} />
            <Text style={{ ...styles.menuItemText }}>طلباتي</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={logout}>
          <View style={styles.menuItem}>
            <Ion name="exit-outline" color="#041858" size={25} />
            <Text style={{ ...styles.menuItemText }}>تسجيل الخروج</Text>
          </View>
        </TouchableRipple>

      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 14,
    marginBottom: 25,
  },
  icons: {
    flexDirection: "row",

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,

  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    height: 100,
  },
  infoBox: {
    // width: "50%",

  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,

  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  //modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  ratingInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    fontSize: 16,
  },
  starRatingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});