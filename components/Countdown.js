import React, {
    Component
} from 'react';
import {
    Text
} from 'react-native';

export default class CountDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            now: new Date()
        }
    }
    render() {
        var distance = this.props.endDate - this.state.now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return <Text>{days + "d " + hours + "h " + minutes + "m " + seconds + "s "}</Text>
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick() {
        this.setState({
            now: new Date(),
        });
    }
}
