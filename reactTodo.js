import React from 'react';

import {
  Component,
  Navigator,
  BackAndroid,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

const dismissKeyboard = require('dismissKeyboard');

class ReactTodo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = store.getState();
        store.subscribe(() => {
            // Below comment is used to remove the lint warning.
            // Do this only when you are sure that you are calling set state using redux store.
            this.setState(store.getState()); // eslint-disable-line react/no-set-state
        });
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

    onCancel() {
        console.log('onCancel pressed');
        // TODO :Same code repeated in onAdd function, is it better to create a common function and move this code there?
        dismissKeyboard();
        this.nav.pop();
    }

    onAdd(task) {
        console.log('Task Got added ', task);
        dismissKeyboard();
        this.nav.pop();
        // this.state.todos.push({ task });
        // this.setState({ todos: this.state.todos });
        store.dispatch({
            type: 'ADD_TODO',
            task,
        });
    }

    onDone(todo) {
        console.log('Todo completed ', todo.task);
        store.dispatch({
            type: 'DONE_TODO',
            todo,
        });
    }

    onToggle() {
        store.dispatch({
            type: 'TOGGLE_STATE',
        });
    }

    renderScene(route, navigator) {
        switch (route.name) {
        case 'taskform':
            return (
                <TaskForm
                    onAdd={this.onAdd.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                />
            );
        default:
            return (
                <TaskList
                    filter={this.state.filter}
                    onAddStarted={this.onAddStarted.bind(this)}
                    onDone={this.onDone.bind(this)}
                    onToggle={this.onToggle.bind(this)}
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
                initialRoute={{ name: 'tasklist', index: 0 }}
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
