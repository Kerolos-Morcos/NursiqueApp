import { View, Text, Image, StyleSheet ,TouchableOpacity } from 'react-native';
// import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import DevicesRate from './DeviceRate';
import Icon from "@expo/vector-icons/FontAwesome5";
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/Slices/CartSlice.js'
import { IP } from  '../../src/screens/Theme'
const Card = ({ data }) => {
    const dispatch = useDispatch()
    
    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId));
        // console.log(productId)
       };
    const api = `http://${IP}:3500/`;
    return (
        <View style={styles.card}>
            {/* <Image source={`${api}${data.image[0]}`} resizeMode="contain" style={styles.cardImage} /> */}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{data.name}</Text>
                {/* <Text style={styles.cardDetails}>{data.details}</Text> */}
                <View style={styles.cardPrice}>
                    <Text style={styles.price}>السعر/اليوم</Text>
                    <Text style={{color: 'white'}}>{data.price}</Text>
                </View>
                <View style={styles.cardQuantity} >
                    <Text style={styles.qty}>الأجهزة المتاحه</Text>
                    <Text style={{color: 'white'}}>{data.quantity}</Text>
                </View>
                <View style={styles.cardIcons} >
                <View style={styles.cardRate} >
                        <DevicesRate rate={data.rate} />
                    </View>
                    <View style={styles.cart}>
                        {/* <AddShoppingCartRoundedIcon style={styles.cartIcon} /> */}
                        <TouchableOpacity onPress={ () => { handleAddToCart(data._id) }}>
                        <Icon name='cart-plus' style={styles.cartIcon} color='#00A02B' />
                         </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
            <Image source={{ uri: `${api}${data.image[0]}` }} resizeMode="contain" style={styles.cardImage} />

        </View>
    )
}



const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
        marginBottom: 20,
        height: 210,
        backgroundColor: '#041585',
        color: 'white'
    },
    cardImage: {
        height: '100%',
        width: 140,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'white',
        resizeMode:'cover'
    },
    cardContent: {
        padding: 10,
        width: '60%',
        justifyContent: 'space-between',
        color: 'white'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#EEED3F',
    },
    cardDetails: {
        color: 'white'
    },
    cardPrice: {
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white'
    },
    cardQuantity: {
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white'
    },
    cart: {
        color: '#EEED3F',
    },
    cartIcon: {
        fontSize: 30
    },
    cardIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    price: {
        fontWeight: '600',
        fontSize: 16,
        color: 'white'
    },
    qty: {
        fontWeight: '600',
        fontSize: 16,
        color: 'white'
    },
    cardRate: {
        flexDirection: 'row',
        alignItems:'center'
    }
});


export default Card
