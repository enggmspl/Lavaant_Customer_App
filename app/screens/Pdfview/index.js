import React, { Component } from 'react';
import {
    View
} from 'react-native';
import {
    Container
} from 'native-base';
import styles from './styles';
import MainHeader from '../../Components/MainHeader'
import Pdf from 'react-native-pdf';


export default class PdfViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: this.props.navigation.state.params.pdf,
        }
    }

    render() {
        console.log('pdfffffff........', this.state.pdf);
        const source = { uri: encodeURI(this.state.pdf), cache: true };
        console.log('pdfffffff encoded :: ........', source)
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <View style={styles.container}>
                    <Pdf
                        source={source}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        style={styles.pdf} />
                </View>
            </Container>
        );
    }
}

