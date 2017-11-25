"use strict";
import React from 'react';
//import PropTypes from 'prop-types';
//import { View, Text } from 'react-native';

const FilterRoad = ( props ) => {

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
        case "ROADS_VEHICLE_HOLLOW":
            
            Component = require('./VehicleHollow').default;
            break;
        case "ROADS_PRODUCT_OFFER":

            Component = require('./Product').default;
            break;
        case "ROADS_VEHICLE_OPEN":

            Component = require('./VehicleOpen').default;
            break;
        case "ROADS_PURCHASE":

            Component = require('./Purchase').default;
            break;
        case "ROADS_CONTAINER":

            Component = require('./Container').default;
            break;
        case "ROADS_ENTERPRISE":

            Component = require('./Enterprise').default;
            break;
        case "":
        default:
            Component = require('./Home').default;
            break;
    }
    return <Component {...props} ref={props.onRef}/>
};

FilterRoad.displayName = "@FilterRoad";

export default FilterRoad;