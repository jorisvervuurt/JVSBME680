/**
 * Command.js
 * JVSBME680
 * 
 * Created by Joris Vervuurt on 01-11-2017.
 * Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
 */

// Enable strict mode.
'use strict';

/**
 * `Command` class.
 * 
 * @class Command
 */
class Command {

    /**
     * Creates an instance of `Command`.
     * 
     * @param {string} component The component.
     * @param {string} command The command.
     * @param {object} [parameters={}] The parameters (optional).
     * @memberof Command
     */
    constructor(component, command, parameters = {}) {
        this.component = component;
        this.command = command;
        this.parameters = parameters;
    }
    
    /**
     * Generates the response event name for the command.
     * 
     * @returns {string} The response event name.
     * @memberof Command
     */
    getResponseEventName() {
        return this.component + '.' + this.command + 'Response';
    }

    /**
     * Generates a JSON representation of the command.
     * 
     * @returns {string} The JSON representation of the command.
     * @memberof Command
     */
    toJSON() {
        return JSON.stringify({
            component: this.component,
            command: this.command,
            parameters: this.parameters
        });
    }
    
}

// Export the `Command` class.
module.exports = Command;
