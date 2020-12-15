import React, { Component } from 'react';
import { View,Text,ScrollView,Image,Alert} from 'react-native';
import {Container,Card, ListItem, List} from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import Loader from '../../Components/Loader';
import {BackHandler} from 'react-native';

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.openFilters = this.openFilters.bind(this)
        this.state = {
            orders: [],
            name: '',
            address: '',
            isLoading: false,
            queryString: this.props.navigation.state.params ? this.props.navigation.state.params.queryString : ''
        }

    }

    componentDidMount() {
       
        BackHandler.addEventListener("hardwareBackPress",this.openTwoButtonAlert);
    }
    componentWillMount() {
        this.getOrders()
          BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);
    }
    openTwoButtonAlert=()=>{
        this.props.navigation.navigate("BottomTab");
        return true;
    }

    getOrders = async () => {
        let addressRes = await commanFn.getFromLocalStorge('address')
        let address = JSON.parse(addressRes)
        if (address === null) {
                 Alert.alert(
                    'Alert',
                    'Please select address first',
                [

                    {
                        text: 'OK', onPress: () => {
                            this.props.navigation.dispatch(
                                StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'ChooseAddress' })]
                                })
                            );
                            this.props.navigation.navigate('ChooseAddress');

                        }
                    },
                ],
                    { cancelable: false },
                      );
            return
        }
        this.setState({
            isLoading: true
        })
        console.log('Query String : ', this.state.queryString);
        let res = await Service.get(Url.OrderList_URL + `userId=${address.userId}${this.state.queryString}`, '')
        console.log('asdsd', res)
        this.setState({
            orders: res.items,
            name: address.name,
            address: address.address,
            isLoading: false
        })
    }

    orderDetail = (item) => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'OrderDetail', item })]
            })
        );
        this.props.navigation.navigate('OrderDetail', item)

    }
    openFilters() {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Filters" })]
            })
        );
        this.props.navigation.navigate('Filters');
    }

    onFilterPress = () => {
        console.log('Filter button pressed');
    }

    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title="Reports"
                        showFilters={true}
                        onFilterPress={this.openFilters}
                    />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.orderMainView}>
                        {this.state.orders.length ? <Card>
                            <View style={styles.addressListView}>
                                <List >
                                    {this.state.orders.map((item, key) =>
                                        <ListItem key={key} onPress={() => this.orderDetail(item)}>
                                            <Image
                                                source={require('../../assets/company_name.png')}
                                                style={styles.icon}
                                            />
                                            <Text style= {{fontSize:14}} allowFontScaling={false}>{item.orderNo}</Text>
                                            <View style={styles.orderListDateView}>
                                                <Text allowFontScaling={false} style={styles.orderListDate}>{item.createdOn}</Text>
                                            </View>
                                        </ListItem>
                                    )}
                                </List>
                            </View>
                        </Card> : null}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
