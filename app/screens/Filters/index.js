import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Container, Card, ListItem, CheckBox, Body } from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import Loader from '../../Components/Loader';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            from: '',
            to: '',
            search: '',
            subCategories: [],
            productList: [],
        }
    }
    componentDidMount() {
        this.getProductByCategory();
        this.getProducts();
    }

    goToReports = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Reports' })]
            })
        );
        console.log('Query String param : ', this.state.queryString);
        this.props.navigation.navigate('Reports', { queryString: this.state.queryString })
    }

    onPressCheckbox(item) {
        const checkedCheckBox = this.state.subCategories.find((cb) => cb.id === item.id);
        checkedCheckBox.checked = !checkedCheckBox.checked;
        console.log('checked checkbox :: ', checkedCheckBox);

        let categories = this.state.subCategories.map((category) => {
            return category.id === checkedCheckBox.id ? checkedCheckBox : category
        });
        console.log('categories after check box checked', categories);
        this.setState({
            subCategories: categories
        })
    }

    onProductCheckboxPress(item) {
        const checkedCheckBox = this.state.productList.find((cb) => cb.id === item.id);
        checkedCheckBox.checked = !checkedCheckBox.checked;
        console.log('checked checkbox :: ', checkedCheckBox);

        let products = this.state.productList.map((product) => {
            return product.id === checkedCheckBox.id ? checkedCheckBox : product
        });
        console.log('categories after check box checked', products);
        this.setState({
            productList: products
        })
    }


    getProducts = async () => {
        console.log('inside get Product list ..........##########.........')
        this.setState({
            isLoading: true
        })
        try {
            let customerGroup = await commanFn.getFromLocalStorge('customerGroup')
            let res = await Service.get(Url.ProductList_URL + `pageNo=${1}&pageSize=${1000}`, "")
            if (res.items) {
                this.setState({
                    productList: res.items,
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
                Alert.alert('', 'Something Went Wrong')
            }
        } catch (err) {
            this.setState({
                isLoading: false
            })
            Alert.alert('', err.message)
        }


    }

    searchProduct = async () => {
        console.log('inside search product******************')

        const res = await Service.get(Url.ProductSearch_URL + `name=${this.state.search}`, "")

        console.log('searchProduct', res)
        if (res.data) {
            this.setState({
                productList: res.data,
                isLoading: false
            })
        }
        else {
            this.setState({ isLoading: false })
            Alert.alert('', 'Something Went Wrong')
        }
    }

    search(search) {
        if (search === null || search === '') {
            this.getProducts();
        } else {
            this.setState({ search })

        }
    }

    getProductByCategory = async () => {
        console.log('inside getProductByCategory....')
        this.setState({
            isLoading: true
        })
        let token = await commanFn.getFromLocalStorge('token')
        let userId = await commanFn.getFromLocalStorge('userId')
        const res = await Service.get(Url.GET_PRODUCT_BYSUBCATEGORY_URL + `id=all`, token)
        if (res.data) {
            let categories = res.data.map(category => ({
                name: category.name,
                id: category.id,
                checked: false
            }));
            console.log('Categories :: ', categories);
            this.setState({
                subCategories: categories,
                isLoading: false
            })
        }
    }

    getSelectedItems(items) {
        return items.filter((selectedItem) => selectedItem.checked)

            .map((item) => {
                return item.name;

            });
    }
    formatDate(date) {
        return moment(date, "DD-MM-YYYY").format('YYYY-MM-DD');
    }
    applyFilters = async () => {
        console.log('inside filter');

        let subCategories = this.getSelectedItems(this.state.subCategories);
        let products = this.getSelectedItems(this.state.productList);
        let queryString = '';
        if (this.state.from) {
            queryString = `${queryString}&fromDate=${this.formatDate(this.state.from)}`;
        }
        if (this.state.to) {
            queryString = `${queryString}&toDate=${this.formatDate(this.state.to)}`;
        }
        if (subCategories != null && subCategories.length > 0) {
            queryString = `${queryString}&subCategories=${subCategories}`;
        }
        if (products != null && products.length > 0) {
            queryString = `${queryString}&products=${products}`;
        }

        console.log("Query String:: ", queryString);


        this.setState({
            queryString: queryString
        });

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Reports' })]
            })
        );
        console.log('Query String param : ', this.state.queryString);
        this.props.navigation.navigate('Reports', { queryString: queryString })
    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader
                        title="FILTERS"
                    />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                        <Card style={styles.card}>
                            <View style={{ padding: '5%' }}>
                                <Text style={styles.headings}>By Date</Text>
                                <View style={styles.datesMainView}>
                                    <View style={styles.dateIndividualView}>
                                        <Text> From:</Text>
                                        <View style={styles.inputViewStyle}>
                                            <DatePicker
                                                allowFontScaling={false}
                                                showIcon={false}
                                                date={this.state.from}
                                                mode="date"
                                                placeholder=" "
                                                format="DD-MM-YYYY"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                maxDate={new Date()}
                                                customStyles={{
                                                    dateInput: styles.dateInput,
                                                    dateText: styles.dateText,
                                                }}
                                                onDateChange={(date) => { this.setState({ from: date }) }}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.dateIndividualView}>
                                        <Text>To:</Text>
                                        <View style={styles.inputViewStyle}>
                                            <DatePicker
                                                allowFontScaling={false}
                                                showIcon={false}
                                                date={this.state.to}
                                                mode="date"
                                                placeholder=" "
                                                format="DD-MM-YYYY"
                                                minDate={this.state.from}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                maxDate={new Date()}
                                                customStyles={{
                                                    dateInput: styles.dateInput,
                                                    dateText: styles.dateText,
                                                    btnTextConfirm: styles.btnTextConfirm,
                                                }}
                                                onDateChange={(date) => { this.setState({ to: date }) }}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </Card>

                        <Card style={[styles.card, { height: 300, overflow: 'hidden' }]}>
                            <View style={{ padding: '5%' }}>
                                <Text style={styles.headings}>By Category</Text>

                                <ScrollView nestedScrollEnabled={true}>
                                    {this.state.subCategories.map((item, key) =>
                                        <ListItem key={key} style={{ marginLeft: 0, }}>
                                            <Body>
                                                <Text
                                                    allowFontScaling={false} style={styles.category}>
                                                    {item.name}
                                                </Text>
                                            </Body>
                                            <CheckBox style={styles.checkBox}
                                                checked={item.checked}
                                                onPress={() => this.onPressCheckbox(item)} />

                                        </ListItem>
                                    )}
                                </ScrollView>

                            </View>
                        </Card>

                        <Card style={[styles.card, { height: 300, overflow: 'hidden' }]}>
                            <View style={{ padding: '5%' }}>
                                <Text style={styles.headings}>By Name</Text>
                                <Card style={{ width: '100%', alignSelf: 'center', marginBottom: '5%', borderRadius: 5 }}>
                                    <View style={styles.searchView} >
                                        <TextInput
                                            style={styles.searchTextInput}
                                            placeholder="Search Name"
                                            placeholderTextColor="grey"
                                            onChangeText={(search) => this.search(search)}
                                        />
                                        <TouchableOpacity onPress={() => this.searchProduct()}>
                                            <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <ScrollView nestedScrollEnabled={true}>
                                    {this.state.productList.map((item, key) =>
                                        <ListItem key={key} style={{ marginLeft: 0, }}>
                                            <Body>
                                                <Text
                                                    allowFontScaling={false} style={styles.category}>
                                                    {item.name}
                                                </Text>
                                            </Body>
                                            <CheckBox style={styles.checkBox}
                                                checked={item.checked}
                                                onPress={() => this.onProductCheckboxPress(item)} />

                                        </ListItem>
                                    )}
                                </ScrollView>
                            </View>
                        </Card>

                        <View style={{ marginBottom: "5%" }}>
                            <TouchableOpacity style={[styles.FbBtn, styles.AJ]} onPress={() => this.applyFilters()} >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.LoginBtnTxt2}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}