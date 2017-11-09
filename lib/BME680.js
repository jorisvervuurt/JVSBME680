/**
 * BME680.js
 * JVSBME680
 * 
 * Created by Joris Vervuurt on 01-11-2017.
 * Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
 */

// Enable strict mode.
'use strict';

// Load dependencies.
const { spawn } = require('child_process'),
    path = require('path'),
    EventEmitter = require('events'),
    Constants = require('./Constants'),
    Command = require('./Command'),
    GasSensor = require('./GasSensor'),      
    HumiditySensor = require('./HumiditySensor'),
    PressureSensor = require('./PressureSensor'),
    TemperatureSensor = require('./TemperatureSensor');

/**
 * `BME680` class.
 * 
 * @class BME680
 * @extends {EventEmitter}
 */
class BME680 extends EventEmitter {

    /**
     * Creates an instance of `BME680`.
     * 
     * @param {string} [i2cAddress='0x76'] The I2C address (see `Constants.I2CAddress` for valid values).
     * @memberof BME680
     */
    constructor(i2cAddress = Constants.I2CAddress.I2CA_PRIMARY) {
        super();

        this.setMaxListeners(Infinity); // we can safely set it to `Infinity`, as listeners are removed as soon as they are no longer needed

        if (!Constants.I2CAddress.hasValue(i2cAddress)) {
            throw new Error('INVALID_I2C_ADDRESS: ' + i2cAddress);
        }

        this._pythonProcess = null;

        this.i2cAddress = i2cAddress;
        this.gasSensor = new GasSensor(this);
        this.humiditySensor = new HumiditySensor(this);
        this.pressureSensor = new PressureSensor(this);
        this.temperatureSensor = new TemperatureSensor(this);

        this.setFilterSize(Constants.FilterSize.FS_3);
    }

    /**
     * Sets the IIR filter size (see `Constants.FilterSize` for valid values).
     * 
     * @param {number} filterSize The filter size.
     * @returns {Promise} A promise that is resolved when the filter size has been set successfully.
     * @memberof BME680
     */
    setFilterSize(filterSize) {
        return this._sendCommand('BME680', 'setFilterSize', {
            filterSize: filterSize
        });
    }
    
    /**
     * Reads the sensor data.
     * 
     * @param {boolean} [requireHeatStable=false] A value that indicates whether heat should be stable before reading the sensor data.
     * @returns {Promise} A promise that is resolved with an object containing the sensor data.
     * @memberof BME680
     */
    read(requireHeatStable = false) {
        return this._sendCommand('BME680', 'read', {
            requireHeatStable: requireHeatStable
        });
    }

    /**
     * Performs a soft reset.
     * 
     * @returns {Promise} A promise that is resolved when the soft reset has been performed successfully.
     * @memberof BME680
     */
    reset() {
        return this._sendCommand('BME680', 'reset');
    }

    /**
     * Kills the Python process.
     * 
     * @param {boolean} [performReset=false] A value that indicates whether a soft reset should be performed.
     * @returns {Promise} A promise that is resolved when the Python process has been killed successfully.
     * @memberof BME680
     */
    kill(performReset = false) {
        return this._sendCommand('BME680', 'kill', {
            performReset: performReset
        });
    }

    /**
     * Sends a command to the Python process.
     * 
     * @private
     * @param {string} component The component.
     * @param {string} command The command.
     * @param {object} [parameters={}] The parameters (optional).
     * @returns {Promise} A promise that is resolved with the response data (if available) when the command has finished successfully.
     * @memberof BME680
     */
    _sendCommand(component, command, parameters = {}) {
        const commandObject = new Command(component, command, parameters);

        return new Promise((resolve, reject) => {
            const responseEventName = commandObject.getResponseEventName();

            const responseListener = (data) => {
                this.removeListener('error', errorListener);
                return resolve(data);
            };
            this.once(responseEventName, responseListener);

            const errorListener = (error) => {
                this.removeListener(responseEventName, responseListener);
                return reject(error);
            };
            this.once('error', errorListener);
            
            this._spawnPythonProcess();
            if (this._pythonProcess) {        
                this._pythonProcess.stdin.write(commandObject.toJSON() + '\n');
            }
        });
    }

    /**
     * Spawns a new Python process (if none is currently running).
     * 
     * @private
     * @memberof BME680
     */
    _spawnPythonProcess() {
        if (this._pythonProcess) {
            return;
        }

        this._pythonProcess = spawn('python', [path.join(__dirname, '../bin/jvsbme680.py'), '--i2c_address', this.i2cAddress]);
        this._pythonProcess.stderr.setEncoding('utf8');
        this._pythonProcess.stdin.setDefaultEncoding('utf8');
        this._pythonProcess.stdout.setEncoding('utf8');
        
        this._pythonProcess.once('error', (error) => {
            this._cleanup();
            this.emit('error', error);
        });

        this._pythonProcess.stderr.once('data', (data) => {
            this._cleanup();
            this.emit('error', new Error(data));
        });

        this._pythonProcess.stdout.on('data', (data) => {
            const eventData = JSON.parse(data);
            this.emit(eventData.component + '.' + eventData.event, eventData.data);
        });

        this._pythonProcess.once('exit', () => {
            this._cleanup();
        });
    }

    /**
     * Cleanup after the Python process has exited.
     * 
     * @private
     * @memberof BME680
     */
    _cleanup() {
        if (this._pythonProcess) {
            this._pythonProcess.removeAllListeners();
            this._pythonProcess = null;
        }
    }
    
}

// Export the `BME680` class.
module.exports = BME680;
