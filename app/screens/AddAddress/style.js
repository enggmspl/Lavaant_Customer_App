import {  StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
mainCardView:{ padding: 15,  marginTop: -45 },
subView:{ padding: '4%', paddingTop: 5, },
    inputStyle: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        height: 50,
    },


    SectionStyle: {
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    icon: {
        width: 20,
        height: 20,
        marginRight: '5%',
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
        height: 50,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 20,
        elevation: 7,
    },


});
export default styles;
