// Enable strict mode.
'use strict';

// Load the JVSBME680 module.
const { BME680 } = require('../index');

// Initialize the BME680 object.
const bme680 = new BME680();

/**
 * Measures the gas resistance (Ohms), humidity (%RH), pressure (hPa) and temperature (degrees C).
 * The measurement is performed simultaneously and then logged to the console.
 * 
 * @async
 */
async function measureAll() {
    try {
        const { gasResistance, humidity, pressure, temperature } = await bme680.read();
        console.log(`Gas resistance (Ohms): ${gasResistance}`);
        console.log(`Humidity (%RH): ${humidity}`);
        console.log(`Pressure (hPa): ${pressure}`);
        console.log(`Temperature (degrees C): ${temperature}`);
    } catch(err) {
        console.error(`Failed to read data: ${err}`);
    }
}

// Measure the gas resistance, humidity, and temperature.
measureAll();
