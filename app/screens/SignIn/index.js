import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler, Alert,
} from 'react-native';
import KeyboardView from '../../screens/KeyboardView';
import styles from './style';
import * as Utility from '../../utility/index';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import Loader from '../../Components/Loader'
import { NavigationActions, StackActions } from 'react-navigation';
import HandleBack from "../../Components/HandleBack";
import * as pushNotifications from '../../utility/pushNotification';
import { LoginManager } from 'react-native-fbsdk'
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'customer@gmail.com',
      password: '123456789',
      isLoading: false,
      data:[
        {name:"Basic Ordering"},
        {name:"Basic Reporting"},
        {name:"One Vendor"},
        {name:"Up to 3 Vendors"},
        {name:"4-10 Vendors"},
        {name:"Multiple Reports"},
        {name:"Assign Purchase Order"},
        
      ]
    };
  }

  login = async () => {
   let currentPlan=await Utility.getFromLocalStorge("currentPlan")
    console.log("current plan",currentPlan)
    if (Utility.isFieldEmpty(this.state.email && this.state.password)) {
      Alert.alert("", "Please enter all the fields")
    }
    else if (Utility.isValidEmail(this.state.email)) {
      Alert.alert("", "Please Enter Valid Email")
    }
    else {
      let body = {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }

      try {
        this.setState({
          isLoading: true
        })
        const res = await Service.post(Url.LOGIN_URL, '', body)
        console.log('data', res)
        if (res.data) {
await Utility.setInLocalStorge("userName",this.state.email),
await Utility.setInLocalStorge("password",this.state.password)

          this.setState({
            isLoading: false
          })
          let cartItems = []
          global.user = res.data;
          await Utility.setInLocalStorge('user', JSON.stringify(global.user))
          await Utility.setInLocalStorge('token', res.data.token)
          await Utility.setInLocalStorge('userId', res.data.id)
          await Utility.setInLocalStorge('cartItems', cartItems)
          await Utility.setInLocalStorge('role', res.data.role)
          await Utility.setInLocalStorge('currentPlan', res.data.currentPlan)
          await pushNotifications.pushNotification()
          console.log('signin::login::global.user.customerGroup', global.user.customerGroup)
        if (res.data.role.toLowerCase() == 'customer' && (global.user.customerGroup === '' || global.user.customerGroup === null || global.user.customerGroup === undefined)) {
            this.props.navigation.navigate('MyProfile')
          }
          else {
            await Utility.setInLocalStorge('customerGroup', global.user.customerGroup.id)
           if(res.data.currentPlan=="none"){
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SelectPlan' })]
              })
            );
            this.props.navigation.navigate('SelectPlan');
          }
          else{
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
              })
            );
            this.props.navigation.navigate('BottomTab');
          }

        }
        }
        else {
          Alert.alert('', res.err.message)
          console.log('err-res', res)
          this.setState({
            isLoading: false
          })
        }

      } catch (err) {
        this.setState({
          isLoading: false
        })
        Alert.alert('', err.message)
        console.log('err', err)
      }
    }
  };
  onBack = () => {
    BackHandler.exitApp()
    return true;
}


handleFacebookLogin = async () => {
  await Utility.removeAuthKey("userPassword")
  await Utility.removeAuthKey("userEmail")
  await Utility.removeAuthKey("currentPlan")
  LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
    if (result.isCancelled) {
    } else {

      AccessToken.getCurrentAccessToken()
        .then((user) => {
          return user
        })
        .then((user) => {
          const responseInfoCallback = async (error, result) => {
            console.log("result", error)
            if (error) {
              console.log("errrrreeeee", error)
              alert('Error fetching data: ' + error.toString());
            } else {
              console.log("user details", result)


              this.setUserData(result)
            }
          }
          const infoRequest = new GraphRequest('/me', {
            accessToken: user.accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,last_name'
              }
            }
          }, responseInfoCallback);

          new GraphRequestManager()
            .addRequest(infoRequest)
            .start()
        })
    }
  }
  )
}

setUserData = async (result) => {

  let body = {
    facebookId: result.id,
    firstName: result.first_name,
    lastName: result.last_name,
    email: result.email || "",

  }
  this.setState({
    isLoading: true
  })
  const res = await Service.post(Url.FACEBOOK_LOGIN, '', body)
  console.log("response",res)
  this.setState({
    isLoading: false
  })
  global.user = res.data;
  await Utility.setInLocalStorge('user', JSON.stringify(global.user))
  Utility.setInLocalStorge('token', res.data.token)
  Utility.setInLocalStorge('userId', res.data.id)

  Utility.setInLocalStorge('role', res.data.role)
  Utility.setInLocalStorge('currentPlan', res.data.currentPlan)
  Utility.setInLocalStorge('amount', res.data.amount)
  await Utility.setInLocalStorge('subscriptionId', res.data.subscriptionId)
  if (res.data.currentPlan == "none") {
    console.log("chek my none plan funcation///////////")
    await Utility.setInLocalStorge('route', "SignIn")
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
      })
    );
    this.props.navigation.navigate('SelectPlan');
  }
  else if (res.data.currentPlan == "ultimate plan" || res.data.currentPlan == "20% er plan") {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
      })
    );
    this.props.navigation.navigate('BottomTab3');
  }



  else {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
      })
    );
    this.props.navigation.navigate("BottomTab2");
  }

}

  render() {
    return (
      <HandleBack onBack={this.onBack}>
      <KeyboardView behavior="padding" style={styles.wrapper}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.backgroundImage}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.formView}>
              <Loader isLoading={this.state.isLoading} />
              <View style={styles.SectionStyle}>
                <Image
                  source={require('../../assets/loginR/e-mail.png')}
                  style={styles.icon}
                />
                <View style={styles.textInputView}>
                  <TextInput
                    allowFontScaling={false}
                    require
                    placeholder="E-mail id"
                    placeholderTextColor="#fff"
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.txtInput}
                  />
                </View>

              </View>
              <View style={styles.SectionStyle}>
                <Image
                  source={require('../../assets/loginR/password.png')}
                  style={styles.icon}
                />
                <View style={styles.textInputView}>
                  <TextInput
                    require
                    allowFontScaling={false}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={(password) => this.setState({ password })}
                    style={styles.txtInput}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                  <Text allowFontScaling={false}
                    style={styles.forgotPasswordText}>
                    Forgot password?
                    </Text>
                </TouchableOpacity>
              </View>
              <View >
                <TouchableOpacity
                  style={[styles.LoginBtn, styles.AJ]}
                  onPress={() => this.login()}>
                  <Text
                    allowFontScaling={false}
                    style={styles.LoginBtnTxt}>LOGIN</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  allowFontScaling={false}
                  style={styles.orTxt}>
                  OR
              </Text>
              </View>
              <View>
                <TouchableOpacity 
                onPress={()=>this.handleFacebookLogin()}
                style={[styles.FbBtn, styles.AJ]}>
                  <Text
                    allowFontScaling={false}
                    style={styles.LoginBtnTxt2}>Login with facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomView}>
              <View
                style={styles.linkView}>
                <Text
                  allowFontScaling={false}
                  style={styles.linkedAccText}>
                  Not Registered Yet?
              </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.replace('SignUp')}>
                  <Text
                    allowFontScaling={false}
                    style={styles.linkedText}>
                    {' '}
                  Register
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
         
        </ImageBackground>
      </KeyboardView >
      </HandleBack>
    );
  }

}

