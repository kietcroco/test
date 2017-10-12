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

const locale = "vi";

const VehicleHollow = ( props ) => {

	const { style, source = {} } = props;

	let {
		vehicle_hollow_rivers_creation_time = 0,
		vehicle_rivers_type = "",
		vehicle_rivers_tonnage = 0,
		vehicle_rivers_tonnage_unit = translate("tấn"),
		vehicle_rivers_code = "",
		vehicle_hollow_rivers_open_place = "",
		vehicle_hollow_rivers_want_discharge_place = "",
		vehicle_hollow_rivers_open_time = 0,
	} = source;

	vehicle_hollow_rivers_creation_time = formatTimeAgo( vehicle_hollow_rivers_creation_time );
	vehicle_rivers_tonnage = formatNumber( vehicle_rivers_tonnage, locale );
	vehicle_hollow_rivers_open_time = formatDate( vehicle_hollow_rivers_open_time );
	vehicle_rivers_type = vehicle_rivers_type ? vehicle_rivers_type.toLowerCase() : "";
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					{ translate("Sà lan") } 
					{ _styles.SPACESYMBOL }
					{ vehicle_rivers_type } 
					{ _styles.SPACESYMBOL }
					{`"${vehicle_rivers_code}"`} 
					{ _styles.SPACESYMBOL }
					{ vehicle_rivers_tonnage } 
					{ _styles.SPACESYMBOL }
					{ vehicle_rivers_tonnage_unit }
				</Text>
			}

			{
				(
					!!vehicle_hollow_rivers_open_place || 
					!!vehicle_hollow_rivers_want_discharge_place
				) &&
					<Text style={ _styles.textRow }>
						{
							(
								vehicle_hollow_rivers_open_place && 
								vehicle_hollow_rivers_want_discharge_place
							 ) ?
								<IzifixIcon name='route' style={_styles.icon} />
								: <MaterialIcons name='place' style={_styles.icon} />
						}
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ vehicle_hollow_rivers_open_place }
							{ !!vehicle_hollow_rivers_want_discharge_place && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!vehicle_hollow_rivers_open_place && 
								!!vehicle_hollow_rivers_want_discharge_place
							 ) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!vehicle_hollow_rivers_open_place && _styles.TABSYMBOL }
							{ vehicle_hollow_rivers_want_discharge_place }
						</Text>
					</Text>
			}

			{
				!!vehicle_hollow_rivers_open_time &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Dự kiến xuất phát") }:
							{ _styles.SPACESYMBOL }
							{ vehicle_hollow_rivers_open_time }
						</Text>
					</Text>
			}

			{
				!!vehicle_hollow_rivers_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ vehicle_hollow_rivers_creation_time }</Text>
			}
		</View>
	);
};

VehicleHollow.displayName = "VehicleHollow";

export default VehicleHollow;