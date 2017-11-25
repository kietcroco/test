"use strict";
import React from 'react';
//import PropTypes from 'prop-types';
//import { View, Text } from 'react-native';

const FilterRiver = ( props ) => {

    let Component;
    const {
        navigation: {
            state: {
                params: {
                    Exchange = ""
                } = {}
            } = {}
        } = {}
    } = props;
    switch ( Exchange ) {
        case "SEAS_VEHICLE_HOLLOW":
            
            Component = require('./VehicleHollow').default;
            break;
        case "SEAS_PRODUCT_OFFER":

            Component = require('./Product').default;
            break;
        case "SEAS_VEHICLE_OPEN":

            Component = require('./VehicleOpen').default;
            break;
        case "SEAS_PURCHASE":

            Component = require('./Purchase').default;
            break;
        case "SEAS_CONTAINER":

            Component = require('./Container').default;
            break;
        case "SEAS_ENTERPRISE":

            Component = require('./Enterprise').default;
            break;
        case "":
        default:
            Component = require('./Home').default;
            break;
    }
    return <Component {...props} ref={props.onRef}/>
};

FilterRiver.displayName = "@FilterRiver";

export default FilterRiver;