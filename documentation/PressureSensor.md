<a name="PressureSensor"></a>

## PressureSensor
`PressureSensor` class.  
An instance of this class can be accessed via `bme680.pressureSensor`.

**Kind**: global class  

* [PressureSensor](#PressureSensor)
    * [new PressureSensor(bme680)](#new_PressureSensor)
    * _instance_
        * [.setOversamplingRate(oversamplingRate)](#PressureSensor+setOversamplingRate) ⇒ <code>Promise</code>
        * [.read()](#PressureSensor+read) ⇒ <code>Promise</code>

<a name="new_PressureSensor"></a>

### new PressureSensor(bme680)
Creates an instance of `PressureSensor`.

**Kind**: constructor

| Param | Type | Description |
| --- | --- | --- |
| bme680 | <code>BME680</code> | An instance of `BME680`. |

<a name="PressureSensor+setOversamplingRate"></a>

### pressureSensor.setOversamplingRate(oversamplingRate) ⇒ <code>Promise</code>
Sets the oversampling rate (see `Constants.OversamplingRate` for valid values).

**Kind**: instance method of [<code>PressureSensor</code>](#PressureSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the oversampling rate has been set successfully.  

| Param | Type | Description |
| --- | --- | --- |
| oversamplingRate | <code>number</code> | The oversampling rate. |

<a name="PressureSensor+read"></a>

### pressureSensor.read() ⇒ <code>Promise</code>
Reads the sensor value.

**Kind**: instance method of [<code>PressureSensor</code>](#PressureSensor)  
**Returns**: <code>Promise</code> - A promise that is resolved with the pressure (hPa).
