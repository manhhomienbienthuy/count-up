/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUp component
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */

'use strict';

import React from 'react';
import Store from '../stores/CountUpStore';

export default class CountUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = Store.all;
    }

    componentDidMount() {
        Store.addListener(() => {
            this.setState(Store.all);
        });
    }

    render () {
        return (
            <div className="countdown-container">
                <p className="small-text">
                    It is <strong>{this.state.total}</strong> days until now.
                </p>

                {' '}
                <div>
                    <span className="days">{this.state.years}</span>
                    <div className="small-text">Years</div>
                </div>

                {' '}
                <div>
                    <span className="days">{this.state.months}</span>
                    <div className="small-text">Months</div>
                </div>

                {' '}
                <div>
                    <span className="days">{this.state.days}</span>
                    <div className="small-text">Days</div>
                </div>

                {' '}
                <div>
                    <span className="hours">{this.state.hours}</span>
                    <div className="small-text">Hours</div>
                </div>

                {' '}
                <div>
                    <span className="minutes">{this.state.minutes}</span>
                    <div className="small-text">Minutes</div>
                </div>

                {' '}
                <div>
                    <span className="seconds">{this.state.seconds}</span>
                    <div className="small-text">Seconds</div>
                </div>
            </div>
        );
    }
}
