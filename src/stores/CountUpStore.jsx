/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUpStore
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */


import {EventEmitter} from 'events';
import moment from 'moment';
import 'moment-precise-range-plugin';

import {CountUpConstants as Const} from '../constants/CountUpConstants';

class CountUpStore extends EventEmitter {
    constructor() {
        super();

        this.UPDATABLE_ATTRS = [
            'years',
            'months',
            'days',
            'hours',
            'minutes',
            'seconds'
        ];

        const params = new URLSearchParams(window.location.search);
        let startTime = params.get('date');
        if (!startTime) {
            startTime = '2013-02-18T02:00:00+0900';
        }

        this.store = {
            startTime: startTime
        };

        this._countUp();
        setInterval(this._countUp.bind(this), 1000);
    }

    get all() {
        return this.store;
    }

    addListener(callback) {
        this.on(Const.CHANGE_EVENT, callback);
    }

    _emitChange() {
        this.emit(Const.CHANGE_EVENT);
    }


    _updateStore() {
        const countDiff = moment.preciseDiff(
            moment(this.store.startTime), moment(), true
        );
        this.UPDATABLE_ATTRS.forEach((propName) => {
            this.store[propName] = countDiff[propName];
            this.store[propName] = ('0' + this.store[propName]).slice(-2);
        });
        this.store.total = moment().diff(moment(this.store.startTime), 'days');
    }

    _countUp() {
        this._updateStore();
        this._emitChange();
    }
}

export default new CountUpStore();
