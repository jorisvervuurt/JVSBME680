#!/usr/bin/env python

#
# jvsbme680.py
# JVSBME680
#
# Created by Joris Vervuurt on 01-11-2017.
# Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
#

import argparse
import sys
import json
from time import sleep

import bme680

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument('--i2c_address',
                        type=lambda x: int(x, 0),
                        default=0x76,
                        help='The I2C address of the BME680 (defaults to 0x76).')
args = arg_parser.parse_args()

sensor = bme680.BME680(args.i2c_address)

def emit_event(component, event, data=None):
    sleep(0.1) # this is to make sure that a single JSON object is output at the same time.
    sys.stdout.write(json.dumps({
        'component': component,
        'event': event,
        'data': data
    }))
    sys.stdout.flush()

while True:
    data = json.loads(raw_input())
    component = data['component']
    command = data['command']
    parameters = data['parameters']

    if component == 'BME680':
        if command == 'setFilterSize':
            sensor.set_filter(parameters['filterSize'])
            emit_event(component, command + 'Response')
        elif command == 'read':
            while True:
                if sensor.get_sensor_data():
                    if (not parameters['requireHeatStable']) or sensor.data.heat_stable:
                        emit_event(component, command + 'Response', {
                            'gasResistance': sensor.data.gas_resistance,
                            'humidity': sensor.data.humidity,
                            'pressure': sensor.data.pressure,
                            'temperature': sensor.data.temperature
                        })
                        
                        break
        elif command == 'reset':
            sensor.soft_reset()
            emit_event(component, command + 'Response')
        elif command == 'kill':
            if parameters['performReset']:
                sensor.soft_reset()
            
            emit_event(component, command + 'Response')
            sys.exit()
    elif component == 'GasSensor':
        if command == 'enable':
            sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)
            emit_event(component, command + 'Response')
        elif command == 'disable':
            sensor.set_gas_status(bme680.DISABLE_GAS_MEAS)
            emit_event(component, command + 'Response')
        elif command == 'setHeaterTemperature':
            sensor.set_gas_heater_temperature(parameters['heaterTemperature'])
            emit_event(component, command + 'Response')
        elif command == 'setHeaterDuration':
            sensor.set_gas_heater_duration(parameters['heaterDuration'])
            emit_event(component, command + 'Response')
    elif component == 'HumiditySensor':
        if command == 'setOversamplingRate':
            sensor.set_humidity_oversample(parameters['oversamplingRate'])
            emit_event(component, command + 'Response')
    elif component == 'PressureSensor':
        if command == 'setOversamplingRate':
            sensor.set_pressure_oversample(parameters['oversamplingRate'])
            emit_event(component, command + 'Response')
    elif component == 'TemperatureSensor':
        if command == 'setOversamplingRate':
            sensor.set_temperature_oversample(parameters['oversamplingRate'])
            emit_event(component, command + 'Response')
