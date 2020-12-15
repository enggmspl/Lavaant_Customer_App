import React from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, TextInput } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: { valid: false }

    };
  }
  render() {
    const { onSubmit, submitted, error } = this.props;
    return (
      <View>
        <View>
          <CreditCardInput validColor={"white"}
            inputContainerStyle={{ borderBottomColor: "white", borderBottomWidth: 1 }}
            labelStyle={{ color: "white" }}
            cardFontFamily={"bold"} invalidColor={"red"} placeholderColor={"white"} requiresName onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <TextInput placeholder={"Enter the  Email"} placeholderTextColor={"white"} style={{ width: "80%", borderBottomColor: "white", borderBottomWidth: 1, alignSelf: "center" }}>

        </TextInput>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => onSubmit(this.state.cardData)}>
            <View style={{ width: "90%", alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#199bf1", height: 40, alignSelf: "center", marginTop: "15%" }}>
              <Text style={{ fontWeight: "bold", color: "white", textAlign: "center", fontSize: 22 }}>Submit</Text>
            </View>
          </TouchableOpacity>
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});