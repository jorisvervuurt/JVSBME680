/**
 * PressureSensor.js
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
 * `PressureSensor` class.
 *  An instance of this class can be accessed via `bme680.pressureSensor`.
 * 
 * @class PressureSensor
 */
class PressureSensor {
    
    /**
     * Creates an instance of `PressureSensor`.
     * 
     * @param {BME680} bme680 An instance of `BME680`. 
     * @memberof PressureSensor
     */
    constructor(bme680) {
        this._bme680 = bme680;

        this.setOversamplingRate(Constants.OversamplingRate.OSR_4X);
    }
    
    /**
     * Sets the oversampling rate (see `Constants.OversamplingRate` for valid values).
     * 
     * @param {number} oversamplingRate The oversampling rate.
     * @returns {Promise} A promise that is resolved when the oversampling rate has been set successfully.
     * @memberof PressureSensor
     */
    setOversamplingRate(oversamplingRate) {
        if (!Constants.OversamplingRate.hasValue(oversamplingRate)) {
            throw new Error('INVALID_OVERSAMPLING_RATE: ' + oversamplingRate);
        }

        return this._bme680._sendCommand('PressureSensor', 'setOversamplingRate', {
            oversamplingRate: oversamplingRate
        });
    }

    /**
     * Reads the sensor value.
     * 
     * @returns {Promise} A promise that is resolved with the pressure (hPa).
     * @memberof PressureSensor
     */
    read() {
        return this._bme680.read(false)
            .then((data) => data.pressure);
    }

}

// Export the `PressureSensor` class.
module.exports = PressureSensor;
