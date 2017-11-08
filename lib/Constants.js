/**
 * Constants.js
 * JVSBME680
 * 
 * Created by Joris Vervuurt on 01-11-2017.
 * Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
 */

// Enable strict mode.
'use strict';

/**
 * `Constants` class.
 * 
 * @class Constants
 */
class Constants {
    
    /**
     * I2C addresses.
     * 
     * @readonly
     * @static
     * @memberof Constants
     */
    static get I2CAddress() {
        return {
            I2CA_PRIMARY: '0x76',
            I2CA_SECONDARY: '0x77',
            hasValue: (val) => {
                return Constants._hasValue(Constants.I2CAddress, val);
            }
        };
    }

    /**
     * Oversampling rates.
     * 
     * @readonly
     * @static
     * @memberof Constants
     */
    static get OversamplingRate() {
        return {
            OSR_0X: 0,
            OSR_1X: 1,
            OSR_2X: 2,
            OSR_4X: 3,
            OSR_8X: 4,
            OSR_16X: 5,
            hasValue: (val) => {
                return Constants._hasValue(Constants.OversamplingRate, val);
            }
        };
    }

    /**
     * IIR filter sizes.
     * 
     * @readonly
     * @static
     * @memberof Constants
     */
    static get FilterSize() {
        return {
            FS_0: 0,
            FS_1: 1,
            FS_3: 2,
            FS_7: 3,
            FS_15: 4,
            FS_31: 5,
            FS_63: 6,
            FS_127: 7,
            hasValue: (val) => {
                return Constants._hasValue(Constants.FilterSize, val);
            }
        };
    }

    /**
     * Checks if an object contains a value.
     * 
     * @static
     * @private
     * @param {object} obj The object.
     * @param {any} val The value.
     * @returns {boolean} A value that indicates whether the value exists in the object.
     * @memberof Constants
     */
    static _hasValue(obj, val) {
        return Object.values(obj).includes(val);
    }
    
}

// Export the `Constants` class.
module.exports = Constants;
