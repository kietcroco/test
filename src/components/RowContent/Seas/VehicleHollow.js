"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import IzifixIcon from 'izifix-icon';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { translate } from '~/utilities/language';
import formatNumber from '../utils/formatNumber';
import formatDate from '../utils/formatDate';
import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';
import capitalize from '~/utilities/capitalize';

const VehicleHollow = ( props ) => {

	const { style, source = {} } = props;

	let {
		vehicle_hollow_seas_creation_time = 0,
		vehicle_hollow_seas_vsl_type = "",
		vehicle_hollow_seas_dwt = 0,
		vehicle_hollow_seas_dwt_unit = translate("dwt"),
		vehicle_hollow_seas_vsl_name = "TBN",
		vehicle_hollow_seas_open_place = "",
		vehicle_hollow_seas_want_discharge_place = "",
        vehicle_hollow_seas_open_time = 0,
        vehicle_hollow_seas_class = "",
        vehicle_hollow_seas_operator = ""
    } = source;

	vehicle_hollow_seas_creation_time = formatTimeAgo( vehicle_hollow_seas_creation_time );
	vehicle_hollow_seas_dwt = formatNumber( vehicle_hollow_seas_dwt );
	vehicle_hollow_seas_open_time = formatDate( vehicle_hollow_seas_open_time );
	vehicle_hollow_seas_vsl_type = vehicle_hollow_seas_vsl_type ? capitalize(vehicle_hollow_seas_vsl_type.toLowerCase()) : "";
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					{/* translate("#$seas$#Tàu")*/ } 
					{/* _styles.SPACESYMBOL*/ }
					{ vehicle_hollow_seas_vsl_type } 
					{ _styles.SPACESYMBOL }
					{`"${vehicle_hollow_seas_vsl_name}"`} 
					{ _styles.SPACESYMBOL }
					{ vehicle_hollow_seas_dwt } 
					{ _styles.SPACESYMBOL }
					{ vehicle_hollow_seas_dwt_unit }
				</Text>
            }
            
            {
                !!vehicle_hollow_seas_class &&
                    <Text style={ [_styles.textRow, _styles.text] }>
                        { translate("#$seas$#Đăng kiểm") }:
                        { _styles.SPACESYMBOL }
                        { vehicle_hollow_seas_class } 
                    </Text>
            }
                
            {
                !!vehicle_hollow_seas_operator &&
                    <Text style={ [_styles.textRow, _styles.text] }>
                        { translate("#$seas$#Quản lý tàu") }:
                        { _styles.SPACESYMBOL }
                        { vehicle_hollow_seas_operator } 
                    </Text>
			}

			{
				(
					!!vehicle_hollow_seas_open_place || 
					!!vehicle_hollow_seas_want_discharge_place
				) &&
					<Text style={ _styles.textRow }>
						{
							(
								vehicle_hollow_seas_open_place && 
								vehicle_hollow_seas_want_discharge_place
							 ) ?
								<IzifixIcon name='route' style={_styles.icon} />
								: <MaterialIcons name='place' style={_styles.icon} />
						}
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ vehicle_hollow_seas_open_place }
							{ !!vehicle_hollow_seas_want_discharge_place && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!vehicle_hollow_seas_open_place && 
								!!vehicle_hollow_seas_want_discharge_place
							 ) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!vehicle_hollow_seas_open_place && _styles.TABSYMBOL }
							{ vehicle_hollow_seas_want_discharge_place }
						</Text>
					</Text>
			}

			{
				!!vehicle_hollow_seas_open_time &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("#$seas$#Dự kiến xuất phát") }:
							{ _styles.SPACESYMBOL }
							{ vehicle_hollow_seas_open_time }
						</Text>
					</Text>
			}

			{
				!!vehicle_hollow_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ vehicle_hollow_seas_creation_time }</Text>
			}
		</View>
	);
};

VehicleHollow.displayName = "VehicleHollow";

export default VehicleHollow;