import React from 'react';

import {
  Component,
  ToastAndroid,
} from 'react-native';

import TaskList from './TaskList';

class ReactTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                {
                    task: 'Learn React Native',
                },
                {
                    task: 'Learn Redux',
                },
            ],
        };
    }

    onAddStarted() {
        console.log('On Add Started');
        ToastAndroid.show('On Add pressed', ToastAndroid.SHORT);
    }

    render() {
        return (
            <TaskList
                onAddStarted={this.onAddStarted.bind(this)}
                todos={this.state.todos}
            />
        );
    }
}

function setup() {
    return ReactTodo;
}

global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};

module.exports = setup;
