"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { translate } from '~/utilities/language';
import formatNumber from '../utils/formatNumber';
import formatDate from '../utils/formatDate';
import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';

const locale = "vi";

const VehicleOpen = ( props ) => {

	const { style, source = {} } = props;

	let {
		vehicle_open_rivers_creation_time = 0,
		vehicle_rivers_type = "",
		vehicle_rivers_tonnage = 0,
		vehicle_rivers_tonnage_unit = translate("tấn"),
		vehicle_rivers_code = "",
		vehicle_open_rivers_open_place = "",
		vehicle_open_rivers_open_time = 0,
	} = source;

	vehicle_open_rivers_creation_time = formatTimeAgo( vehicle_open_rivers_creation_time );
	vehicle_rivers_tonnage = formatNumber( vehicle_rivers_tonnage, locale );
	vehicle_open_rivers_open_time = formatDate( vehicle_open_rivers_open_time );
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
				(!!vehicle_open_rivers_open_place) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Open") }
							{ _styles.SPACESYMBOL }
							{ vehicle_open_rivers_open_place }
						</Text>
					</Text>
			}

			{
				!!vehicle_open_rivers_open_time &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>{ vehicle_open_rivers_open_time }</Text>
					</Text>
			}

			{
				!!vehicle_open_rivers_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ vehicle_open_rivers_creation_time }</Text>
			}
		</View>
	);
};

VehicleOpen.displayName = "VehicleOpen";

export default VehicleOpen;