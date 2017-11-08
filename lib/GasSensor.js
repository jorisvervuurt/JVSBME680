/**
 * GasSensor.js
 * JVSBME680
 * 
 * Created by Joris Vervuurt on 01-11-2017.
 * Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
 */

// Enable strict mode.
'use strict';

/**
 * `GasSensor` class.
 * An instance of this class can be accessed via `bme680.gasSensor`.
 * 
 * @class GasSensor
 */
class GasSensor {

    /**
     * Creates an instance of `GasSensor`.
     * 
     * @param {BME680} bme680 An instance of `BME680`. 
     * @memberof GasSensor
     */
    constructor(bme680) {
        this._bme680 = bme680;

        this.enable();
        this.setHeaterTemperature(320);
        this.setHeaterDuration(150);
    }

    /**
     * Enables the gas sensor.
     * 
     * @returns {Promise} A promise that is resolved when the gas sensor has been enabled successfully.
     * @memberof GasSensor
     */
    enable() {
        return this._bme680._sendCommand('GasSensor', 'enable');
    }

    /**
     * Disables the gas sensor.
     *
     * @returns {Promise} A promise that is resolved when the gas sensor has been disabled successfully.
     * @memberof GasSensor
     */
    disable() {
        return this._bme680._sendCommand('GasSensor', 'disable');
    }

    /**
     * Sets the heater temperature.
     * 
     * @param {number} heaterTemperature The heater temperature (between 200 and 400 degrees Celsius).
     * @returns {Promise} A promise that is resolved when the heater temperature has been set successfully.
     * @memberof GasSensor
     */
    setHeaterTemperature(heaterTemperature) {
        if (isNaN(heaterTemperature) || heaterTemperature < 200 || heaterTemperature > 400) {
            throw new Error('INVALID_HEATER_TEMPERATURE: ' + heaterTemperature);
        }

        return this._bme680._sendCommand('GasSensor', 'setHeaterTemperature', {
            heaterTemperature: heaterTemperature
        });
    }

    /**
     * Sets the heater duration.
     * 
     * @param {number} heaterDuration The heater duration (between 1 and 4032 milliseconds).
     * @returns {Promise} A promise that is resolved when the heater duration has been set successfully.
     * @memberof GasSensor
     */
    setHeaterDuration(heaterDuration) {
        if (isNaN(heaterDuration) || heaterDuration < 1 || heaterDuration > 4032) {
            throw new Error('INVALID_HEATER_DURATION: ' + heaterDuration);
        }

        return this._bme680._sendCommand('GasSensor', 'setHeaterDuration', {
            heaterDuration: heaterDuration
        });
    }

    /**
     * Reads the sensor value.
     * 
     * @returns {Promise} A promise that is resolved with the gas resistance (Ohms).
     * @memberof GasSensor
     */
    read() {
        return this._bme680.read(true)
            .then((data) => data.gasResistance);
    }

}

// Export the `GasSensor` class.
module.exports = GasSensor;
