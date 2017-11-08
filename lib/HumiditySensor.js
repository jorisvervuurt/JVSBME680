/**
 * HumiditySensor.js
 * JVSBME680
 * 
 * Created by Joris Vervuurt on 01-11-2017.
 * Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
 */

// Enable strict mode.
'use strict';

// Load dependencies.
const Constants = require('./Constants');

/**
 * `HumiditySensor` class.
 *  An instance of this class can be accessed via `bme680.humiditySensor`.
 * 
 * @class HumiditySensor
 */
class HumiditySensor {
    
    /**
     * Creates an instance of `HumiditySensor`.
     * 
     * @param {BME680} bme680 An instance of `BME680`. 
     * @memberof HumiditySensor
     */
    constructor(bme680) {
        this._bme680 = bme680;
        
        this.setOversamplingRate(Constants.OversamplingRate.OSR_2X);
    }

    /**
     * Sets the oversampling rate (see `Constants.OversamplingRate` for valid values).
     * 
     * @param {number} oversamplingRate The oversampling rate.
     * @returns {Promise} A promise that is resolved when the oversampling rate has been set successfully.
     * @memberof HumiditySensor
     */
    setOversamplingRate(oversamplingRate) {
        if (!Constants.OversamplingRate.hasValue(oversamplingRate)) {
            throw new Error('INVALID_OVERSAMPLING_RATE: ' + oversamplingRate);
        }

        return this._bme680._sendCommand('HumiditySensor', 'setOversamplingRate', {
            oversamplingRate: oversamplingRate
        });
    }

    /**
     * Reads the sensor value.
     * 
     * @returns {Promise} A promise that is resolved with the humidity (%RH).
     * @memberof HumiditySensor
     */
    read() {
        return this._bme680.read(false)
            .then((data) => data.humidity);
    }

}

// Export the `HumiditySensor` class.
module.exports = HumiditySensor;
