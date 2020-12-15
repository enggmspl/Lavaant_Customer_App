
import React from 'react';
import { Image} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screens/Splash';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import TermAndPoliciesScreen from '../screens/TermAndPolicies/'
import MyProfileScreen from '../screens/MyProfile';
import SelectVendor from '../screens/Vendor';
import ProductsScreen from '../screens/Products/';
import ProductDetailScreen from '../screens/ProductDetails/'
import CartScreen from '../screens/Cart/'
import AddAddressScreen from '../screens/AddAddress'
import ChooseAddressScreen from '../screens/ChooseAddress/'
import ReportsScreen from '../screens/Reports'
import OrderDetailScreen from '../screens/OrderDetail/'
import ChangePasswordScreen from '../screens/ChangePassword/'
import ContactUsScreen from '../screens/ContactUs/';
import ForgotPasswordScreen from '../screens/Forgotpassword';
import OtpVerificationScreen from '../screens/OtpVerification';
import ResetPasswordScreen from '../screens/ResetPassword';
import AddVendorScreen from '../screens/AddVendor';
import FiltersScreen from '../screens/Filters';
import PdfViewerScreen from '../screens/Pdfview/index';
import * as colors from '../constants/colors'

import PaymentHomeScreen from '../screens/Payment/PaymentHome'
import SelectPlanScreen from "../screens/Payment/SelectPlan"

import DarwerMenu from '../screens/Drawer/index';
import MyplanScreen from '../screens/Payment/Myplan'

const AppStack = createStackNavigator(
  {
    TermAndPolicies: {
      screen: TermAndPoliciesScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Myplan:{
      screen:MyplanScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: false,
        visible: false
      },
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        headerShown: false,
        visible: false
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OtpVerification: {
      screen: OtpVerificationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddVendor: {
      screen: AddVendorScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    MyProfile: {
      screen: MyProfileScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Vendor: {
      screen: SelectVendor,
      navigationOptions: {
        headerShown: false,
      },
    },
    Products: {
      screen: ProductsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductDetails: {
      screen: ProductDetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddAddress: {
      screen: AddAddressScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChooseAddress: {
      screen: ChooseAddressScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Reports: {
      screen: ReportsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Filters: {
      screen: FiltersScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    ContactUs: {
      screen: ContactUsScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    PdfViewer: {
      screen: PdfViewerScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    SelectPlan: {
      screen: SelectPlanScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    PaymentHome: {
      screen: PaymentHomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const DrawerNavigator = createDrawerNavigator({
  Vendor: {
    screen: SelectVendor,
  },
  MyProfile: {
    screen: MyProfileScreen,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
  },
  ContactUs: {
    screen: ContactUsScreen,
  },
},
  {
    contentOptions: {
      style: {
        backgroundColor: 'white',
        flex: 1,
      }
    },
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    },
    contentComponent: DarwerMenu,
  },
);

const TabNavigator = createBottomTabNavigator({
  tab1: {
    screen: ReportsScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "REPORTS",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab1") {
          icon = focused ? require('../assets/order_blue.png') :
            require('../assets/orders.png')
        }
        

        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },
  tab2: {
    screen: SelectVendor,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "VENDOR",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab2") {
          icon = focused ? require('../assets/vendors_blues.png') : require('../assets/vendors.png')

        }
        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },
  tab3: {
    screen: ProductsScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "PRODUCTS",
      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "tab3") {
          icon = focused ? require('../assets/products.png') :
            require('../assets/products_b.png')
        }

        return <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}></Image>

      }
    })
  },
}, {
  initialRouteName: "tab2",
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.primaryColor,
    activeBackgroundColor: '#FFFF',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: '#FFF',
    showIcon: true,
    showLabel: true,
    style: { height: 60, elevation: 1, borderTopWidth: 1 },
    labelStyle: {
      fontSize: 10,
      fontWeight: "bold",
      marginBottom: 4
    }
  }
}
);

const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack,
    Drawer: DrawerNavigator,
    BottomTab: TabNavigator,
  }),
);
export default Routes;
