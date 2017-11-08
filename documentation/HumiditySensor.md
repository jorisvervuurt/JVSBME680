<a name="HumiditySensor"></a>

## HumiditySensor
`HumiditySensor` class.  
An instance of this class can be accessed via `bme680.humiditySensor`.

**Kind**: global class  

* [HumiditySensor](#HumiditySensor)
    * [new HumiditySensor(bme680)](#new_HumiditySensor)
    * _instance_
        * [.setOversamplingRate(oversamplingRate)](#HumiditySensor+setOversamplingRate) ⇒ <code>Promise</code>
        * [.read()](#HumiditySensor+read) ⇒ <code>Promise</code>

<a name="new_HumiditySensor"></a>

### new HumiditySensor(bme680)
Creates an instance of `HumiditySensor`.

**Kind**: constructor

| Param | Type | Description |
| --- | --- | --- |
| bme680 | <code>BME680</code> | An instance of `BME680`. |

<a name="HumiditySensor+setOversamplingRate"></a>

### humiditySensor.setOversamplingRate(oversamplingRate) ⇒ <code>Promise</code>
Sets the oversampling rate (see `Constants.OversamplingRate` for valid values).

**Kind**: instance method of [<code>HumiditySensor</code>](#HumiditySensor)  
**Returns**: <code>Promise</code> - A promise that is resolved when the oversampling rate has been set successfully.  

| Param | Type | Description |
| --- | --- | --- |
| oversamplingRate | <code>number</code> | The oversampling rate. |

<a name="HumiditySensor+read"></a>

### humiditySensor.read() ⇒ <code>Promise</code>
Reads the sensor value.

**Kind**: instance method of [<code>HumiditySensor</code>](#HumiditySensor)  
**Returns**: <code>Promise</code> - A promise that is resolved with the humidity (%RH).
