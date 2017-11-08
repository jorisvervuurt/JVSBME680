// Enable strict mode.
'use strict';

// Load the JVSBME680 module.
const { BME680 } = require('../index');

// Initialize the BME680 object.
const bme680 = new BME680();

/**
 * Measures the gas resistance (Ohms) and logs it to the console.
 * 
 * @async
 */
async function measureGasResistance() {
    try {
        const gasResistance = await bme680.gasSensor.read();
        console.log(`Gas resistance (Ohms): ${gasResistance}`);
    } catch(err) {
        console.error(`Failed to measure gas resistance: ${err}`);
    }
}

// Measure the gas resistance.
measureGasResistance();

/**
 * Measures the humidity (%RH) and logs it to the console.
 * 
 * @async
 */
async function measureHumidity() {
    try {
        const humidity = await bme680.humiditySensor.read();
        console.log(`Humidity (%RH): ${humidity}`);
    } catch(err) {
        console.error(`Failed to measure humidity: ${err}`);
    }
}

// Measure the humidity.
measureHumidity();

/**
 * Measures the pressure (hPa) and logs it to the console.
 * 
 * @async
 */
async function measurePressure() {
    try {
        const pressure = await bme680.pressureSensor.read();
        console.log(`Pressure (hPa): ${pressure}`);
    } catch(err) {
        console.error(`Failed to measure pressure: ${err}`);
    }
}

// Measure the pressure.
measurePressure();

/**
 * Measures the temperature (degrees C) and logs it to the console.
 * 
 * @async
 */
async function measureTemperature() {
    try {
        const temperature = await bme680.temperatureSensor.read();
        console.log(`Temperature (degrees C): ${temperature}`);
    } catch(err) {
        console.error(`Failed to measure temperature: ${err}`);
    }
}

// Measure the temperature.
measureTemperature();
