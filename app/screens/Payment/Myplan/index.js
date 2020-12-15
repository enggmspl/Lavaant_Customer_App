import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import MainHeader from '../../../Components/MainHeader';
import SubHeader from '../../../Components/SubHeader';
import { ScrollView } from 'react-native-gesture-handler';
import * as Utility from '../../../utility/index'
import * as Url from '../../../constants/urls'
import * as Service from '../../../api/services'
import Loader from '../../../Components/Loader'
import styles from "./style"
export default class Myplan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CustomerList: [],
            getfeature: [],
            currentplan: '',
            amount: '',
            isLoading: false,
            userId: '',
            subscribeId: '',
        }
    }
    componentDidMount = async () => {
        this.userDetail()
    }

    userDetail = async () => {
        let token = await Utility.getFromLocalStorge('token')
        let userId = await Utility.getFromLocalStorge('userId');
        let res = await Service.get(Url.USER_DETAIL + `${userId}`, token)
        if (res.isSuccess == true) {
            this.customerPlan()
            this.getFeature()
            this.setState({
                currentplan: res.data.currentPlan,
                amount: res.data.amount,
                subscriptionId: res.data.subscriptionId
            })
        }
    }


    customerPlan = async () => {
        let token = await Utility.getFromLocalStorge('token')
        console.log("alert mesge :::::", token)
        {
            const res = await Service.get(Url.GET_PLAN + `role=${"customer"}&status=${"active"}`, token)
            await this.setState({
                isLoading: false,

            })

            if (res.data) {
                this.setState({
                    CustomerList: res.data,
                    isLoading: false,
                })
            }
            else {
                this.setState({ isLoading: false })
                Alert.alert('', 'Something Went Wrong')
            }
        }
    }

    getFeature = async () => {

        let token = await Utility.getFromLocalStorge('token')

        console.log("token", token)
        const res = await Service.get(Url.GET_FEATURES + `role=${"customer"}&status=${"active"}`, token)
        console.log(res)
        this.setState({
            isLoading: false
        })
        if (res.data) {

            this.setState({
                isLoading: false,
                getfeature: res.data
            })
            console.log("getState feature", this.state.getfeature)
        }
    }
    unsub = async () => {
        await Utility.removeAuthKey('currentPlan')
        await Utility.removeAuthKey('amount')
        let userId = await Utility.getFromLocalStorge('userId');
        let body = {
            userId: userId,
            subscriptionId: this.state.subscriptionId
        }
        console.log("body//", body)
        let res = await Service.post(Url.PLAN_UNSUBSCRIBE, "", body)
        console.log("res", res)
        this.props.navigation.navigate("SignIn")
    }
    Subscribe = () => {
        Alert.alert(
            "",
            "Do You Want to Unsubscribe Your Plan",
            [
                { text: "No", onPress: () => { }, style: "cancel" },
                { text: "Yes", onPress: () => this.unsub() },

            ],
            { cancelable: false },
        );
    }
    changeplan = () => {
        Utility.setInLocalStorge('route', 'Myplan')
        this.props.navigation.navigate('SelectPlan')
    }
    render() {
        return (
            <ScrollView>
                <MainHeader navigate={this.props.navigation}></MainHeader>
                <SubHeader title={"CURRENT PLAN"} />
                <Loader isLoading={this.state.isLoading} />
                <View>
                    <View>
                        {this.state.CustomerList.map((element, key) => (
                            element.title === this.state.currentplan ?
                                <View style={styles.planMainView}>
                                    <View style={styles.planTitleView}>
                                        <Text style={styles.planTitleTxt}>{element.title}</Text>
                                    </View>
                                    {this.state.getfeature.map((data, key) => (
                                        <View style={styles.featureView}>
                                            {element.features.map((element, key) => (
                                                <View>
                                                    {data.id == element.id ?
                                                        <View style={styles.featureSubView}>
                                                            <Image source={require('../../../assets/dotWhite.png')} style={{ top: 8 }}></Image>
                                                            <Text style={styles.featureTxt}>
                                                                {data.name}</Text>
                                                        </View>
                                                        : null}
                                                </View>))}
                                        </View>
                                    ))}
                                    <View style={styles.amountView}>
                                        <Text style={styles.amountTxt}>${this.state.amount}</Text>
                                        <Text style={styles.amountMonthTxt}>per month</Text>
                                    </View>
                                </View>
                                : null
                        ))}
                        <View style={styles.btnView}>
                            <View style={styles.unsubscribeView} >
                                <TouchableOpacity
                                    onPress={() => this.Subscribe()}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.unsubscribeTxt}>Unsubscribe</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.changePlanView}>
                                <TouchableOpacity
                                    onPress={() => this.changeplan()}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.changePlanTxt}>Change Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
