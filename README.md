# JVSBME680
> An easy-to-use Node.js module for Pimoroni's BME680 Breakout

## Features
JVSBME680 allows you to make use of (almost) all features available in Pimoroni's [Python library](https://github.com/pimoroni/bme680).

## Hardware requirements

* [Raspberry Pi](https://www.raspberrypi.org/)
* Pimoroni [BME680 Breakout](https://shop.pimoroni.com/products/bme680)

## Installation
Note: these installation instructions assume that your Raspberry Pi is running an installation of [Raspbian Stretch](https://www.raspberrypi.org/downloads/raspbian/), with both [Node.js v8.x](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Additionally, JVSBME680 requires Python 2.x or later, which should come pre-installed with Raspbian.

Need help installing Node.js and npm? I've written an extensive tutorial, which you can find [here](https://github.com/jorisvervuurt/Tutorials/blob/master/Raspberry%20Pi/Installing%20and%20updating%20Node.js%20and%20npm.md).

### Preparing for the installation
1. First of all, make sure your Raspberry Pi is up-to-date:

        sudo apt-get update && sudo apt-get dist-upgrade

2. Install Pimoroni's Python library using their super-easy installation script:

        curl https://get.pimoroni.com/bme680 | bash

3. Reboot the Raspberry Pi.

### Installing JVSBME680
1. Use `cd` to navigate to your Node.js project directory.

2. Install JVSBME680 using npm:

        npm install jvsbme680 --save

## Usage
1. Start by loading the module:

        const { BME680 } = require('jvsbme680');

2. Initialize the BME680 object:

        const bme680 = new BME680();

Note: if you'd like to use two BME680 Breakout boards simultaneously, you can simply pass the I2C address (as a `string`) to the constructor. See the [documentation of the Constants class](https://github.com/jorisvervuurt/JVSBME680/tree/master/documentation/Constants.md) for valid values. The `Constants` class is exported by the module, together with the `BME680` class.

The initialized BME680 object has a number of properties, allowing you to access each sensor of the BME680:

* `gasSensor` - an initialized `GasSensor` object for accessing the gas sensor
* `humiditySensor` - an initialized `HumiditySensor` object for accessing the humidity sensor
* `pressureSensor` - an initialized `PressureSensor` object for accessing the pressure sensor
* `temperatureSensor` - an initialized `TemperatureSensor` object for accessing the temperature sensor

Documentation for each of the above mentioned components can be found [here](https://github.com/jorisvervuurt/JVSBME680/tree/master/documentation).

Code examples that show how to use JVSBME680 can be found [here](https://github.com/jorisvervuurt/JVSBME680/tree/master/examples).

## License
MIT License

Copyright (c) 2017 Joris Vervuurt Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
