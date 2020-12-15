import {  StyleSheet, Platform } from 'react-native';
import * as colors from '../../constants/colors';
import { heightPercentageToDP as hp } from '../../utility';
const styles = StyleSheet.create({
  category: {
    marginLeft: '5%', textTransform: 'capitalize',
    ...Platform.select({
      ios: {
        height: 20
      }
    })
  },
  submitCategoryBtn: { justifyContent: 'center', alignItems: 'center', marginTop: "60%" },
  productImgView: {  padding: hp('1%'),margin: hp('1%'), borderRadius: 2, borderWidth: 0.1, justifyContent: 'center' },
  productDetails: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  productList: {
    flexDirection: 'row',
    marginTop: 5,
  },
  viewCatalogueView: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', },
  viewCatalogueSubView: { marginBottom: '2%', marginTop: '2%' },
  productData: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  productImg: { height: 50, width: 50, },
  mainHeadingView: { padding: 15 },
  txtHeader: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subHeadingCard: {
    marginTop: -45,
    height: 100,
  },
  subHeadingView: { justifyContent: 'center', alignItems: 'center' },
  txtHeaderBorder: {
    borderBottomColor: '#3492d4',
    borderBottomWidth: 1,
  },
  mainView: { padding: "4%" },
  contactMainView: { flexDirection: 'row' },
  contactView: { flexDirection: 'row', justifyContent: 'flex-start' },
  callImage: {
    color: 'white',
    width: 35,
    height: 35,
    marginRight: '5%'
  },
  addressView: { justifyContent: 'center', flex: 1, },
  addressText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25
  },
  shipToText: { fontSize: 14, textAlign: 'center' },
  editCategoryView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center'
  },
  categoryList: { color: '#fff', fontSize: 11, textTransform: 'capitalize' },
  editCategoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#3492d4',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  viewdetail: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3492d4',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  searchView: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
  },
  searchTextInput: {
    width: '80%',
    height: 35,
    marginLeft: 5
  },
  searchIcon: {
    color: 'white',
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: '1%',
  },
  categoryModalView: { height: '75%', marginLeft: "8%", marginRight: "8%", marginTop: "25%", marginBottom: "15%", backgroundColor: "#f0f0f0", borderRadius: 10 },
  categoryHeadingText: {
    textAlign: 'center',
    color: colors.primaryColor,
    fontWeight: 'bold',
    margin: "2%"
  },
  empty: {
    textAlign: 'center',
    color: colors.primaryColor,
    fontWeight: 'bold',
    fontSize: 22,
    margin: "2%"
  },
  checkBox: { marginLeft: 5, borderRadius: 1, },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 15, fontWeight: 'bold' },
  icon: {
    width: "50%",
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
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 103,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
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

});
export default styles;
