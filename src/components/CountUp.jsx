/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUp component
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */


import React from 'react';
import Store from '../stores/CountUpStore';
import styles from '../scss/app.scss';

import {ANNIVERSARIES} from '../constants/AnniversariesConstants';

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
        const anniversary = ANNIVERSARIES[this.state.startTime] || this.state.startTime;
        return (
            <div className={styles['countdown']}>
                <p className={styles['small-text']}>
                    You are counting for {anniversary}
                </p>

                <div className={styles['countdown-container']}>
                    <p className={styles['small-text']}>
                        It is <strong>{this.state.total}</strong> days until now.
                    </p>

                    {' '}
                    <div>
                        <span className={styles['days']}>{this.state.years}</span>
                        <div className={styles['small-text']}>Years</div>
                    </div>

                    {' '}
                    <div>
                        <span className={styles['days']}>{this.state.months}</span>
                        <div className={styles['small-text']}>Months</div>
                    </div>

                    {' '}
                    <div>
                        <span className={styles['days']}>{this.state.days}</span>
                        <div className={styles['small-text']}>Days</div>
                    </div>

                    {' '}
                    <div>
                        <span className={styles['hours']}>{this.state.hours}</span>
                        <div className={styles['small-text']}>Hours</div>
                    </div>

                    {' '}
                    <div>
                        <span className={styles['minutes']}>{this.state.minutes}</span>
                        <div className={styles['small-text']}>Minutes</div>
                    </div>

                    {' '}
                    <div>
                        <span className={styles['seconds']}>{this.state.seconds}</span>
                        <div className={styles['small-text']}>Seconds</div>
                    </div>
                </div>
            </div>
        );
    }
}
