import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,


} from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import MainHeader from '../../../Components/MainHeader'
import * as Animatable from "react-native-animatable";
import Modal from 'react-native-modal';
import * as Utility from '../../../utility/index';
import * as Url from '../../../constants/urls'
import * as Service from '../../../api/services'
import Loader from '../../../Components/Loader'
export default class SelectPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      title: [],
      isVisible: "",
      professionalPlanModal: "",
      subscriptionPlan: "",
      getfeature: [],
      StandardPlan: [],
      ids: [],
    data  : [
        { name: "Basic Ordering" },
        { name: "Basic Reporting" },
        { name: "One Vendor" },
        { name: "Up to 3 Vendors" },
        { name: "4-10 Vendors" },
        { name: "Multiple Reports" },
        { name: "Assign Purchase Order" },

      ]

    };

  }
  componentDidMount() {
    this.getFeature()
    this.getPlan()
  
    setTimeout(() => this.setState({ text: "New Text" }), 5000);
  };

  getPlan = async () => {
    let subscriptionPlan = await Utility.getFromLocalStorge('subscriptionPlan')
    this.setState({
      subscriptionPlan: subscriptionPlan
    })
    console.log("sub", subscriptionPlan)
  }

  closeModal = () => {
    this.setState({
      isVisible: false,
      professionalPlanModal: false
    })
  }

  goToPaymentHome = async (item) => {
    console.log("plan detail", item)
    await Utility.setInLocalStorge('planTitle', item.title)
    await Utility.setInLocalStorge('planPrice', item.price)
    await Utility.setInLocalStorge('planId', item.id)
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'PaymentHome' })]
      })
    );
    this.props.navigation.navigate('PaymentHome');
  }

  goToCustomerHome = async (value) => {
    let userId = await Utility.getFromLocalStorge('userId')
    this.setState({
      plan: value
    })
    console.log("value", subscriptionPlan)
    let body = {
      userId: userId,
      plan: value

    }

    // this.setState({
    //   isLoading: true
    // })
    const res = await Service.post(Url.FREE_TRAIL_PLAN, '', body)
    console.log('data', res)
    // this.setState({
    //   isLoading: false
    // })
    if (res.message == "Free trial is done Successfully") {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SelectPlan' })]
        })
      );
      this.props.navigation.navigate('BottomTab');
    }
    else {
      Alert.alert("error")
    }
  }


  getFeature = async () => {
    let token = await Utility.getFromLocalStorge('token')
    // this.setState({
    //   isLoading: true
    // })
    const res = await Service.get(Url.GET_FEATURES + `role=${"customer"}&status=${"active"}`, token)
    console.log("getFeature", res)
    this.setState({
      isLoading: false
    })
    if (res.data) {

      this.setState({
        // isLoading: false,
        getfeature: res.data
      })
      console.log("getState feature", this.state.getfeature)
    }
  }


  getPlan = async () => {
    let token = await Utility.getFromLocalStorge('token')
    // this.setState({
    //   isLoading: true
    // })
    const res = await Service.get(Url.GET_PLAN + `role=${"customer"}&status=${"active"}`, token)
    console.log("GETpLAN", res)
    // this.setState({
    //   isLoading: false
    // })




    res.data.map((item, key) => (
      console.log("item vikas", item),

      item.features.map((Data, key) => {
        this.state.StandardPlan.push(Data)
        

      }
    
      )
      
    ))
    console.log("vikas plan ",this.state.StandardPlan)

    if (res.data) {

      this.setState({
        title: res.data,
        isLoading: false,
      })
    }
  }
  hello = (value) => {
    console.log("value", value)
    this.state.StandardPlan.forEach((item) => {
      console.log("....", item.id)
      if (
        item.id == item) {
        console.log("iteeeeeeemsssss", this.state.StandardPlan)
      }
    }
    )

  }
  render() {


    return (
      <View>
        <MainHeader navigate={this.props.navigation} />
        {/* <Loader isLoading={this.state.isLoading} /> */}
        <ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: "10%" }}>

            {
              this.state.title.map((item, key) => (
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 20, color: key % 2 === 0 ? 'orange' : '#199bf1' }}>{item.title.toUpperCase()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginRight: 20, color: "black" }}>$ {item.price.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.goToPaymentHome(item)}>
                    <View style={{ width: 120, height: 25, marginTop: 15, backgroundColor: key % 2 === 0 ? 'orange' : '#199bf1', marginRight: "4%", elevation: 2, alignItems: "center", justifyContent: "center", borderRadius: 20, alignSelf: "center" }}>
                      <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "bold", color: "white" }}>Pay</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}



          </View>
      
          <Text style={{ marginTop: "5%", fontSize: 19, color: "black", marginBottom: 5, marginLeft: 20, fontWeight: "bold", marginLeft: "5%" }}>FEATURE</Text>
          <View style={{ borderBottomColor: "grey", borderBottomWidth: 3, marginLeft: "5%" }}></View>
          <View style={{ marginTop: "7%", marginLeft: "5%" }}>

            {
              this.state.getfeature.map((item, key) => (

                <View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "49%", }}>

                      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>{item.name}</Text>
                    </View>
                    <View style={{ width: "25%", }}>
                      {this.state.title.map((data, key) => (
                        <View>
                          {data.title == "Standard" ?
                            <View>
                              {data.features.map((Data) =>
                                <View>
                                  {this.hello(Data.id)}
                                  {item.id === Data.id ? <Image source={require("../../../assets/tickOrange.png")} style={{ height: 40, width: 40 }}></Image> :
                                    null}
                                </View>
                              )}

                            </View>
                            : null}
                        </View>
                      ))}


                    </View>
                    <View style={{ width: "30%", }}>
                      <Image source={require("../../../assets/tickBlue.png")} style={{ height: 40, width: 40 }}></Image>
                    </View>
                  </View>
                  <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginBottom: 10 }}></View>
                </View>

              ))}


          </View>
          {/* {this.state.subscriptionPlan == "free" ? null :
            <Animatable.View animation="slideInLeft" iterationCount={3} direction="alternate">
              <View style={{ width: "80%", height: 40, backgroundColor: "white", marginTop: "5%", marginBottom: "10%", elevation: 2, alignItems: "center", justifyContent: "center", borderRadius: 20, alignSelf: "center" }}>
                <Text style={{ fontSize: 17, textAlign: "center", fontWeight: "bold", color: "#199bf1" }}>Skip For free Trail 14 day </Text>
              </View>
            </Animatable.View>
          } */}

        </ScrollView>

      </View>
    );
  }
}
