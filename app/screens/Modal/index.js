import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,

} from "react-native";
import Modal from "react-native-modal";
export default class ReportsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    handleBackDropPress = () => {
        this.props.onBackDropPress?.();
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <Modal
                isVisible={this.props.showModal}
                onBackdropPress={this.handleBackDropPress}>
                <View style={{ backgroundColor: '#fff', height: '30%', width: '80%', alignSelf: 'center', borderRadius: 10 }}>

                </View>
            </Modal>
        );
    }
}