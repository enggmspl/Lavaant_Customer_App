import React, { Component } from 'react';
import { View, Text, Image,  TouchableOpacity, ScrollView } from 'react-native';


//import { BottomNavigation } from 'react-native';
//import BottomNavigator from '../../../Component/BottomNavigator/Navigation';
import styles from './style';
import {
    Container,
    Card,

} from 'native-base';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import * as commanFn from '../../utility/index';

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            orders: [],
            orderNo: '',
            quantity: ''
        };
    }
    componentWillMount() {
        this.getData()

    }
    getData = async () => {
        const { params } = this.props.navigation.state
        console.log('params', params)
        let addressRes = await commanFn.getFromLocalStorge('address')
        let address = JSON.parse(addressRes)
        if (params) {
            this.setState({
                name: address.name,
                address: address.address,
                orderNo: params.orderNo,
                quantity: params.totalItem

            })
        }

    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader />
                    <View style={styles.mainHeadingView}>
                        <Card style={styles.mainHeadingCard}>
                            <View style={styles.mainHeadingImageView}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../../assets/lee.png')}
                                        style={styles.mainHeadingImage}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.mainView}>
                        <View style={styles.orderHeading}>
                            <Text allowFontScaling={false} style={[styles.txt,{fontSize:18}]}>Orders </Text>
                        </View>
                        <View style={styles.shipToView}>
                            <View>
                                <Text allowFontScaling={false} style={styles.txt} >SHIP-TO:</Text>
                                <Text allowFontScaling={false} style={styles.details}>{this.state.name} </Text>
                                <Text allowFontScaling={false} style={styles.details}>{this.state.address} </Text>
                            </View>
                        </View>
                        <View style={styles.orderTableView}>
                            <View style={styles.tableHeadingsRow}>
                                <View style={styles.tableHeadingsColumn1}>
                                    <Text allowFontScaling={false} style={[styles.txt, styles.tableColumn1Data]}>Order No</Text>
                                </View>
                                <View style={styles.tableHeadingsColumn2}>
                                    <Text allowFontScaling={false} style={[styles.txt, styles.tableColumn2Data]}>Quantity</Text>
                                </View>
                            </View>
                            <View style={styles.tableDataView}>
                                <View style={styles.tableColumn1}>
                                    <Text allowFontScaling={false} style={styles.tableColumn1Data}>{this.state.orderNo}</Text>
                                </View>
                                <View style={styles.tableColumn2}>
                                    <Text allowFontScaling={false} style={styles.tableColumn2Data}>{this.state.quantity}</Text>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </ScrollView>
            </Container >
        );
    }
}