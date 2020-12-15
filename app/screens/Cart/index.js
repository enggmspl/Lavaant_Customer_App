import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Container, Body, Card, CardItem, Grid, Col, Row } from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import Loader from '../../Components/Loader';
import {BackHandler} from 'react-native';
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorId: '',
            vendorName: '',
            productId: '',
            isLoading: false,
            modalVisible: false,
            productCount: 0,
            cartItems: [],
            totalPrice: 0,
            totalItem: 0,
            cartItemLength: 0
        };
    }

    componentWillMount() {
        console.log('componentWillMount::cartLENgth', this.state.cartItemLength)
        this.getCartItem()
        BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);

    }
    componentDidMount() {
     
        BackHandler.addEventListener("hardwareBackPress",this.openTwoButtonAlert);
    }
    
    openTwoButtonAlert=()=>{
        this.props.navigation.navigate("BottomTab");
        return true;
    }
    getCartItem = async () => {
        let items = await commanFn.getFromLocalStorge('cartItems')
        console.log('item', items)
        let total = 0
        if (items !== null) {
            items.forEach(item => {
                total += (parseFloat(item.price) * item.quantity)
                this.setState({
                    totalPrice: parseFloat(total).toFixed(2)
                })
                this.setState({
                    cartItemLength: this.state.cartItemLength + item.quantity
                })
                console.log('getCartItem::cartLENgth', this.state.cartItemLength)
            });
            await commanFn.setInLocalStorge('cartItemLength', this.state.cartItemLength)
            console.log("cartitem", items)
            if (items) {
                this.setState({
                    cartItems: items
                })
            }
        } else {
            return
        }
    }

    increment = async (key) => {
        console.log('keykeykeykey', key)
        let itemTotalPrice = this.state.cartItems[key].price * this.state.cartItems[key].quantity
        console.log('itemTotalPrice', itemTotalPrice)
        this.state.totalPrice -= itemTotalPrice
        this.state.cartItems[key].quantity++
        this.state.totalPrice += this.state.cartItems[key].price * this.state.cartItems[key].quantity
        let newArr = this.state.cartItems
        console.log('newItem', newArr)
        await this.setState({
            cartItems: this.state.cartItems,
            totalPrice: parseFloat(this.state.totalPrice).toFixed(2),
            cartItemLength: this.state.cartItemLength + 1
        })
        console.log('increment::cartLENgth', this.state.cartItemLength)
        await commanFn.setInLocalStorge('cartItemLength', this.state.cartItemLength)
        await commanFn.setInLocalStorge('cartItems', this.state.cartItems)
    }

    decrement = async (key) => {
        if (this.state.cartItems[key].quantity == 1) {
            this.deleteItem(key)
            return
        }
        else {
            let itemTotalPrice = this.state.cartItems[key].price * this.state.cartItems[key].quantity
            console.log('itemTotalPrice', itemTotalPrice)
            this.state.totalPrice -= itemTotalPrice
            this.state.cartItems[key].quantity--
            this.state.totalPrice += this.state.cartItems[key].price * this.state.cartItems[key].quantity
            let newArr = this.state.cartItems
            await this.setState({
                cartItems: newArr,
                totalPrice: parseFloat(this.state.totalPrice).toFixed(2),
                cartItemLength: this.state.cartItemLength - 1
            })
            console.log('decrement::cartLENgth', this.state.cartItemLength)

            await commanFn.setInLocalStorge('cartItemLength', this.state.cartItemLength)
            await commanFn.setInLocalStorge('cartItems', this.state.cartItems)
        }
    }

    placeOrder = async () => {
        let res = await commanFn.getFromLocalStorge('address')
        let address = JSON.parse(res)
        console.log('address', address)
        this.setState({
            isLoading: true
        })
        let products = []
        if (this.state.cartItems.length > 0) {
            let totalItems = 0
            this.state.cartItems.forEach((item) => {
                totalItems = + item.quantity
                products.push({
                    id: item.productId,
                    name: item.name,
                    category: item.category,
                    subCategory: item.subCategory,
                    price: item.quantity * item.price,
                    quantity: item.quantity
                })
            })
           await this.setState({
                totalItem: totalItems
            })
            let body = {
                totalItem: this.state.cartItemLength,
                totalAmount: this.state.totalPrice,
                addressId: address.addressId,
                userId: address.userId,
                products: products
            }

            if (this.state.totalPrice == 0) {
                Alert.alert(
                    '',
                    'Please Select quantity ')
            } else {
                this.setState({
                    isLoading: true
                })
                try {
                    let response = await Service.post(Url.PlaceOrder_URL, '', body)
                    if (response) {
                        this.setState({
                            isLoading: false
                        })
                        await commanFn.setInLocalStorge('cartItems', [])
                        Alert.alert(
                            'Thank You',
                            'Order Place Successfully',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.dispatch(
                                            StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'Cart' })]
                                            })
                                        );
                                        this.props.navigation.navigate('tab3');
                                    }
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                }
                catch (err) {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert("", err.message)
                }
            }
        }
        else {
            this.setState({
                isLoading: false
            })
            Alert.alert("", 'Please Add Some Product')
        }
    }

    deleteItem = async (key) => {
        let itemTotalPrice = this.state.cartItems[key].price * this.state.cartItems[key].quantity
        console.log(`this.state.cartItems[key].quantitythis.state.cartItems[key].quantity${this.state.cartItems[key].price}, ${this.state.cartItems[key].quantity} `)
        await this.setState({
            cartItemLength: this.state.cartItemLength - this.state.cartItems[key].quantity
        })
        console.log('decrement::cartLENgth', this.state.cartItemLength)
        await commanFn.setInLocalStorge('cartItemLength', this.state.cartItemLength)
        this.state.totalPrice -= itemTotalPrice
        let newItem = this.state.cartItems.splice(key, 1);
        await commanFn.setInLocalStorge('cartItems', this.state.cartItems)
        await this.setState({
            cartItems: this.state.cartItems,
            totalPrice: parseFloat(this.state.totalPrice).toFixed(2),
        })
        console.log('this.state.cartItemsthis.state.cartItemsthis.state.cartItems', this.state.cartItems.length)
        if (this.state.cartItems.length == 0) {
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Cart' })]
                })
            );
            this.props.navigation.navigate('tab3');
        }
    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title='Cart' />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.mainView}>
                        {
                            this.state.cartItems.length > 0 ?
                                this.state.cartItems.map((item, key) =>
                                    <Card
                                        style={styles.cardView}>
                                        <CardItem >
                                            <Body>
                                                <Grid>
                                                    <Col size={1.5}>
                                                        <Image
                                                            source={{ uri: item.image, }}
                                                            style={styles.cartItemImage}
                                                        />
                                                    </Col>
                                                    <Col size={2.5}>
                                                        <Row>
                                                            <Text allowFontScaling={false}
                                                                style={styles.cartItemName}>
                                                                {item.name}
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Text allowFontScaling={false}
                                                                style={styles.otherDetails}>
                                                                {item.subCategory}
                                                            </Text>
                                                        </Row>
                                                        <Row>
                                                            <Text allowFontScaling={false}
                                                                style={styles.otherDetails}>
                                                                ${item.price}
                                                            </Text>
                                                        </Row>
                                                    </Col>
                                                    <Col size={1.2}>
                                                        <Row>
                                                            <View style={styles.deleteBtnView}>
                                                                <View style={styles.deleteBtn}>
                                                                    <TouchableOpacity onPress={() => this.deleteItem(key)}>
                                                                        <Text allowFontScaling={false} style={styles.quantityBtnTxt}>
                                                                            Delete </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </Row>
                                                        <Row>
                                                            <View style={styles.quantityView}>
                                                                <TouchableOpacity activeOpacity={1} onPress={() => this.decrement(key)} >
                                                                    <View style={[styles.quantityBtn, {
                                                                        borderTopLeftRadius: 3,
                                                                        borderBottomLeftRadius: 3
                                                                    }]}>
                                                                        <Text allowFontScaling={false} style={styles.quantityBtnTxt}>-</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <View style={styles.quantityTxt}>
                                                                    <Text allowFontScaling={false}>{this.state.productCount != 0 ? this.state.productCount : item.quantity}</Text>
                                                                </View>
                                                                <TouchableOpacity activeOpacity={1} onPress={() => this.increment(key)}>
                                                                    <View style={[styles.quantityBtn, {
                                                                        borderTopRightRadius: 3,
                                                                        borderBottomRightRadius: 3
                                                                    }]}>
                                                                        <Text allowFontScaling={false} style={styles.quantityBtnTxt}>+</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </Row>
                                                    </Col>
                                                </Grid>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                ) : 
                                <View style={styles.emptyCartView}>
                                    <Image source={require('../../assets/empty-cart.png')} resizeMode='cover' style={styles.emptyCartImage} />
                                </View>}
                    </View>
                    {
                        this.state.cartItems.length > 0 ? <View>
                            <View style={styles.borderLine}></View>
                            <View style={styles.totalPriceView}>
                                <Text allowFontScaling={false} style={styles.totalAmount}>Total Price:</Text>
                                <Text allowFontScaling={false} style={styles.totalAmount}> ${this.state.totalPrice}</Text>
                            </View>
                            <View style={styles.placeOrderBtn}>
                                <TouchableOpacity onPress={() => this.placeOrder()} style={styles.Btn}>
                                    <Text allowFontScaling={false} style={styles.placeOrderTx}>Place Your Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View> : null}
                </ScrollView>
            </Container>
        );
    }
}
