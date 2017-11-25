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
        case "RIVERS_VEHICLE_HOLLOW":
            
            Component = require('./VehicleHollow').default;
            break;
        case "RIVERS_PRODUCT_OFFER":

            Component = require('./Product').default;
            break;
        case "RIVERS_VEHICLE_OPEN":

            Component = require('./VehicleOpen').default;
            break;
        case "RIVERS_PURCHASE":

            Component = require('./Purchase').default;
            break;
        case "RIVERS_BIDDING":

            Component = require('./Bidding').default;
            break;
        case "RIVERS_ENTERPRISE":

            Component = require('./Enterprise').default;
            break;
        case "":
        default:
            Component = require('./Home').default;
            break;
    }
    return <Component {...props} ref={ props.onRef }/>
};

FilterRiver.displayName = "@FilterRiver";

export default FilterRiver;