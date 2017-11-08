<a name="GasSensor"></a>

## GasSensor
`GasSensor` class.  
An instance of this class can be accessed via `bme680.gasSensor`.

**Kind**: global class  

* [GasSensor](#GasSensor)
    * [new GasSensor(bme680)](#new_GasSensor)
    * _instance_
        * [.enable()](#GasSensor+enable) ⇒ <code>Promise</code>
        * [.disable()](#GasSensor+disable) ⇒ <code>Promise</code>
        * [.setHeaterTemperature(heaterTemperature)](#GasSensor+setHeaterTemperature) ⇒ <code>Promise</code>
        * [.setHeaterDuration(heaterDuration)](#GasSensor+setHeaterDuration) ⇒ <code>Promise</code>
        * [.read()](#GasSensor+read) ⇒ <code>Promise</code>

<a name="new_GasSensor"></a>

### new GasSensor(bme680)
Creates an instance of `GasSensor`.

**Kind**: constructor

| Param | Type | Description |
| --- | --- | --- |
| bme680 | <code>BME680</code> | An instance of `BME680`. |

<a name="GasSensor+enable"></a>

### gasSensor.enable() ⇒ <code>Promise</code>
Enables the gas sensor.

**Kind**: instance method of [<code>GasSensor</code>](#GasSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the gas sensor has been enabled successfully.  
<a name="GasSensor+disable"></a>

### gasSensor.disable() ⇒ <code>Promise</code>
Disables the gas sensor.

**Kind**: instance method of [<code>GasSensor</code>](#GasSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the gas sensor has been disabled successfully.  
<a name="GasSensor+setHeaterTemperature"></a>

### gasSensor.setHeaterTemperature(heaterTemperature) ⇒ <code>Promise</code>
Sets the heater temperature.

**Kind**: instance method of [<code>GasSensor</code>](#GasSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the heater temperature has been set successfully.  

| Param | Type | Description |
| --- | --- | --- |
| heaterTemperature | <code>number</code> | The heater temperature (between 200 and 400 degrees Celsius). |

<a name="GasSensor+setHeaterDuration"></a>

### gasSensor.setHeaterDuration(heaterDuration) ⇒ <code>Promise</code>
Sets the heater duration.

**Kind**: instance method of [<code>GasSensor</code>](#GasSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the heater duration has been set successfully.  

| Param | Type | Description |
| --- | --- | --- |
| heaterDuration | <code>number</code> | The heater duration (between 1 and 4032 milliseconds). |

<a name="GasSensor+read"></a>

### gasSensor.read() ⇒ <code>Promise</code>
Reads the sensor value.

**Kind**: instance method of [<code>GasSensor</code>](#GasSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved with the gas resistance (Ohms).
