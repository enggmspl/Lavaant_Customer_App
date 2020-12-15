import { Dimensions, StyleSheet, Platform } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
    txtHeader: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    txtHeaderBorder: {
        borderBottomColor: '#3492d4',
        borderBottomWidth: 1,
    },
    orderListDateView:{ justifyContent: "flex-end", alignItems: 'flex-end' },
    orderListDate:{ color: 'blue', marginLeft: '8%',marginRight:'8%' },
    shipToText:{ fontSize: 12, },
    addressText:{ fontSize: 12, fontWeight: 'bold' },
    addressListView:{
         flexDirection: 'row',marginTop: '1%'},
    searchBar:{
        backgroundColor: 'white', borderRadius: 5,
        elevation: 1,
        height: 35,
        marginTop: 7,
        ...Platform.select({
            android:{
                borderWidth: 0.1
            },
            ios:{
                borderWidth: 0.2
            }
        }),
        marginBottom: 7,
        padding:5
    },
    callImage: {
        color: 'white',
        width: 45,
        height: 45,
        margin: '2%',
        marginTop:0
      },
      addressView:{ flexDirection: 'column', marginLeft: 20 },
    mainHeadingView:{ flexDirection: 'row', marginTop: -50, padding: 20, justifyContent: 'center', alignItems: 'center' },
    mainHeadingCard:{ width: '100%', height: 80 },
    headingImageView:{ justifyContent: 'center', alignItems: 'center' },
    headingImage:{ width: 150, height: 50, marginTop: 15 },
    contactView:{ flexDirection: 'row', marginTop: 20, marginBottom: 20 },
    orderMainView:{ padding: '6%' },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 90,
    },

    txtInput: {
        color: '#fff',
        flex: 1,
    },

    BtnTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    Btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 290,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        elevation: 7,
    },

    modalView: {
        backgroundColor: '#ffffff',
        height: '99%',
        borderRadius: 5,
        borderColor: '#dfdfdf',
        borderBottomWidth: 4,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        margin: 10,
    },

    ModalBtnTxt: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    ModalBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: colors.primaryColor,
        marginTop: 20,
        borderRadius: 30,
        marginBottom: 20,
        elevation: 7,
        width: 250,
    },

    drawerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },

    drawerImageBackground: {
        height: 130,
        width: 130,
        borderRadius: 50,
    },

    drawerImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    txtHeader: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    txtHeaderBorder: {
        borderBottomColor: '#3492d4',
        borderBottomWidth: 1,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -7
    },

    icon: {
        width: 20,
        height: 20,
        marginRight: '7%',
        backgroundColor: 'pink',
        
    },
   

    txtInput: {
        color: '#000',
        flex: 1,
    },
    BtnTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    Btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        backgroundColor: colors.primaryColor,
        marginTop: 20,

        marginBottom: 20,
        elevation: 7,
        borderRadius: 5
    },
    drawerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    txt: {

        fontWeight: 'bold',
        fontSize: 15,

    },
    drawerImageBackground: {
        height: 130,
        width: 130,
        borderRadius: 50,
    },
    drawerImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },

});
export default styles;
