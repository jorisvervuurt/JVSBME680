// Enable strict mode.
'use strict';

// Load the JVSBME680 module.
const { BME680 } = require('../index');

// Initialize the BME680 object.
const bme680 = new BME680();

/**
 * Pauses code execution.
 * 
 * @param {number} duration The duration (in milliseconds).
 * @returns {Promise} A promise that is resolved when the duration has elapsed.
 */
function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * Calculates the gas resistance baseline (Ohms).
 * 
 * @async
 * @param {number} interval The measurement interval (in milliseconds).
 * @param {number} duration The measurement duration (in milliseconds).
 * @returns {Promise} A promise that is resolved with the gas resistance baseline (Ohms).
 */
async function calculateGasResistanceBaseline(interval, duration) {
    // Create a time reference.
    const startTime = process.hrtime();
    
    // Create an empty list to which measurement results will be appended.
    let gasResistances = [];
    
    // Measure gas resistance (Ohms) as long as the duration hasn't elapsed.
    while (process.hrtime(startTime)[0] < duration / 1000) {
        const [ gasResistance ] = await Promise.all([
            bme680.gasSensor.read(),
            sleep(interval)
        ]);
        gasResistances.push(gasResistance);
    }

    // We'll use a maximum of 50 of the most recent measurements.
    gasResistances = gasResistances.slice(-50);

    // Calculate the sum and average of the measurements.
    const sum = gasResistances.reduce((sum, value) => sum + value),
        average = sum / gasResistances.length;
    
    // Return the calculated baseline (the average).
    return average;
}

/**
 * Measures the air quality (%) and logs it to the console.
 *
 * @async
 */
async function measureAirQuality(interval) {
    try {
        // Calculate the gas resistance baseline, measuring with an interval of one second for a duration of 5 minutes.
        const gasResistanceBaseline = await calculateGasResistanceBaseline(1000, 300000);

        // Define the humidity baseline nd humidity weighting.
        const humidityBaseline = 40, // 40%RH is an optimal indoor humidity
            humidityWeighting = 25; // use a balance between humidity and gas resistance of 25%:75%

        // Indefinitely calculate the air quality at the set interval.
        while (true) {
            // Measure the gas resistance and calculate the offset.
            const gasResistance = await bme680.gasSensor.read(),
                gasResistanceOffset = gasResistanceBaseline - gasResistance;

            // Calculate the gas resistance score as the distance from the gas resistance baseline.
            let gasResistanceScore = 0;
            if (gasResistanceOffset > 0) {
                gasResistanceScore = (gasResistance / gasResistanceBaseline) * (100 - humidityWeighting);
            } else {
                gasResistanceScore = 100 - humidityWeighting;
            }

            // Measure the humidity and calculate the offset.
            const humidity = await bme680.humiditySensor.read(),
                humidityOffset = humidity - humidityBaseline;
            
            // Calculate the humidity score as the distance from the humidity baseline.
            let humidityScore = 0;
            if (humidityOffset > 0) {
                humidityScore = (100 - humidityBaseline - humidityOffset) / (100 - humidityBaseline) * humidityWeighting;
            } else {
                humidityScore = (humidityBaseline + humidityOffset) / humidityBaseline * humidityWeighting;
            }

            // Calculate the air quality.
            const airQuality = gasResistanceScore + humidityScore;
            console.log(`Air quality (%): ${airQuality}`);

            // Wait for the specified interval to elapse, before recalculating the air quality.
            await sleep(interval);
        }
    } catch(err) {
        console.error(`\nFailed to calculate air quality: ${err}`);
    }
}

// Measure the air quality with an interval of one second.
measureAirQuality(1000);
