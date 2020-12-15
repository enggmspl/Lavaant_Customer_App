import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import Stripe from 'react-native-stripe-api';
import MainHeader from '../../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import Loader from '../../../Components/Loader'
import * as Utility from '../../../utility/index';
import { CreditCardInput } from 'react-native-credit-card-input';
import * as Url from '../../../constants/urls'
import * as Service from '../../../api/services'
const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_MzEz6Ixn8ZKY8WTEPLQUu3oz00WnBQ4UkY';
/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React 
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
// const getCreditCardToken = (creditCardData) => {
//   const card = {
//     'card[number]': creditCardData.values.number.replace(/ /g, ''),
//     'card[exp_month]': creditCardData.values.expiry.split('/')[0],
//     'card[exp_year]': creditCardData.values.expiry.split('/')[1],
//     'card[cvc]': creditCardData.values.cvc
//   };
//   console.log("card Destails",card)
//   return fetch('https://api.stripe.com/v1/tokens', {
//     headers: {
//       // Use the correct MIME type for your server
//       Accept: 'application/json',
//       // Use the correct Content Type to send data to Stripe
//       'Content-Type': 'application/x-www-form-urlencoded',
//       // Use the Stripe publishable key as Bearer
//       Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
//     },
//     // Use a proper HTTP method
//     method: 'post',
//     // Format the credit card data to a string of key-value pairs
//     // divided by &
//     body: Object.keys(card)
//       .map(key => key + '=' + card[key])
//       .join('&')
//   }).then(response => 

//     response.json(),
//     console.log("response",response)
//     );
// };
// /**
//  * The method imitates a request to our server.
//  *
//  * @param creditCardToken
//  * @return {Promise<Response>}
//  */
// const subscribeUser = (creditCardToken) => {
//   return new Promise((resolve) => {
//     console.log('Credit card token\n', creditCardToken);
//     setTimeout(() => {
//       resolve({ status: true });
//     }, 1000)
//   });
// };
export default class PaymentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitted: false,
      error: null,
      card_number: "",
      card_exp_month: "",
      card_exp_year: "",
      card_cvc: "",
      cardData: { valid: false },
      email:""
    }
  }
  requestPayment = () => {
    console.log("user,enter"), stripe
    this.setState({ isPaymentPending: true });
    return stripe
      .paymentRequestWithCardForm(Response)

      .then(stripeTokenInfo => {
        console.log("response", Response)
        return doPayment(100, stripeTokenInfo.tokenId);
      })

      .then(() => {
        console.warn('Payment succeeded!');
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      })
      .finally(() => {
        this.setState({ isPaymentPending: false });
      });
  };

  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    this.setState({ submitted: true });
    let creditCardToken;
    creditCardToken = await this.getCreditCardToken(creditCardInput);
  }
  getToke = async (card) => {
   
    const apiKey = 'pk_test_51HWGuZAsGGcPOYa87l6oVAErRu9owDYypYiVYzjPdFNqTr7dh5VJmFzfMONb2ZmvMsceSAOELDvHdR3KxJ0KQXAa00v8YKRxoP';
    const client = new Stripe(apiKey);
    console.log("card_number", card.card_number)
    const token = await client.createToken({
      number: card.card_number,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      cvc: card.cvc,
      address_zip: '12345'
    });
    console.log("tokenuuuuemaillllll", this.state.email)
    if(this.state.email==""){
     return Alert.alert("Please fill Email Id")
    }
    if(Utility.isValidEmail(this.state.email)){
      Alert.alert("Please fill the Valid email")
    }
    console.log("tokenuuuu", token)
    console.log("tokenuuuu", token.id)
    if (token.error) {
     return Alert.alert("", token.error.code)
    }
    else {
      let userId = await Utility.getFromLocalStorge('userId')
      let planTitle = await Utility.getFromLocalStorge('planTitle')
      let planPrice = await Utility.getFromLocalStorge('planPrice')
      let planId = await Utility.getFromLocalStorge('planId')
      let TokenId = token.id
      console.log("TokenId", TokenId)
      let body = {
        userId: userId,
        amount: planPrice,
        planId: planId,
        plan: planTitle,
        stripeToken: TokenId,
        customerEmail:this.state.email,
        userName:card.name

      }
      this.setState({
        isLoading: true
      })
      console.log("body", body)
      const res = await Service.post(Url.PAYMENT_PAY_AMOUNT, '', body)
      console.log("res",res)
      this.setState({
        isLoading: false
      })
      this.goToHome()
    }

  }
  goToHome = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'PaymentHome' })],
      }),
    );
    this.props.navigation.navigate('tab2');
  }
  getCreditCardToken = (creditCardData) => {
    console.log("credit card",creditCardData.values)
    const card = {
      'card_number': creditCardData.values.number.replace(/ /g, ''),
      'exp_month': creditCardData.values.expiry.split('/')[0],
      'exp_year': creditCardData.values.expiry.split('/')[1],
      'cvc': creditCardData.values.cvc,
      'name':creditCardData.values.name
    }

    if (card.card_number.length < 15) {
      this.setState({
        card_number: card.card_number
      })
      console.log("card Details", card)
      return Alert.alert("please fill 16 digit valid number")
    }
    if (card.exp_month === "" || card.exp_month === undefined) {
      return Alert.alert("Please fill exp_month")
    }
    else if (card.exp_year === "" || card.exp_year === undefined) {
      return Alert.alert("Please fill exp_year")
    }
    else if (card.cvc === "") {
      return Alert.alert("Please fill cvc number")
    }
    else if (card.name === "") {
      return Alert.alert("Please enter name")
    }
    else {
      this.getToke(card)
      console.log("card Details", card.card_number)
    }

  }


  render() {

    const { submitted, error } = this.state;
    return (
      <View>
        <MainHeader navigate={this.props.navigation} />
        <Loader isLoading={this.state.isLoading} />
        <ImageBackground source={require("../../../assets/background.png")} style={{ width: "100%", height: "100%" }}>
          <ScrollView>
          <Text style={{ fontSize: 22, fontWeight: "800", textAlign: "center", color: "white", textDecorationLine: "underline", marginTop: "5%", marginBottom: "5%" }}>
            Enter Card Detail
        </Text>
            <View>
              <CreditCardInput validColor={"white"}
                inputContainerStyle={{ borderBottomColor: "white", borderBottomWidth: 1 }}
                labelStyle={{ color: "white" }}
                invalidColor={"red"} placeholderColor={"white"} requiresName onChange={(cardData) => this.setState({ cardData })} />
            </View>
            <TextInput 
            onChangeText={email => this.setState({ email })}
            placeholder={"Enter the  Email"} placeholderTextColor={"white"} style={{ width: "90%", borderBottomColor: "white", borderBottomWidth: 1, alignSelf: "center" ,color:"white"}}>

            </TextInput>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={() => this.onSubmit(this.state.cardData)}>
                <View style={{ width: "90%", alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#199bf1", height: 40, alignSelf: "center", marginTop: "15%" }}>
                  <Text style={{ fontWeight: "800", color: "white", textAlign: "center", fontSize: 22 }}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>

      </View>
    );
  }
}