import React, {
    Component
} from 'react';
import {
    Text
} from 'react-native';

export default class CountDown extends Component {

    constructor(props) {
        // Required
        props.endDate;

        // Optional
        props.startDate = props.startDate ? props.startDate : new Date();
        props.callback = props.callback ? props.callback : () => {};

        super(props);
        this.realStartDate = new Date();  // real time
        this.state = {
            now: new Date()  // real time
        }
    }

    durationLeft() {
        var elapsedTime = this.state.now - this.realStartDate;
        var totalTime = this.props.endDate - this.props.startDate;
        var distance = totalTime - elapsedTime;
        return distance;
    }

    // totalDuration() {
    //     return this.props.endDate - this.props.startDate;
    // }

    getTime() {
        var elapsedTime = this.state.now - this.realStartDate;
        return new Date(this.props.startDate.getTime() + elapsedTime);
    }

    render() {
        var distance = this.durationLeft();

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var msg = hours + "h " + minutes + "m " + seconds + "s";
        if(days) {
            msg = days + "d " + msg;
        }

        return <Text>{msg}</Text>
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
        console.log("TICK");
        var d = new Date();
        this.setState({
            now: d,
        });
        if (this.durationLeft() <= 0) {
            this.props.callback(
                this.getTime()
            );
        }

    }
}
