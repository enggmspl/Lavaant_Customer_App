import {  StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../utility';
const styles = StyleSheet.create({
    mainView:{ padding: 10, marginTop: -40, },
    cardView: {
        marginBottom: 10,
    },
    emptyCartImage:{ width: wp('100%'), height: hp('45%'), tintColor: '#2a9df4', opacity: 0.7 },
    cartItemImage: { height: 50, width: 50, padding: 2, borderRadius: 2, borderWidth: 0.1, },
    cartItemName: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalAmount: { fontSize: 18, fontWeight: 'bold' },
    emptyCartText: { color: 'black', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 60 },
    emptyCartView: {  height:hp("75%"),justifyContent: 'center',marginTop:hp('5%'),marginBottom:"30%"},
    quantityView: { flexDirection: 'row', marginTop: '10%', },
    deleteBtnView: { justifyContent: 'center', alignItems: 'center' },
    otherDetails: {
        fontSize: wp('3%'),
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    quantityBtn: {
        height: 25,
        width: 25,
        backgroundColor: '#199bf1',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    deleteBtn:
    {
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 75,
        backgroundColor: 'red',
        borderRadius: 3,
    },
    borderLine: {
        borderBottomWidth: 1, borderColor: '#199bf1', marginTop: 70
    },

    quantityTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#199bf1',
        height: 25,
        width: 25,
        backgroundColor: '#cacaca',
        alignItems: 'center',
        justifyContent: 'center'
    },

    quantityBtnTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeOrderBtn:
        { justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 30 },

    placeOrderTx: { color: '#fff', fontWeight: '800', fontSize: 18 },

    BtnTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    totalPriceView:
        { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' },

    Btn: {

        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 250,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        elevation: 7,
    },


});
export default styles;
