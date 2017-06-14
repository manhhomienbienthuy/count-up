/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUpStore
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */

'use strict';

import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
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

        this.store = {
            startTime: '2013-02-18'
        };

        Dispatcher.register(action => {
            switch (action.type) {
                case Const.INIT_STORE:
                    this.store.startTime = action.value.startTime;
                    this._countUp();
                    break;
            }
        });

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

export default new CountUpStore(Dispatcher);
