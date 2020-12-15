import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
    txtHeader: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    tableHeadingsColumn1:{ flex: 2, flexDirection: 'column', },
    tableColumn1Data:{ marginLeft: 10 },
    tableHeadingsColumn2:{ flex: 1, flexDirection: 'column', borderLeftWidth: 1 },
    tableColumn2Data:{ textAlign: 'center' },
    tableColumn1:{ flex: 2, flexDirection: 'column', backgroundColor: '#cacaca', },
    tableColumn2:{ flex: 1, flexDirection: 'column', backgroundColor: '#cacaca', borderLeftWidth: 1 },
    tableDataView:{ flexDirection: 'row', },
    txtHeaderBorder: {
        borderBottomColor: '#3492d4',
        borderBottomWidth: 1,
    },
    tableHeadingsRow:{ flexDirection: 'row', borderRadius: 5, height: 25 },
    orderTableView:{ borderRadius: 5, borderWidth: 1, marginTop: 20,paddingBottom:'0.6%' },
    details:{ lineHeight: 20 },
    shipToView:{ flexDirection: 'row', justifyContent: 'space-between' },
    orderHeading:{ flexDirection: 'row', justifyContent: 'center' },
    mainView:{ padding: 15,paddingTop:0 },
    mainHeadingView:{ flexDirection: 'row', marginTop: -50, padding: 20,paddingBottom:2, justifyContent: 'center', alignItems: 'center' },
    mainHeadingCard:{ width: '100%', height: 80 },
    mainHeadingImageView:{ justifyContent: 'center', alignItems: 'center' },
    mainHeadingImage:{ width: 150, height: 50, marginTop: 15 },
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
        marginRight: '5%',
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
