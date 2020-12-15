import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
          <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "white", textDecorationLine: "underline", marginTop: "5%", marginBottom: "5%" }}>
            Enter Card Detail
        </Text>


         
        </ScrollView>
        <KeyboardSpacer
          onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0) }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    color: "white",
    fontFamily: "bold"
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});