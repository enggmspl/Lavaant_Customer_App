import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Card,
  Container,
  Picker
} from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import * as commanFn from '../../utility/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackHandler} from 'react-native';


export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: '',
      property: '',
      quantity: 1,
      productId: '',
      image: '',
      price: 0,
      variation: [],
      hieght: '',
      length: '',
      width: '',
      sku: ''
    };
  }
  componentDidMount() {
   
    BackHandler.addEventListener("hardwareBackPress",this.openTwoButtonAlert);
}
componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress",this.openTwoButtonAlert);
}

openTwoButtonAlert=()=>{
    this.props.navigation.navigate("BottomTab");
    return true;
}
  UNSAFE_componentWillMount() {

    const { params } = this.props.navigation.state
    console.log('productDetail', params)
    if (params) {
      this.setState({
        name: params.name,
        description: params.description,
        subCategory: params.subCategory.name,
        category: params.category.name,
        productId: params.id,
        image: params.image,
        variation: params.variation.items,
        price: params.costPerEach,
        height: params.height,
        length: params.length,
        width: params.width,
        sku: params.sku,
        pdf: params.pdf
      })
    }
  }

  increment = (value) => {
    value++
    this.setState({
      quantity: value
    })
  }

  decrement = (value) => {
    if (value == 1) {
      return
    }
    value--
    this.setState({
      quantity: value
    })
  }

  AddToCart = async () => {
    let isSameProduct = false
    if (this.state.quantity == 0) {
      Alert.alert('', 'please select quantity grater then 0')
    } else {
      let cartItem = await commanFn.getFromLocalStorge('cartItems')
      if (cartItem !== null) {
        cartItem.forEach((item) => {
          if (item.productId == this.state.productId) {
            isSameProduct = true
            return item.quantity += this.state.quantity
          }
        })
      } else {
        cartItem = []
      }
      console.log("cartItemIn", this.state)
      if (!isSameProduct) {
        let item = {
          name: this.state.name,
          image: this.state.image,
          subCategory: this.state.subCategory,
          category: this.state.category,
          productId: this.state.productId,
          quantity: this.state.quantity,
          price: this.state.price
        }
        cartItem.push(item)
      }
      console.log("cartItemIn::after", cartItem)
      commanFn.setInLocalStorge('cartItems', cartItem)
      this.props.navigation.navigate("Cart")
    }
  }

  isValidPDF(pdfUrl) {
    console.log('url to be evaluated :: ', pdfUrl);
    pdfUrl = pdfUrl.substr(1 + pdfUrl.lastIndexOf("/"));
    pdfUrl = pdfUrl.split('?')[0];
    pdfUrl = pdfUrl.split('#')[0];
    pdfUrl = pdfUrl.split('.').pop();

    console.log('pdf extension :: ', pdfUrl);
    return pdfUrl.trim() === 'pdf';
  }

  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <SubHeader title='Products Detail' />
          <View style={styles.mainCardView}>
            <Card >
              <View style={styles.imageView}>
                <Image
                  source={{ uri: this.state.image }}
                  style={styles.productImage}
                />
                <Text
                  allowFontScaling={false}
                  style={styles.mainText}>
                  {this.state.name}
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.headingText}>Description</Text>
              <View style={styles.verticalLine}></View>
              <View style={styles.mainView}>
                <View style={styles.descriptionLine}>
                  <Text allowFontScaling={false}>Price :</Text>
                  <Text allowFontScaling={false}>{this.state.price}$</Text>
                </View>
                {this.state.length != '' ? <View style={styles.descriptionLine}>
                  <Text allowFontScaling={false}>length :</Text>
                  <Text allowFontScaling={false}>{this.state.length}</Text>
                </View> : null}
                {this.state.width != '' ? <View style={styles.descriptionLine}>
                  <Text allowFontScaling={false}>Width :</Text>
                  <Text allowFontScaling={false}>{this.state.width}</Text>
                </View> : null}
                {this.state.width != '' ? <View style={styles.descriptionLine}>
                  <Text allowFontScaling={false}>Hieght :</Text>
                  <Text allowFontScaling={false}>{this.state.hieght}</Text>
                </View> : null}
                {this.state.sku != '' ? <View style={styles.descriptionLine}>
                  <Text allowFontScaling={false}>Sku :</Text>
                  <Text allowFontScaling={false}>{this.state.sku}</Text>
                </View> : null}
                <View style={styles.descriptionLine}>
                  <View style={styles.subDetailsView}>
                    <Text allowFontScaling={false}
                      style={styles.subCategoryLable}>
                      Sub Category:
                    </Text>
                    {this.state.variation.length > 0 ? <Text allowFontScaling={false}
                      style={styles.subCategoryText}>
                      {this.state.subCategory}
                    </Text> : null}
                    <Text
                      allowFontScaling={false} style={styles.subCategoryLable}>
                      Quantity:
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'column', }}>
                    <Text allowFontScaling={false}
                      style={styles.subCategoryDetail}>
                      {this.state.subCategory}
                    </Text>
                    {this.state.variation.length > 0 ? <View style={styles.pickerView}>
                      <Picker
                        allowFontScaling={false}
                        mode='dailog'
                        iosIcon={<Icon name="caret-down" size={25} style={{ padding: '2%' }} />}
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                        {this.state.variation.map((item, key) => 
                        <Picker.Item label={item.type} value={item.type} />)}
                      </Picker>
                    </View> : null}
                    <View style={styles.quantityView}>
                      <TouchableOpacity activeOpacity={1} onPress={() => { this.decrement(this.state.quantity) }}>
                        <View style={styles.quantityBtn}>
                          <Text allowFontScaling={false} style={styles.quantityBtnTxt}>-</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.quantityTxt}>
                        <Text allowFontScaling={false}>
                          {this.state.quantity}
                        </Text>
                      </View>
                      <TouchableOpacity activeOpacity={1} onPress={() => { this.increment(this.state.quantity) }}>
                        <View style={styles.quantityBtn}>
                          <Text allowFontScaling={false} style={styles.quantityBtnTxt}> +</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  {console.log('open pdfffff', this.state.pdf)}
                  {(this.state.pdf && this.isValidPDF(this.state.pdf)) ?

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PdfViewer', { pdf: this.state.pdf })} >
                      <Text
                        allowFontScaling={false} style={styles.editCategoryText}>
                        VIEW DETAIL
                      </Text>
                    </TouchableOpacity>

                    : null


                  }
                </View>
                <View
                  style={styles.addToCartView}>
                  <TouchableOpacity onPress={() => this.AddToCart()} style={styles.Btn}>
                    <Text allowFontScaling={false} style={styles.BtnTxt} > Add To Cart +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
