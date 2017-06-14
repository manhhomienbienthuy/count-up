/**
 * --------------------------------------------------------------------------
 * Aprigi: CountUp action
 * This file is distributed under the same license as the count-up package.
 * --------------------------------------------------------------------------
 */

'use strict';

import Dispatcher from '../dispatcher/Dispatcher';

import {CountUpConstants as Const} from '../constants/CountUpConstants';

export const CountUpAction = {
    initStore(value) {
        Dispatcher.dispatch({
            type: Const.INIT_STORE,
            value: value
        });
    }
};
