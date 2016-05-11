import React from 'react';

import {
  Component,
  Navigator,
  Text,
  BackAndroid,
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

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backButtonEventListener.bind(this));
    }

    backButtonEventListener() {
        const noOfRoutes = this.nav.getCurrentRoutes().length;
        let status;
        if (noOfRoutes > 1) {
            this.nav.pop();
            status = true;
        } else {
            status = false;
        }
        return status;
    }

    onAddStarted() {
        this.nav.push({
            name: 'taskform',
        });
    }

    renderScene(route, navigator) {
        switch (route.name) {
        case 'taskform':
            return <Text>Add comes from here!</Text>;
        default:
            return (
                <TaskList
                    onAddStarted={this.onAddStarted.bind(this)}
                    todos={this.state.todos}
                />
            );
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                initialRoute={{ name: 'TaskList', index: 0 }}
                ref={((nav) => {
                    this.nav = nav;
                })}
                renderScene={this.renderScene.bind(this)}
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
