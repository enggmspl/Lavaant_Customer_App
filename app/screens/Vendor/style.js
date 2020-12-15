import {StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';
const styles = StyleSheet.create({
  comingsoonText:{ textAlign: 'center', alignSelf: 'center', fontSize: 16, fontWeight: 'bold' },
  
  cardView:{ marginLeft: '4%', marginRight: '4%' },

  cardList:{
    flexDirection: 'row',
    padding: '3%'
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', alignItems: 'center',
  },

  cardStyle: {
    width: wp('37%'),
    ...Platform.select({
      ios: {
        height: hp('13.4%'),
      },
      android: {
        height: hp('17.4%'),

      }
    }),
    top: -40,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0, height: 2
    },
  },

  icon: {
    width: 90,
    height: 85,
  }

});
export default styles;
