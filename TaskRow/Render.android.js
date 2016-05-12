import React from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

export default function render(styles) {
    const doneAnimation = new Animated.ValueXY();

    const localStyle = StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            padding: 5,
        },
        row: {
            transform: doneAnimation.getTranslateTransform(),
        },
    });

    function animatedPress() {
        Animated.spring(doneAnimation, {
            tension: 2,
            friction: 3,
            toValue: {
                x: -500,
                y: 0,
            },
        }).start();

        setTimeout(() => {
            // TODO See if you can do this animation end event and it works well.
            this.onDonePressed();
        }, 500);
    }

    return (
        <Animated.View style={[styles.container, localStyle.row]}>
            <Text
                style={styles.label}
            >
                {this.props.todo.task}
            </Text>
            <TouchableHighlight
                onPress={animatedPress.bind(this)}
                style={localStyle.doneButton}
                underlayColor="#ddd"
            >
                <Image
                    source={require('../images/done.png')}
                />

            </TouchableHighlight>
        </Animated.View>
    );
}
