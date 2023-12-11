// import { Text, View, StyleSheet, FlatList } from 'react-native';
// import { useEffect, useState } from 'react'
// import Card from '../../Components/Card';
// import { useDispatch } from 'react-redux';
// import { getDevices } from '../Redux/Slices/DeviceSlice'

// const Device = () => {
//   const [arr, setArr] = useState([])
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getDevices()).then((res) => {
//       setArr([...res.payload])
//     })
//   }, [])
//   console.log(arr);

//   function renderCard({ item }) {
//     return <Card data={item} />
//   }

//   return (
//     <FlatList
//       data={arr}
//       keyExtractor={(item, index) => item}
//       renderItem={renderCard}
//     />
//   )
// }

// // const styles = StyleSheet.create({

// // })

// export default Device;