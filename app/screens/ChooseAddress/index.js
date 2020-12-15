import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Container, Body, Card, CardItem, } from 'native-base';
import styles from './style';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import Loader from '../../Components/Loader'

import {BackHandler} from 'react-native';
export default class ChoosAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            address: [],
            isLoading: false,
            logo: this.props.navigation.state.params ? this.props.navigation.state.params.logo : ''
        };
    }
    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress",this.openTwoButtonAlert);
    
        let selectedStore = await commanFn.getFromLocalStorge('selectedStore')
        this.setState({
            logo: selectedStore ? selectedStore.logo : ''
        })

    }
    componentWillMount() {
        this.getAddressList()
        BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);
    
    }
    openTwoButtonAlert=()=>{
        this.props.navigation.navigate("BottomTab");
        return true;
    }


    getAddressList = async () => {
        this.setState({
            isLoading: true

        })
        let userId = await commanFn.getFromLocalStorge('userId')
        const res = await Service.get(Url.AddressList_URL + `${userId}`, "")
        if (res.data) {
            this.setState({
                address: res.data,
                isLoading: false
            })

        }
    }

    openDailer = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = 'telprompt:${091123456789}';
        }
        else {
            number = 'tel:${091123456789}';
        }
        Linking.openURL(number);
    }

    openMessages = () => {

        let message = '';
        if (Platform.OS === 'ios') {

            message = 'sms:1-408-555-1212'
        }
        else {
            message = 'sms:1-408-555-1212?body=yourMessage'
        }
        Linking.openURL(message);

    }


    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.header}>
                        <View style={styles.headingCardView}>
                            <Card style={[styles.headingCard, styles.shadow]}>
                                <TouchableOpacity>
                                    <Image
                                        source={{ uri: this.state.logo }}
                                        style={styles.image}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                            </Card>
                        </View>
                    </View>
                    <View style={styles.subView}>
                        <View style={styles.subCardView}>
                            <TouchableOpacity onPress={() => this.openDailer()}>
                                <Image
                                    source={require('../../assets/call.png')}
                                    style={styles.callMailBtn}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.openMessages()}>
                                <Image
                                    source={require('../../assets/message.png')}
                                    style={styles.callMailBtn}
                                />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column' }}>

                                <Text
                                    allowFontScaling={false}
                                    style={styles.userName}>{global.user.firstName}</Text>
                                <View >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.address}>{global.user.address} </Text>
                                </View>

                            </View>
                        </View>
                        <View>
                            <Card style={styles.shadow}>
                                <CardItem>
                                    <Body>
                                        <View style={styles.addressCard}>
                                            <Image
                                                source={require('../../assets/pin.png')}
                                                style={styles.pinIcon}
                                                resizeMode='contain'
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.txt}>
                                                choose ship-to:
                                            </Text>
                                        </View>
                                        <View>
                                            {
                                                this.state.address.map((item, key) => (
                                                    <TouchableOpacity key={key}
                                                        onPress={() => this.props.navigation.navigate('AddAddress', item)
                                                        }>
                                                        <View style={styles.addressItems}>
                                                            <Image
                                                                source={require('../../assets/company_name.png')}
                                                                style={styles.icon}
                                                            />
                                                            <View style={styles.addressCardView}>
                                                                <Text
                                                                    allowFontScaling={false}
                                                                >
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                            <Image
                                                                source={require('../../assets/pencil.png')}
                                                                style={styles.icon}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={styles.addAddressBtnView}>
                            <TouchableOpacity style={[styles.Btn, styles.shadow]} onPress={() => this.props.navigation.navigate('AddAddress')}>
                                <Image
                                    source={require('../../assets/add.png')}
                                    style={styles.addAddressBtn}
                                />
                            </TouchableOpacity>
                            <Text
                                allowFontScaling={false}
                                style={[styles.txt, styles.addAddressTxt]}>
                                ADD SHIP-TO</Text>
                        </View>

                    </View>

                </ScrollView>
            </Container>
        );
    }
}
