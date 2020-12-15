import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../../constants/colors';

const styles = StyleSheet.create({
  headerTxtView:
  {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "10%"
  },
  headerTxt:
  {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  planView:
  {
    marginTop: "15%",
    flexDirection: "row"
  },
  standardPlanView:
  {
    width: "40%",
    height: 40,
    backgroundColor: "#dcf0fe",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: "6%"
  },

  standardTxt:
  {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold"
  },
  profeesionalView:
  {
    width: "40%",
    height: 40,
    backgroundColor: "#199bf1",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: "6%"
  },
  professionalPlantxt:
  {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  freeTrailButton:
  {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    marginTop: "45%",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center"
  },
  freeTrailButtonTxt:
  {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold"
  },
  ModalMainView:
  {
    width: "80%",
    backgroundColor: "#3492d4",
    justifyContent: "center",
    alignSelf: "center"
  },
  crossImg:
  {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginTop: 10
  },
  ModalHeaderTxt:
  {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    textAlign: "center",
    color: "white",
    textDecorationLine: "underline"
  },
  modalSubView: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10
  },
  dotImg: {
    height: 10,
    width: 10,
    marginLeft: 10,
    marginTop: 5
  },
  planTxtModal: {
    marginLeft: 15,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  payButton: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    marginTop: "20%",
    marginBottom: "10%",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center"
  },
  payButtonTxt: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    color: "black"
  }
});



export default styles;
