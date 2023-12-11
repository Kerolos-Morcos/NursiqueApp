import React, { useEffect, useState ,useRef} from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { TextInput, ScrollView, ImageBackground } from "react-native";
 import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { IP } from "../../src/screens/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import io from "socket.io-client";
import { Icon, Input } from "react-native-elements";
import { Entypo } from "react-native-vector-icons";
import { useRoute } from '@react-navigation/native';

// import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
// import { I18nManager } from 'react-native';
const PostsScreen = ({ navigation }) => {
  const route = useRoute();
  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
  // const { content } = route.params;
  //   I18nManager.forceRTL(true);

  const [posts, setPosts] = useState([]);
  const [comments, setcomments] = useState({});
  const [commentValue, setCommentValue] = useState({});
  const [showCommentValue, setShowCommentValue] = useState("");
  const [commentTime, setCommentTime] = useState({});

  // console.log(showCommentValue)
  const [patientData, setPatientData] = useState(null);
  let myData = null;
  // console.log(showCommentValue)
  useEffect(() => {
    const getPatientData = async () => {
      const patient = await AsyncStorage.getItem("data");
      const data = JSON.parse(patient);
      setPatientData(data);
    };
    getPatientData();
  }, []);

  if (patientData) {
    myData = patientData;
  }
  useEffect(() => {
    axios
      .get(`http://${IP}:3500/post/posts`)
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // console.log(posts);

  useEffect(() => {
    const IntervalId = setInterval(() => {
      setCommentTime(moment.utc());
    }, 10000);
    return () => clearInterval(IntervalId);
  }, []);

  const getElapsedTime = (postTime) => {
    const currentTime = moment.utc();
    const elapsedTimeInSeconds = currentTime.diff(
      moment.utc(postTime),
      "seconds"
    );

    let elapsedTime;

    if (elapsedTimeInSeconds < 60) {
      elapsedTime = `${elapsedTimeInSeconds} ثوانى`;
    } else if (elapsedTimeInSeconds < 3600) {
      const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
      elapsedTime = `${elapsedMinutes} دقائق`;
    } else if (elapsedTimeInSeconds < 86400) {
      const elapsedHours = Math.floor(elapsedTimeInSeconds / 3600);
      elapsedTime = `${elapsedHours} ساعات`;
    } else {
      const elapsedDays = Math.floor(elapsedTimeInSeconds / 86400);
      elapsedTime = `${elapsedDays} يوم`;
    }

    return elapsedTime;
  };

  const getCommentTime = (commentTime) => {
    const currentTime = moment.utc();
    const elapsedTimeInSeconds = currentTime.diff(
      moment.utc(commentTime),
      "seconds"
    );

    let elapsedTime;

    if (elapsedTimeInSeconds < 60) {
      elapsedTime = `${elapsedTimeInSeconds} ثوانى`;
    } else if (elapsedTimeInSeconds < 3600) {
      const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
      elapsedTime = `${elapsedMinutes} دقائق`;
    } else if (elapsedTimeInSeconds < 86400) {
      const elapsedHours = Math.floor(elapsedTimeInSeconds / 3600);
      elapsedTime = `${elapsedHours} ساعات`;
    } else {
      const elapsedDays = Math.floor(elapsedTimeInSeconds / 86400);
      elapsedTime = `${elapsedDays} يوم`;
    }

    return elapsedTime;
  };
  ///////////////////////////
  // const [temp, setTemp] = useState(0);
  const [user, setUser] = useState({});
  // const handleClick = (post) => {
  //   setTemp(post._id);
  // };

  // console.log("postid",temp);

  useEffect(() => {
    const data = async () => {
      const tokenString = await AsyncStorage.getItem("data");
      const parsedUser = JSON.parse(tokenString);
      setUser(parsedUser);
      // console.log("token",tokenString);

      // console.log(CartTotalQuantity);
    };
    data();
  }, []);

  // console.log("useer",user);
  /////////////////////////
  const handleSubmit = async (item, values) => {
    console.log("item, values", item, values);
    // setcomments([...comments,values[item._id] ])
    const comment = values[item._id];
    // console.log("comment",comment);
    const currentTime = moment.utc();
    const commentTimeFormatted = currentTime.format("YYYY-MM-DDTHH:mm:ss[Z]");

    setcomments({
      ...comments,
      [item._id]: comments[item._id]
        ? [...comments[item._id], comment]
        : [comment],
    });
    setCommentTime({
      ...commentTime,
      [item._id]: commentTime[item._id]
        ? [...commentTime[item._id], commentTimeFormatted]
        : [commentTimeFormatted],
    });

    ////////////////////////////
    const nurseId = user._id; // dynamic nurse ID from user object
    // const nurseid="6470d68a5700266c64e10d21"
    const nurseImging =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51RNLx44ss8Jgk1GHTnGnRTTpojFlUXKyXQ&usqp=CAU";
    // user._id

    await axios
      .post(`http://${IP}:3500/post/comments/${item._id}/${nurseId}`, {
        comment: values[item._id],
        nurseName: user.name,
        nurseImg: nurseImging,
      })
      .then((res) => {
        const lastComment = res.data.comments[res.data.comments.length - 1];
        // console.log("response...........",res.data);
        Socket.emit("sendNotificationComment", {
          postNameSender: res.data.patientName,
          patientId: res.data.patientId,
          postNurseName: lastComment.nurseName,
          nurseComment: lastComment.comment,
          postTitle: res.data.title,
          nurseImg: lastComment.nurseImg,
          commentId: lastComment._id,
        });
        // console.log(res.data);
        const updatedPosts = posts.map((post) => {
          if (post._id === res.data._id) {
            post.comments = res.data.comments;
          }
          return post;
        });
        // console.log(updatedPosts);
        setPosts(updatedPosts);
        setShowCommentValue(item._id);
      });
  };


  


  const commentsRef = useRef(null);

  useEffect(() => {
    console.log( 'routtttttttttttttttttttte', route)
    const { scrollTo } = route.params  || {};
    if (scrollTo) {
      const commentEl = commentsRef.current && commentsRef.current[`comment-${scrollTo}`];
      if (commentEl) {
        commentEl.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            // Scroll to the highlighted comment
            scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
          },
          () => {}
        );
      }
    }
  }, []);




  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: `http://${IP}:3500/${item.patientImg}` }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username2}>{item.patientName}</Text>
          <Text style={styles.timestamp}>{getElapsedTime(item.createdAt)}</Text>
          <View style={styles.location2}>
            <Entypo name="location-pin" size={16} color="#666" />
            <Text style={styles.locationText}>{item.patientLocation}</Text>
          </View>
        </View>
        <Icon name="more-horizontal" type="feather" color="#000" size={24} />
      </View>
      <View style={styles.titling}>
        <Text style={styles.sub}>{item.content}</Text>
      </View>
      <View style={styles.footer}></View>
      <View
        style={{
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          // paddingTop: 50,
          padding: 7,
          margin: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {myData && myData.role === "patient" ? null : (
          <Input
            underlineColorAndroid="transparent"
            keyboardType="default"
            placeholder="ادخل تعليق"
            placeholderTextColor="#041858"
            autoCapitalize="none"
            value={commentValue[item._id]}
            onChangeText={(text) =>
              setCommentValue({ ...commentValue, [item._id]: text })
            }
            rightIcon={
              <Icon
                name="send"
                type="feather"
                color="#000"
                onPress={() => {
                  handleSubmit(item, commentValue);
                  setCommentValue("");
                }}
              />
            }
          />
        )}

        <Text style={styles.commentinput}>التعليقات:</Text>

        {showCommentValue === item._id && commentValue[item._id] && (
          <View row align="center" spacing={4}>
            {/* <Text style={styles.commentContent}>{commentValue[item._id]}</Text> */}
            <View style={styles.footer}></View>
          </View>
        )}
        {Array.isArray(item.comments) &&
          item.comments.length > 0 &&
          item.comments.map((comment) => {
            {
              /* {comments[item._id] && comments[item._id].map((comment, index) => { */
            }
            return (
              <>
                <View  key={comment._id } >
                  <View style={styles.header}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: `http://${IP}:3500/${comment.nurseImg}` }}
                    />
                    <View
                      style={[
                        styles.userInfo,
                        {
                          backgroundColor: "#eee",
                          borderRadius: 30,
                          padding: 10,
                          margin: 5,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("البروفايل", {
                            userId: comment.user_id,
                          });
                        }}
                      >
                        <Text style={styles.username}>
                          {" "}
                          {comment.nurseName}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.commentContent}>
                        {comment.comment}
                      </Text>
                      <Text style={styles.time}>
                        {getCommentTime(comment.date)}
                                 
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <Text style={styles.commentContainer}>
              <Text>
                {comment.nurseName}
              </Text>
              <Text style={styles.commentContent}>
              {comment.comment}
              </Text>
            </Text>  */}
                {/* <Text style={styles.time}>{getCommentTime(commentTime[item._id])}
    </Text> */}
              </>
            );
          })}
        {/* <Text style={styles.location}>اسوان</Text> */}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <Text style={styles.head}></Text> */}
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={require("../images/Statusupdate(1).gif")}
          style={styles.image}
        >
          {posts.length === 0 && (
            <Text style={styles.noDataText}>No data yet</Text>
          )}
        </ImageBackground>
        <View style={styles.content}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default PostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041858",
    // paddingHorizontal:10,
  },

  post: {
    backgroundColor: "#fff",
    marginVertical: 5,
    // marginHorizontal: 5,
    padding: 16,
    borderRadius: 13,
  },
  imageContainer: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  username2: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 150,
    // textAlign:'left'
  },
  timestamp: {
    color: "#666",
    fontSize: 12,
  },
  location2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: -4,
  },
  locationText: {
    color: "#666",
    fontSize: 12,
    marginLeft: 4,
  },
  title: {
    paddingBottom: 5,
    fontWeight: "bold",
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  comment: {
    margin: 15,
    height: 40,
    borderColor: "#041858",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  commentinput: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  env: {
    color: "white",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 7,
    backgroundColor: "#eeeeee",
  },
  sub: {
    // backgroundColor:"green",
    flex: 1,
    // borderWidth:1,
    borderRadius: 5,
    padding: 18,
    fontSize: 16,
    // textAlign:"center",
    //  color:"white"
  },
  sendenv: {
    flexDirection: "row",
    color: "white",
    marginLeft: 3,
  },
  head: {
    fontWeight: "900",
    color: "white",
    // marginTop:40,
    fontSize: 30,
    textAlign: "center",
    margin: 15,
  },
  commentContent: {
    flex: 1,
  },
  time: {
    fontSize: 12,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    width: 350,
    height: 300,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    // marginBottom: 8,
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 5,
  },
  Button: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 15,
    width: 100,
    alignSelf: "center",
  },
  ButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titling: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 5,
  },
  location: {
    fontSize: 12,
    color: "#808080",
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#808080",
  },
});
