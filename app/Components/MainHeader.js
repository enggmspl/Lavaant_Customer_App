import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import {
    Icon, Header, Left, Right, Badge, Body
} from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import * as commanFn from '../utility/index';
import * as Utility from '../utility/index';

export default class mainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            navigationRoute: '',
            navigateFrom: null,
            backButtonDisable: false,
            cartItems: 0,
            role: "",
            Phone: "Phone",

        }
    }

    componentDidMount = async () => {
        let navigate = this.props.navigate
        await this.setState({
            navigationRoute: navigate.state.routeName,
        })
        let natigateFromScreen = await commanFn.getFromLocalStorge('navigateFrom')
        var role = await commanFn.getFromLocalStorge('role');
        this.setState({
            role: role
        })
        var cartItemLength = await commanFn.getFromLocalStorge('cartItemLength');
        console.log('cartItemcartItemcartItemcartItem', cartItemLength)
        await this.setState({
            cartItems: cartItemLength || 0
        })
        if (role == 'customer' && (global.user.customerGroup === '' || global.user.customerGroup === null || global.user.customerGroup === undefined)) {
            await this.setState({
                backButtonDisable: true
            })
        } else {
            await this.setState({
                backButtonDisable: false
            })
        }
        console.log('mainheader::componentDidMount::natigateFromScreen.........', natigateFromScreen)

        if (natigateFromScreen !== null) {
            await this.setState({
                navigateFrom: natigateFromScreen
            })
            await commanFn.removeAuthKey('navigateFrom')
        }
    }
    goToOrder = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'tab1' })]
            })
        );
        navigate.navigate('tab1');

    }

    goToHome = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        );
        navigate.navigate('BottomTab2');
    }
    goToBack=async(navigate)=>{
        let route=await Utility.getFromLocalStorge("route")
        console.log("selected routee",route)
        if(route=="Myplan"){
            navigate.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'SelectPlan' })]
                })
            );
            navigate.navigate('Myplan');
        }
        else{
            navigate.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'SelectPlan' })]
                })
            );
            navigate.navigate('SignIn');
        }
    }
    goToTaskReminder = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TaskReminder' })]
            })
        );
        navigate.navigate('TaskReminder')
    }

    goBack = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ProductDetails' })]
            })
        );
        navigate.navigate('tab3');

    }
    goBackToVendor = async (navigate) => {
            navigate.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Vendor' })]
                })
            );
            navigate.navigate('BottomTab');
    }
   
    goToFilters = (navigate) => {

        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'tab1' })]
            })
        );
        navigate.navigate('tab1');

    }
    goToLogin=(navigate)=>{
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
            })
        );
        navigate.navigate('SignIn');
    }
    goToSelectPlan=(navigate)=>{
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SelectPlan' })]
            })
        );
        navigate.navigate('SelectPlan');
    }
    goBackToAddress = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AddAddress' })]
            })
        );
        navigate.navigate('AddAddress');

    }
    goToProduct=(navigate)=>{
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'PdfViewer' })]
            })
        );
        navigate.navigate('tab3');

    }

    goToCart = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Cart' })]
            })
        );
        navigate.navigate('Cart');
    }
    goToChooseAddress = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ChooseAddress' })]
            })
        );
        navigate.navigate('ChooseAddress');
    }
    render() {
        let navigate = this.props.navigate
        let navigateRought = this.state.navigationRoute
        let backButton

        const backArrowBtn = <Image source={require('../assets/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
        const menuBtn =      <Image source={require('../assets/menu.png')} resizeMode='cover' style={{ width: 25, height: 20 }} />
        console.log('............navigate.................', navigate.state.routeName)



        if (navigateRought == 'tab1') {
            backButton = (< TouchableOpacity onPress={() => navigate.goBack(null)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == "OrderDetail") {
            backButton = (< TouchableOpacity onPress={() => this.goToOrder(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == "ProductDetails") {
            backButton = (< TouchableOpacity onPress={() => this.goBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'tab2') {
            backButton = (<TouchableOpacity onPress={() => navigate.dispatch(DrawerActions.toggleDrawer())}>
                {menuBtn}
            </TouchableOpacity>)
        }
        else if (navigateRought == 'tab3') {
            if (this.state.navigateFrom === 'productscreen') {
                console.log('navigateRought::productscreen', navigateRought)
                backButton = (< TouchableOpacity onPress={() => this.goToChooseAddress(navigate)}>
                    {backArrowBtn}
                </TouchableOpacity >)
            } else {
                console.log('navigateRought::productscreen::else', navigateRought)
                backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                    {backArrowBtn}
                </TouchableOpacity >)
            }
        }
        else if (navigateRought == 'AddAddress') {
            backButton = (< TouchableOpacity onPress={() => this.goToChooseAddress(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)

        }
        else if (navigateRought == 'ChangePassword'||navigateRought=='Myplan') {
            backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'ContactUs') {
            backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'MyProfile') {
            if (this.state.backButtonDisable) {
                backButton = (null)
            } else {
                backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                    {backArrowBtn}
                </TouchableOpacity >)
            }
        } else if (navigateRought == 'ChooseAddress') {
            backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        } else if (navigateRought == 'Home') {
            backButton = (<TouchableOpacity onPress={() => navigate.dispatch(DrawerActions.toggleDrawer())}>
                {menuBtn}
            </TouchableOpacity>)

        }
       
        else if (navigateRought == 'AddVendor') {
            backButton = (< TouchableOpacity onPress={() => this.goBackToVendor(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Reports') {
            backButton = (< TouchableOpacity onPress={() => this.goBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Filters') {
            backButton = (< TouchableOpacity onPress={() => this.goToFilters(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'SelectPlan') {
            backButton = (< TouchableOpacity onPress={() => this.goToBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
      
        else if (navigateRought == 'PaymentHome') {
            backButton = (< TouchableOpacity onPress={() => this.goToSelectPlan(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'PdfViewer') {
            backButton = (< TouchableOpacity onPress={() => this.goToProduct(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Cart') {
            backButton = (< TouchableOpacity onPress={() => this.goToProduct(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else {
            backButton = (< TouchableOpacity onPress={() => this.goBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }

        return (
            <Header style={[{ backgroundColor: '#dcf0fe', paddingBottom: 7 }]}>
                <Left>
                    {backButton}
                </Left>
                <Body style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/logoCustomerApp.png')} style={{ width: '48%', height: 40 }} />
                    </View>
                </Body>
                <Right>
                    {navigateRought == 'tab3' ?
                        < TouchableOpacity onPress={() => this.goToCart(navigate)}>
                            <View style={{
                                width: 40,
                                alignContent: 'center'
                            }}>
                                <Image source={require('../assets/cart.png')} style={{ width: 25, height: 25, }} />
                                {this.state.cartItems !== 0 ? <Badge style={{
                                    position: 'absolute',
                                    right: 1,
                                    top: -10,
                                    minWidth: 22,
                                    height: 22,
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    backgroundColor: '#199bf1',
                                }}><Text style={{ color: '#fff', fontWeight: 'bold', justifyContent: 'center', textAlign: 'center' }}>{this.state.cartItems}</Text>
                                </Badge> : null}
                            </View>
                        </TouchableOpacity>
                        : null}
                </Right>
            </Header >

        );
    }
}
