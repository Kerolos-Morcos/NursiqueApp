// import React, { useEffect, useState } from "react";
//   import {
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import {
//   Avatar,
//   Card,
//   IconButton,
//   Paragraph,
//   Button,
// } from "react-native-paper";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getPatient } from "../../Redux/Slices/PatientSlice";
// import * as Font from "expo-font";
// import { useDispatch, useSelector } from "react-redux";
// import { IP } from "../../src/screens/Theme";
// import moment from "moment";
// import { useNavigation } from "@react-navigation/native";
// import io from "socket.io-client";
// import { increaseNotificationCount, decreaseNotificationCount } from "../../Redux/Slices/NotificationCountSlice";
// import { increaseNotification, decreaseNotification } from "../../Redux/Slices/NotificationArrSlice";

// export default function Notification({ Navigation }) {
//   const navigation = useNavigation();
//   const API_URL = `http://${IP}:3500`;
//   const Socket = io(API_URL);

//   const dispatch = useDispatch();
//   const patient = useSelector((state) => state.PatientSlice.patient);
//   const notificationCount = useSelector((state) => state.notificationCount.notificationCount);
//   const notificationArr = useSelector((state) => state.notificationArr.notificationArr);
 
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     dispatch(getPatient());

//     Socket.on("connect", () => {
//       console.log("Socket connected");

//       Socket?.on("getNotification", (data) => {
//         // setNotifications(prevNotifications => [...prevNotifications, data]);

//         setNotifications((prevNotifications) => {
//           const updatedNotificationComment = [...prevNotifications, data];
//           dispatch(increaseNotificationCount());
//           dispatch(increaseNotification(data));
//           AsyncStorage.setItem(
//             "notificationComment",
//             JSON.stringify(updatedNotificationComment)
//           );
//           return updatedNotificationComment;
//         });
//       });
//     });

//     Socket.on("disconnect", () => {
//       console.log("Socket.IO connection closed");
//     });

//     return () => {
//       Socket.off("connect");
//       Socket.off("getNotification");
//       Socket.off("disconnect");
//     };
//   }, [dispatch, patient._id]);
//   const currentTime = moment.utc();
//   const commentTimeFormatted = currentTime.format("YYYY-MM-DDTHH:mm:ss[Z]");
//   // setcomments({ ...comments, [item._id]: comments[item._id] ? [...comments[item._id], comment] : [comment] });
//   // setCommentTime({ ...commentTime, [item._id]: commentTime[item._id] ? [...commentTime[item._id], commentTimeFormatted] : [commentTimeFormatted] });

//   const handleNotificationClick = async (notification, index) => {
//     const commentId = notification.commentId;
//     // Perform navigation logic or actions here
//     // navigation.navigate('PostsScreen', { scrollTo: commentId });

//     const prevNotifications = await AsyncStorage.getItem("notificationComment");
//     if (prevNotifications) {
//       const parsedNotifications = JSON.parse(prevNotifications);
//       const updatedNotificationComment = parsedNotifications.filter(
//         (item) => item._id !== notification._id
//       );
//       await AsyncStorage.setItem(
//         "notificationComment",
//         JSON.stringify(updatedNotificationComment)
//       );
//       setNotifications(updatedNotificationComment);
//       dispatch(decreaseNotificationCount());
//       dispatch(decreaseNotification(notification));
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const not = await AsyncStorage.getItem("notificationComment");
//         console.log("prevNotifications", not);

//         if (not) {
//           const storedNotificationBook = JSON.parse(not);
//           setNotifications(storedNotificationBook);
//           // Move the second if statement here
//           if (storedNotificationBook) {
//             setNotifications(storedNotificationBook);
//           }
//         }
//       } catch (error) {
//         // Handle any errors that occur during the process
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
import React, { useEffect, useState } from "react";
  import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Paragraph,
  Button,
} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPatient } from "../../Redux/Slices/PatientSlice";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { IP } from "../../src/screens/Theme";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import { increaseNotificationCount, decreaseNotificationCount } from "../../Redux/Slices/NotificationCountSlice";
import { increaseNotification, decreaseNotification } from "../../Redux/Slices/NotificationArrSlice";

export default function Notification({ Navigation }) {
  const navigation = useNavigation();
  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
  const [notificationComment, setNotificationComment] = useState([]);

  const dispatch = useDispatch();
  const patient = useSelector((state) => state.PatientSlice.patient);
  const notificationCount = useSelector((state) => state.notificationCount.notificationCount);
  const notificationArr = useSelector((state) => state.notificationArr.notificationArr);
 
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(getPatient());

    Socket.on("connect", () => {
      console.log("Socket connected");

      Socket?.on("getNotification", (data) => {
        // setNotifications(prevNotifications => [...prevNotifications, data]);

        setNotifications((prevNotifications) => {
          const updatedNotificationComment = [...prevNotifications, data];
          dispatch(increaseNotificationCount());
          dispatch(increaseNotification(data));
         
          // AsyncStorage.getItem(
          //   "notificationComment",
          //   JSON.stringify(updatedNotificationComment)
          // );
          return updatedNotificationComment;
        });
      });
    });

    Socket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });

    return () => {
      Socket.off("connect");
      Socket.off("getNotification");
      Socket.off("disconnect");
    };
  }, [dispatch, patient._id]);
  const currentTime = moment.utc();
  const commentTimeFormatted = currentTime.format("YYYY-MM-DDTHH:mm:ss[Z]");
  // setcomments({ ...comments, [item._id]: comments[item._id] ? [...comments[item._id], comment] : [comment] });
  // setCommentTime({ ...commentTime, [item._id]: commentTime[item._id] ? [...commentTime[item._id], commentTimeFormatted] : [commentTimeFormatted] });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const notifi = await AsyncStorage.getItem("notificationComment");
        console.log("notifi...", notifi);
        if (notifi) {
          const storedNotificationComment = JSON.parse(notifi);
          setNotificationComment(storedNotificationComment);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  
    return () => {
      // Clean up any resources if needed
    };
  }, []);
  
  const handleNotificationClick = async (notification, index) => {
    const commentId = notification.commentId;
    // Perform navigation logic or actions here
    // navigation.navigate('PostsScreen', { scrollTo: commentId });
  
    try {
      const prevNotifications = await AsyncStorage.getItem("notificationComment");
      if (prevNotifications) {
        const parsedNotifications = JSON.parse(prevNotifications);
        const updatedNotificationComment = parsedNotifications.filter(
          (item) => item._id !== notification._id
        );
        await AsyncStorage.setItem(
          "notificationComment",
          JSON.stringify(updatedNotificationComment)
        );
        setNotificationComment(updatedNotificationComment);
        dispatch(decreaseNotificationCount());
        dispatch(decreaseNotification(notification));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 20,
        }}
      >
     {notificationComment && notificationComment.map((notification, index) => (
  <View key={index} style={styles.notificationContainer}>
    <TouchableOpacity
      onPress={() => {
        handleNotificationClick(notification, index);
        navigation.navigate('PostsScreen', {
          postId: notification.postId,
          commentId: notification.commentId,
          scrollTo: notification.commentId,
        });
      }}
      style={styles.notificationListItem}
    >
      <View style={styles.notificationInfoContainer}>
        <Text style={styles.notificationText}>
          بالتعليق على منشورك بعنوان
        </Text>
        <View style={styles.notificationContent}>
          <Image
            source={{
              uri: `http://${IP}:3500${notification.nurseImg}`,
            }}
            style={styles.notificationImage}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>
              {notification.postNurseName} قام
            </Text>
            <Text style={styles.notificationPostTitle}>
              {notification.postTitle}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.notificationBorder}></View>
    </TouchableOpacity>
  </View>
))}

      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("allNotification")}
        style={styles.viewAllButton}
      >
        كل الاشعارات
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    marginBottom: 10,
  },
  notificationListItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  notificationLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationInfoContainer: {
    flex: 1,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#333",
  },
  notificationPostTitle: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#777",
  },
  notificationBorder: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
  },
});
