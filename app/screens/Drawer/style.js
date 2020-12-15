import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import {widthPercentageToDP as wp, } from '../../utility/index';
const styles = StyleSheet.create({
    profilePicMainView:{ justifyContent: 'center', alignItems: 'center', marginTop: 48, marginBottom: 50 },
    profilePicBackground:{
        height: 160, width: 160,
    },
    profilePic:{ height: 160, width: 160, },
    container: {
        height: '100%'
    },
    userDetailView:{ justifyContent: 'center', paddingLeft: 10 },
    color:{ color: colors.whiteColor, },
    divider:{
        ...Platform.select({
            ios: {
                borderWidth: wp('0.5%'),
            },
            android: {
                borderWidth: wp('0.1%'),

            }
        }),
        borderColor: colors.whiteColor,
    },
    txt: {
        fontSize: 20,
        color: colors.whiteColor,
    },
    icon: {
        height: 24,
        width: 20,
        marginRight: "6%",
        marginBottom: "13%"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: window.height
    },
});
export default styles;
