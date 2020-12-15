import React, { Component } from 'react';
import { View,Text,ScrollView,Image,TouchableOpacity,Alert} from 'react-native';
import {Container,Card} from 'native-base';
import styles from './styles';
import SubHeader from '../../Components/SubHeader';
import MainHeader from '../../Components/MainHeader';
import Loader from '../../Components/Loader';
import * as Service from '../../api/services';
import * as Url from '../../constants/urls';
import * as commanFn from '../../utility/index';
import * as Utility from '../../utility/index';
import { NavigationActions, StackActions } from 'react-navigation';

export default class AddVendor extends Component {
    constructor(props) {
        super(props);
        this.searchVendor = this.searchVendor.bind(this)
        this.state = {
            isLoading: false,
            vendorList: [],

        };
    }

    addVendor = async (item) => {
        let token = await Utility.getFromLocalStorge('token')
        let body = {
            id: item.id
        }
        const res = await Service.put(Url.PUT_ADDVENDOR_URL, token, body)

        if (res.data) {
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Vendor' })]
                })
            );
            this.props.navigation.navigate('BottomTab');
        }
        else {
            Alert.alert('', 'Something Went Wrong')
        }

    }

    searchVendor = async (searchString) => {
        console.log('searchVendor::Search String : ', searchString);
        this.setState({
            isLoading: true
        })

        try {
            let token = await commanFn.getFromLocalStorge('token')
            const res = await Service.get(Url.SEARCH_VENDOR_URL + `searchString=${searchString}`, token)
            if (res.data) {
                this.setState({
                    vendorList: res.data,
                    isLoading: false
                })
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

    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title="Add Vendor"
                        displaySearchBar={true}
                        onSearchVendor={this.searchVendor} />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.mainHeadingView}>
                        {this.state.vendorList.map((item, key) =>
                            <View key={key}>
                                <Card style={styles.cardView}>
                                    <View style={styles.vendorImageView}>
                                        <Image source={require('../../assets/company.png')} style={styles.imageStyling} />
                                    </View >
                                    <View style={styles.vendorDetailsView}>
                                        <View>
                                            <Text style={styles.mainHeading}>VENDOR NAME</Text>
                                            <Text style={styles.heading}>{item.name}</Text>
                                        </View>
                                        <View style={styles.email}>
                                            <Text style={styles.mainHeading}>VENDOR EMAIL</Text>
                                            <Text style={styles.heading}>{item.email}</Text>
                                        </View>

                                    </View>
                                    <View style={styles.addUserView}>
                                        <TouchableOpacity onPress={() => this.addVendor(item)}>
                                            <Image source={require('../../assets/usericon_blue.png')} style={styles.addUserImage} />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                            </View>
                        )}

                    </View>
                </ScrollView>
            </Container>

        );
    }
}