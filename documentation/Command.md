<a name="Command"></a>

## Command
`Command` class.

**Kind**: global class  

* [Command](#Command)
    * [new Command(component, command, [parameters])](#new_Command)
    * _instance_
        * [.getResponseEventName()](#Command+getResponseEventName) ⇒ <code>string</code>
        * [.toJSON()](#Command+toJSON) ⇒ <code>string</code>

<a name="new_Command"></a>

### new Command(component, command, [parameters])
Creates an instance of `Command`.

**Kind**: constructor

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| component | <code>string</code> |  | The component. |
| command | <code>string</code> |  | The command. |
| [parameters] | <code>object</code> | <code>{}</code> | The parameters (optional). |

<a name="Command+getResponseEventName"></a>

### command.getResponseEventName() ⇒ <code>string</code>
Generates the response event name for the command.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>string</code> - The response event name.  
<a name="Command+toJSON"></a>

### command.toJSON() ⇒ <code>string</code>
Generates a JSON representation of the command.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>string</code> - The JSON representation of the command.  
