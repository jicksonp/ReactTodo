import React from 'react';
import {
  Component,
  Text,
} from 'react-native';

class Root extends Component {
  render() {
      return (
        <Text>Hello world Again!</Text>
      );
  }
}

function setup() {
    return Root;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
