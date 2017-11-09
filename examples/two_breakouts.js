// Enable strict mode.
'use strict';

// Load the JVSBME680 module.
const { Constants, BME680 } = require('../index');

// Initialize the BME680 objects.
const primaryBme680 = new BME680(Constants.I2CAddress.I2CA_PRIMARY), // BME680 at I2C address 0x76
    secondaryBme680 = new BME680(Constants.I2CAddress.I2CA_SECONDARY); // BME680 at I2C address 0x77

/**
 * Measures the gas resistance (Ohms), humidity (%RH), pressure (hPa) and temperature (degrees C).
 * The measurement is performed simultaneously and then logged to the console.
 * 
 * @async
 * @param {BME680} bme680 An instance of `BME680`. 
 */
async function measureAll(bme680) {
    try {
        const { gasResistance, humidity, pressure, temperature } = await bme680.read();
        console.log(`\nBME680 at I2C address ${bme680.i2cAddress} - Gas resistance (Ohms): ${gasResistance}`);
        console.log(`BME680 at I2C address ${bme680.i2cAddress} - Humidity (%RH): ${humidity}`);
        console.log(`BME680 at I2C address ${bme680.i2cAddress} - Pressure (hPa): ${pressure}`);
        console.log(`BME680 at I2C address ${bme680.i2cAddress} - Temperature (degrees C): ${temperature}`);
    } catch(err) {
        console.error(`\nBME680 at I2C address ${bme680.i2cAddress} - Failed to read data: ${err}`);
    }
}

// Measure the gas resistance, humidity, and temperature of the BME680 at I2C address 0x76.
measureAll(primaryBme680);

// Wait a few seconds before measuring the gas resistance, humidity, and temperature of the BME680 at I2C address 0x77.
setTimeout(() => measureAll(secondaryBme680), 2000);
