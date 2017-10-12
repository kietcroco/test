/**
 * @flow
 */
 import { AppRegistry } from 'react-native';
 import App from './src';


// bỏ qua yellow box các lỗi về debugger
console.ignoredYellowBox = ["Remote debugger", "Debugger and device times"];
AppRegistry.registerComponent('Izifix', () => App);