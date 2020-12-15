import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert, } from 'react-native';
import { Container, Card, Picker } from 'native-base';
import styles from './style';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import { NavigationActions, StackActions } from 'react-navigation';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import Loader from '../../Components/Loader'
import { TextInputMask } from 'react-native-masked-text'
import {BackHandler} from 'react-native';

export default class AddAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areaList: [
                'N', 'NW', 'NE', 'S', 'SE', 'SW', 'Central', 'Downtown', 'E', 'W'
            ],
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            specialInstruction: '',
            contactName: '',
            contactNumber: '',
            alternateContactNumber: '',
            status: "active",
            userId: '',
            action: 'addAddress',
            area: '',
            addressId: '',
            isLoading: false
        };

    }
    componentDidMount() {
      
        BackHandler.addEventListener("hardwareBackPress",this.openTwoButtonAlert);
    }
    // componentWillUnmount(){
    //     BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);
    // }

    openTwoButtonAlert=()=>{
        this.props.navigation.navigate("ChooseAddress");
        return true;
    }
    UNSAFE_componentWillMount() {

        const { params } = this.props.navigation.state
        BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);

        if (params) {
            this.setState({
                name: params.name,
                address: params.address,
                city: params.city,
                state: params.state,
                zipCode: params.zipCode,
                specialInstruction: params.specialInstruction,
                contactName: params.contactName,
                contactNumber: params.contactNumber,
                area: params.area || '',
                alternateContactNumber: params.alternateContactNumber,
                status: params.status,
                userId: params.user,
                action: 'updateaAddress',
                addressId: params.id
            })
        }
    }

    updateAddress = async (addressId) => {
        this.setState({
            isLoading: true
        })
        if (commanFn.isFieldEmpty(this.state.name &&
            this.state.address && this.state.city && this.state.state && this.state.zipCode && this.state.specialInstruction
            && this.state.contactName && this.state.contactNumber && this.state.area)) {
            Alert.alert("", "Please enter all the fields")
            return
        }
        let userId = await commanFn.getFromLocalStorge('userId')
        let body = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode,
            specialInstruction: this.state.specialInstruction,
            contactName: this.state.contactName,
            contactNumber: this.state.contactNumber,
            area: this.state.area,
            alternateContactNumber: this.state.alternateContactNumber,
            status: this.state.status,
            userId: userId,
            addressId: addressId,

        }

        let shipToAddress = await commanFn.getFromLocalStorge('address')

        if (shipToAddress) {
            await commanFn.removeAuthKey('address')

        }
        let natigateFrom = await commanFn.getFromLocalStorge('navigateFrom')
        if (natigateFrom !== null) {
            await commanFn.removeAuthKey('navigateFrom')
        }
        await commanFn.setInLocalStorge('address', JSON.stringify(body))
        const res = await Service.put(Url.AddressUpdate_URL + `${addressId}`, null, body)
        if (res) {
            this.setState({
                isLoading: false
            })
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'AddAddress' })]
                })
            );
            this.props.navigation.navigate('tab3');
            await commanFn.setInLocalStorge('navigateFrom', 'productscreen')
        } else {
            Alert.alert('', 'Something Went Wrong')
        }


    }
    AddAddress = async () => {
        if (this.state.action == 'updateaAddress') {
            this.updateAddress(this.state.addressId)
        }
        else {

            if (commanFn.isFieldEmpty(this.state.name &&
                this.state.address && this.state.city && this.state.state && this.state.zipCode && this.state.specialInstruction
                && this.state.contactName && this.state.contactNumber && this.state.area)) {
                Alert.alert("", "Please enter all the fields")
                return
            }
            let userId = await commanFn.getFromLocalStorge('userId')
            this.setState({
                isLoading: true
            })
            let body = {
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipCode: this.state.zipCode,
                specialInstruction: this.state.specialInstruction,
                contactName: this.state.contactName,
                contactNumber: this.contactNumber.getRawValue(),
                area: this.state.area,
                alternateContactNumber: this.alternateContactNumber.getRawValue(),
                status: this.state.status,
                userId: userId,
                addressId: this.state.addressId,
            }

            let shipToAddress = await commanFn.getFromLocalStorge('address')
            if (shipToAddress) {
                await commanFn.removeAuthKey('address')
            }
            await commanFn.setInLocalStorge('address', JSON.stringify(body))

            const res = await Service.post(Url.AddAddress_URL, null, body)
            if (res) {
                this.setState({
                    isLoading: false
                })
                this.props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'AddAddress' })]
                    })
                );
                let natigateFrom = await commanFn.getFromLocalStorge('navigateFrom')
                console.log('product::AddAddress.........', natigateFrom)
                if (natigateFrom !== null) {
                    await commanFn.removeAuthKey('navigateFrom')
                }
                await commanFn.setInLocalStorge('navigateFrom', 'productscreen')
                this.props.navigation.navigate('tab3');
                console.log("Address added successfully")
            } else {
                Alert.alert('', 'Something Went Wrong')
            }
        }

    }

    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title='SHIP TO' />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.mainCardView}>
                        <Card>
                            <View style={styles.subView}>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/userGrey.png')}
                                        style={styles.icon}
                                    />

                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="Name"
                                            placeholderTextColor="#000"
                                            onChangeText={(name) => this.setState({ name })}
                                            style={styles.txtInput}
                                            value={this.state.name}
                                        />
                                    </View>

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/address.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="Address"
                                            placeholderTextColor="#000"
                                            onChangeText={(address) => this.setState({ address })}
                                            style={styles.txtInput}
                                            value={this.state.address}
                                        />
                                    </View>

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/city.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="City"
                                            placeholderTextColor="#000"
                                            onChangeText={(city) => this.setState({ city })}
                                            style={styles.txtInput}
                                            value={this.state.city}
                                        />
                                    </View>

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/state.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="State"
                                            placeholderTextColor="#000"
                                            onChangeText={(state) => this.setState({ state })}
                                            style={styles.txtInput}
                                            value={this.state.state}
                                        />
                                    </View>

                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/zipcode.png')}
                                        style={styles.icon}
                                    />

                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="Zip Code"
                                            placeholderTextColor="#000"
                                            onChangeText={(zipCode) => this.setState({ zipCode })}
                                            style={styles.txtInput}
                                            value={this.state.zipCode}
                                        />
                                    </View>

                                </View>

                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/special_ints..png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="Special Instructions"
                                            placeholderTextColor="#000"
                                            onChangeText={(specialInstruction) => this.setState({ specialInstruction })}
                                            style={styles.txtInput}
                                            value={this.state.specialInstruction}
                                        />
                                    </View>
                                </View>

                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/userGrey.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInput
                                            require
                                            allowFontScaling={false}
                                            placeholder="Contact Name"
                                            placeholderTextColor="#000"
                                            onChangeText={(contactName) => this.setState({ contactName })}
                                            style={styles.txtInput}
                                            value={this.state.contactName}
                                        />
                                    </View>
                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/phone_number.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInputMask
                                            require
                                            ref={(ref) => this.contactNumber = ref}
                                            allowFontScaling={false} require
                                            placeholder="Contact Number"
                                            placeholderTextColor="#000"
                                            type={'custom'}
                                            options={{
                                                mask: '9999999999'
                                            }}
                                            keyboardType='numeric'
                                            onChangeText={
                                                (contactNumber) => {
                                                    this.setState({ contactNumber })
                                                }
                                            }
                                            value={this.state.contactNumber}
                                            style={styles.txtInput}
                                        />
                                    </View>
                                </View>
                                <View style={styles.SectionStyle}>
                                    <Image
                                        source={require('../../assets/phone_number.png')}
                                        style={styles.icon}
                                    />
                                    <View style={styles.inputStyle}>
                                        <TextInputMask
                                            require
                                            ref={(ref) => this.alternateContactNumber = ref}
                                            allowFontScaling={false} require
                                            placeholder="Alternate Contact Number"
                                            placeholderTextColor="#000"
                                            type={'custom'}
                                            options={{
                                                mask: '9999999999'
                                            }}
                                            keyboardType='numeric'
                                            onChangeText={
                                                (alternateContactNumber) => {
                                                    this.setState({ alternateContactNumber })
                                                }
                                            }
                                            value={this.state.alternateContactNumber}
                                            style={styles.txtInput}
                                        />
                                    </View>
                                </View>
                                <View style={styles.SectionStyle}>
                                    <View style={[styles.inputStyle, { marginLeft: '10%' }]}>
                                        <Picker
                                            placeholder='Area'
                                            placeholderStyle={{ color: 'black', paddingLeft: -4, fontSize: 14 }}
                                            mode='dailog'
                                            textStyle={{ fontSize: 14, paddingLeft: -4, }}
                                            selectedValue={this.state.area}
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue != "0")
                                                    this.setState({ area: itemValue })
                                            }}>
                                            <Picker.Item enabled={false} label="Area" value="0" />
                                            {this.state.areaList.map((item, key) =>
                                                <Picker.Item key={key} label={item} value={item} />
                                            )}
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        <TouchableOpacity style={styles.Btn} onPress={() => this.AddAddress()}>
                            <Text
                                allowFontScaling={false}
                                style={styles.BtnTxt}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
