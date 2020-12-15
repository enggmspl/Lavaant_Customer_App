import {  StyleSheet, } from 'react-native';
const styles = StyleSheet.create({
    txt: {
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: '5%',
    },
    Btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,

    },
    header: {
        flexDirection: 'row',
        marginTop: -65,
        marginLeft: 35,
        marginRight: 35
    },
    headingCard: { height: 80, justifyContent: 'center', alignItems: 'center' },
    headingCardView: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 50
    },
    subView: {
        padding: 15
    },
    subCardView: {
        flexDirection: 'row',
        marginTop: "2%",
        marginBottom: "7%",
        marginLeft: "10%"
    },
    callMailBtn: {
        color: 'white',
        width: 45,
        height: 45,
        marginRight: '4%',
    },
    userName: { fontSize: 15, fontWeight: 'bold' },
    address: { fontSize: 12, },
    addressCard: { flexDirection: 'row', alignItems: "center" },
    pinIcon: {
        height: 35,
        width: 22,
        marginRight: '5%'
    },
    addressItems: {
        flexDirection: 'row',
        marginTop: '10%',
        width: '100%'
    },
    addressCardView: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        width: '80%',
        height: 25
    },
    addAddressBtnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddressTxt: {
        borderColor: 'grey',
        borderBottomWidth: 0.8,
        textDecorationLine: 'underline'
    },
    addAddressBtn: {
        height: 80,
        width: 90,
        borderRadius: 5,
    },
    shadow: {
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 1
        },
    }
});
export default styles;
