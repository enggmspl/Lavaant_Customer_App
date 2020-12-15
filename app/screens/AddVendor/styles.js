import {  StyleSheet, } from 'react-native';
const styles = StyleSheet.create({
    mainHeadingView: { padding: 15 },
    cardView: {
        flexDirection: 'row',
        borderRadius: 8,
        paddingTop: '3%',
        paddingBottom: '10%'
    },
    vendorImageView: {
        padding: 10,
        justifyContent: 'center',
    },
    imageStyling: {
        width: 80,
        height: 80
    },
    email:{ marginTop: '10%' },
    mainHeading: {
        fontSize: 16
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addUserView: {
        justifyContent: 'center',
        paddingRight: 10
    },
    addUserImage: {
        width: 38,
        height: 30
    },
    vendorDetailsView: {
        justifyContent: 'center',
        flex: 1
    },
});
export default styles;