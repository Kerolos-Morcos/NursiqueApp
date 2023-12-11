import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity ,Icon} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { TextInput } from 'react-native';
import { IP } from  '../../src/screens/Theme'
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
// import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
// import { I18nManager } from 'react-native';
const PostsScreen =({  })=> {
    //   I18nManager.forceRTL(true);
   
  const [posts, setPosts] = useState([]);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const token = JSON.parse(tokenString);
        const decoded = jwtDecode(token);
        const id = decoded.userid;
        console.log(id)
  
        const response = await axios.get(`http://${IP}:3500/post/patientPosts/${id}`);
        setPosts(response.data.data);
        console.log( 'postsssss',response.data.data);
      } catch (error) {
        console.log('Error retrieving posts:', error);
        // Handle the error accordingly (e.g., show an error message to the user)
      }
    };
  
    fetchPosts();
  }, []);
  

  
  const [patientData, setPatientData] = useState(null);
  var myData = null;

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

   

  const getElapsedTime = (postTime) => {
    const currentTime = moment.utc();
    const elapsedTimeInSeconds = currentTime.diff(moment.utc(postTime), 'seconds');

    let elapsedTime;

    if (elapsedTimeInSeconds < 60) {
      elapsedTime = `${elapsedTimeInSeconds} seconds`;
    } else if (elapsedTimeInSeconds < 3600) {
      const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
      elapsedTime = `${elapsedMinutes} minutes`;
    } else if (elapsedTimeInSeconds < 86400) {
      const elapsedHours = Math.floor(elapsedTimeInSeconds / 3600);
      elapsedTime = `${elapsedHours} hours`;
    } else {
      const elapsedDays = Math.floor(elapsedTimeInSeconds / 86400);
      elapsedTime = `${elapsedDays} days`;
    }

    return elapsedTime;
  };
  const handleSubmit = async(values) => {
    console.log(values);
   await axios.post(`http://${IP}:3500/post/comments/${patientId}`,
        values
      )
      .then((res) => {
        // console.log(res.data);
        let index=posts.findIndex((item)=>item._id==res.data._id)
        // console.log(index);
        posts[index].comments=res.data.comments;
        // console.log(posts);
        setPosts([...posts]);
        
      });
  }

// console.log(posts,"line65");
  
  const renderItem = ({ item }) => (
      <View style={styles.post}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.paientName}</Text>
     
      </View>
      <Text style={styles.title}> موضوع الطلب :{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      {myData.role === 'nurse' ? (
  <TextInput
    style={styles.comment}
    underlineColorAndroid="transparent"
    keyboardType="default"
    placeholder="ادخل تعليق"
    placeholderTextColor="#041858"
    autoCapitalize="none"
    onChangeText={(text) => setCommentValue(text)}
  />
) : null}
        <Text style={styles.commentinput}>التعليقات</Text>
        <Text>{item.title}</Text>
      <View style={styles.footer}>
        <Text style={styles.time}>{getElapsedTime(item.createdAt)}</Text>
      </View>
        <Text style={styles.location}>اسوان</Text>
        {myData.role === 'nurse' ? (
        <TouchableOpacity
                  style={styles.Button}
                  onPress={handleSubmit}>     
                  <Text style={styles.ButtonText}>إرسال</Text>
                </TouchableOpacity>
                ) : null}
        <Text>{}</Text>
    </View>
  );
  
  return (
      <View style={styles.container}>
      {posts.length > 0 ? (
          <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={styles.noData}>
          {/* <Image source={require('../../assets/images/No data-rafiki.svg')} /> */}
          <Text style={styles.noDataText}>No data yet</Text>
        </View>
      )}
    </View>
  );
}
export default PostsScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#041858',
      paddingTop:10,
    paddingHorizontal:10,
    paddingBottom:20
    },
    post: {
      backgroundColor: '#fff',
      marginVertical: 8,
      padding: 16,
      borderRadius:15,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    title:{
        fontWeight:'bold',
        paddingBottom:10
    },
    comment:{
            margin: 15,
            height: 40,
            borderColor: '#041858',
            borderRadius:8,
            borderWidth: 1.5,
            padding:10
    },
    commentinput:
    {   
        fontWeight:'bold'
    },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    time: {
      fontSize: 12,
      color: '#808080',
    },
    content: {
      fontSize: 14,
      marginBottom: 8,
    },
    Button: {
        backgroundColor: '#041585',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
      },
      ButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    location: {
      fontSize: 12,
      color: '#808080',
   
    },
    noData: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      fontSize: 18,
      color: '#808080',
    },
  });