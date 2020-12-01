/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUp component
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */


import React from 'react';
import styles from '../scss/app.scss';

import {ANNIVERSARIES} from '../constants/AnniversariesConstants';

export default class Links extends React.Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(window.location.search);
        this.startTime = params.get('date');
    }
    render () {
        return Object.keys(ANNIVERSARIES).map(key => (
            <p key={key} className={styles['small-text']}>
                Click <a href={`?date=${encodeURIComponent(key)}`}>here</a> for {ANNIVERSARIES[key]}.
            </p>
        ));
    }
}
