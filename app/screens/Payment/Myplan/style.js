import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../../constants/colors';
const styles = StyleSheet.create({
 planMainView: {
    width: '90%', shadowOpacity: .5, elevation: 10, backgroundColor: '#199bf1',
    margin: "5%", borderRadius: 20,
},
planTitleView:{ justifyContent: 'center', alignItems: 'center' },
planTitleTxt:{ color: 'white', fontSize: 20, fontWeight: 'bold', top: 5, textTransform: "uppercase", },
featureView:{ flexDirection: 'row' },
featureSubView:{ flexDirection: 'row', margin: 10 },
featureTxt:{
  color: "white",
  marginLeft: 4,
  textTransform: "capitalize"
},
amountView:{
  backgroundColor: 'white', marginLeft: '65%'
  , margin: 12, top: "-52%", borderRadius: 10, justifyContent: 'center', alignItems: 'center'
},
amountTxt:{ color: '#199bf1', fontWeight: 'bold', fontSize: 15 },
amountMonthTxt:{ color: '#199bf1', fontWeight: 'bold', fontSize: 18 },
btnView:{ flexDirection: 'row', height: 50, margin: 15 },
unsubscribeView:{
  backgroundColor: 'white', width: "50%",
  justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 5, elevation: 8
},
unsubscribeTxt:{ color: '#199bf1', fontWeight: 'bold', fontSize: 18 },
changePlanView:{
  backgroundColor: '#199bf1', width: "50%",
  justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5, elevation: 8
},
changePlanTxt:{ color: 'white', fontWeight: 'bold', fontSize: 18 }
})
export default styles;