import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';
const styles = StyleSheet.create({
  mainCardView: { marginTop: -35, marginLeft: 15, marginRight: 15 },
  imageView: { justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  productImage: { height: hp('25%'), width: wp('50%'), },
  BtnTxt: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  mainText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subCategoryDetail: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize'
  },
  editCategoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#3492d4',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    marginTop: '3%'
  },
  quantityView: { flexDirection: 'row', marginTop: 10 },
  mainView: { marginRight: 10, marginLeft: 10 },
  descriptionLine: { flexDirection: 'row' },
  headingText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10
  },
  pickerView: { borderColor: '#199bf1', borderRadius: 2, borderWidth: 2, height: 30, marginTop: 15, justifyContent: 'center' },
  subCategoryLable: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  subCategoryText: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  subDetailsView: { flexDirection: 'column', marginRight: 20 },
  verticalLine: { borderBottomWidth: 1, borderColor: '#199bf1', marginBottom: 10 },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 290,
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
    elevation: 7,
  },

  addToCartView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "5%",
    marginBottom: 20
  },

  quantityBtn: {
    height: 30,
    width: 30,
    backgroundColor: '#199bf1',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#199bf1',
    height: 30,
    width: 35,
    backgroundColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center'
  },

  quantityBtnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  }






});
export default styles;
