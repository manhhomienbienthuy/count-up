/*!
 * Script for count-up
 * Description: Count-up for my April girl
 * Copyright (C) 2017-present Anh Tranngoc
 * This file is distributed under the same license as the count-up package.
 * Anh Tranngoc <naa@sfc.wide.ad.jp>, 2017.
 */

require("./scss/app.scss");
import React from 'react';
import ReactDOM from 'react-dom';

import CountUp from './components/CountUp';
import Links from './components/Links';

ReactDOM.render(
    <CountUp />,
    document.getElementById('countup')
);
ReactDOM.render(
    <Links />,
    document.getElementById('links')
);
