import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingImg: {
    marginTop: 100,
    justifyContent: 'space-around',
  },
  logo: {
    position: 'relative',
    bottom: 30,
    width: 250,
    height: 190,
  },
});
