import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      // paddingBottom: 25,
      color: 'white',
      marginBottom:10
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      width:250
      
    },
    image: {
    
      width: 300,
      height: 300,
      // marginBottom: 60,
      // tintColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    button: {
      fontSize: 18,
      color: '#041858',
      fontWeight:"bold",
      marginTop:30,
      backgroundColor:"white",
      padding:10,
      borderRadius:10,
      width:100,
      textAlign:"center"

    },
  });
};

export default dynamicStyles;