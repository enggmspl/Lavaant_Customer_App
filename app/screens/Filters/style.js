import { Dimensions, StyleSheet, } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp,  } from '../../utility/index';

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 5,
        top: -30,
        marginBottom: '5%'
    },
    headings: {
        fontWeight: 'bold'
    },
    datesMainView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkBox: { marginLeft: 5, borderRadius: 1, },
    LoginBtnTxt2: {
        color: colors.whiteColor,
        fontSize: wp('4%'),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    FbBtn: {
        height: 50,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 2
        },
    },
    dateIndividualView: {
        width: '45%',
        marginTop: '2%'
    },
    inputViewStyle: {
        borderWidth: 1,
        height: 30,
        marginTop: '5%',
        borderRadius: 5
    },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchView: {
        flexDirection: 'row',
        width: '100%',
        height: 35,
    },
    searchTextInput: {
        width: '80%',
        height: 35,
        marginLeft: 5,
    },
    searchIcon: {

        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginTop: '1%',
    },
    category: {
        marginLeft: '5%', textTransform: 'capitalize',
       
    },
    dateInput: {
        borderWidth: 0,
    },
    dateText: {
        color: '#000',
    },
  
    btnTextConfirm: {
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 18
    },
});
export default styles;