<a name="TemperatureSensor"></a>

## TemperatureSensor
`TemperatureSensor` class.  
An instance of this class can be accessed via `bme680.temperatureSensor`.

**Kind**: global class  

* [TemperatureSensor](#TemperatureSensor)
    * [new TemperatureSensor(bme680)](#new_TemperatureSensor)
    * _instance_
        * [.setOversamplingRate(oversamplingRate)](#TemperatureSensor+setOversamplingRate) ⇒ <code>Promise</code>
        * [.read()](#TemperatureSensor+read) ⇒ <code>Promise</code>

<a name="new_TemperatureSensor"></a>

### new TemperatureSensor(bme680)
Creates an instance of `TemperatureSensor`.

**Kind**: constructor

| Param | Type | Description |
| --- | --- | --- |
| bme680 | <code>BME680</code> | An instance of `BME680`. |

<a name="TemperatureSensor+setOversamplingRate"></a>

### temperatureSensor.setOversamplingRate(oversamplingRate) ⇒ <code>Promise</code>
Sets the oversampling rate (see `Constants.OversamplingRate` for valid values).

**Kind**: instance method of [<code>TemperatureSensor</code>](#TemperatureSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the oversampling rate has been set successfully.  

| Param | Type | Description |
| --- | --- | --- |
| oversamplingRate | <code>number</code> | The oversampling rate. |

<a name="TemperatureSensor+read"></a>

### temperatureSensor.read() ⇒ <code>Promise</code>
Reads the sensor value.

**Kind**: instance method of [<code>TemperatureSensor</code>](#TemperatureSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved with the temperature (degrees C).
