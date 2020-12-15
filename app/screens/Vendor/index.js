import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Container, Card, } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import * as Service from '../../api/services';
import * as Url from '../../constants/urls';
import * as Utility from '../../utility/index';

export default class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor: [],
      vendorId: '',
      vendorName: '',
      isLoading: false,
    };
    this.getVendors();
    this.getUserDetail()
  }

  getAddress = async (value) => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'ChooseAddress' })]
      })
    );
    await Utility.setInLocalStorge('selectedStore', value);
    await Utility.setInLocalStorge('storeId', value.id);
    this.props.navigation.navigate('ChooseAddress');
  };

  getVendors = async () => {
    console.log('inside get vendor')
    this.setState({
      isLoading: true
    })

    try {
      let token = await Utility.getFromLocalStorge('token')
      const res = await Service.get(Url.GET_VENDOR_URL, token)
      console.log('VENDOR::getVendor..........%%%%%%', res)
      if (res.data) {
        this.setState({
          vendor: res.data,
          isLoading: false
        })
        if (res.data.length) {
          await Utility.setInLocalStorge('storeId', res.data[0].id);
          await Utility.setInLocalStorge('selectedStore', res.data[0]);
        } else {
          await Utility.setInLocalStorge('storeId', '5ed0adfa1016710bb8801f23');
        }
      }
      else {
        this.setState({ isLoading: false })
        Alert.alert('', 'Something Went Wrong')
      }
    } catch (err) {
      this.setState({ isLoading: false })
      Alert.alert('', err.message)
    }
  }
  getUserDetail=async()=>{
    let userName=await Utility.getFromLocalStorge("userName")
    let password =await Utility.getFromLocalStorge("password")
    let body = {
      email: userName,
      password:password
    }

    let res =await Service.post(Url.LOGIN_URL,"",body)
    console.log("user detail response ",res)
    await Utility.setInLocalStorge("currentPlan",res.data.currentPlan)
  }
  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <SubHeader
            title='Select Vendor'
            navigate={this.props.navigation}
            navigateTo="AddVendor" />
          <View
            style={styles.cardView}>
            <View
              style={styles.list}>
              {this.state.vendor.map((value, key) => {
                return (
                  <View key={key} style={styles.cardList}>
                    <Card
                      style={styles.cardStyle}>
                      <TouchableOpacity onPress={() => this.getAddress(value)}>
                        {value.logo ? <Image
                          source={{
                            uri: value.logo,
                          }}
                          style={styles.icon}
                        /> : <Image
                            source={require('../../assets/userGrey.png')}
                            resizeMode='center'
                            style={styles.icon}
                          />}
                      </TouchableOpacity>
                    </Card>
                  </View>

                );
              })}
              <View style={styles.cardList}>
                <Card
                  style={styles.cardStyle}>
                  <Text style={styles.comingsoonText}> Coming Soon</Text>
                </Card>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
