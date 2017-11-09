#!/usr/bin/env python

#
# jvsbme680_development.py
# JVSBME680
#
# Created by Joris Vervuurt on 01-11-2017.
# Copyright (c) 2017 Joris Vervuurt Software. All rights reserved.
#

import argparse
import sys
import json
from time import sleep

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument('--i2c_address',
                        type=lambda x: int(x, 0),
                        default=0x76,
                        help='The I2C address of the BME680 (defaults to 0x76).')
args = arg_parser.parse_args()

def emit_event(component, event, data=None):
    sleep(0.1) # this is to make sure that a single JSON object is output at the same time
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
            emit_event(component, command + 'Response')
        elif command == 'read':
            emit_event(component, command + 'Response', {
                'gasResistance': 0,
                'humidity': 1,
                'pressure': 2,
                'temperature': 3
            })
        elif command == 'reset':
            emit_event(component, command + 'Response')
        elif command == 'kill':
            emit_event(component, command + 'Response')
            sys.exit()
    elif component == 'GasSensor':
        if command == 'enable':
            emit_event(component, command + 'Response')
        elif command == 'disable':
            emit_event(component, command + 'Response')
        elif command == 'setHeaterTemperature':
            emit_event(component, command + 'Response')
        elif command == 'setHeaterDuration':
            emit_event(component, command + 'Response')
    elif component == 'HumiditySensor':
        if command == 'setOversamplingRate':
            emit_event(component, command + 'Response')
    elif component == 'PressureSensor':
        if command == 'setOversamplingRate':
            emit_event(component, command + 'Response')
    elif component == 'TemperatureSensor':
        if command == 'setOversamplingRate':
            emit_event(component, command + 'Response')
