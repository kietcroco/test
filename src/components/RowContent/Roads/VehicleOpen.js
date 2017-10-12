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
		vehicle_open_roads_creation_time = 0,
		vehicle_roads_type = "",
		vehicle_roads_tonnage = 0,
		vehicle_roads_tonnage_unit = translate("tấn"),
		vehicle_roads_code = "",
		vehicle_open_roads_open_place = "",
        vehicle_open_roads_open_time = 0,
        vehicle_open_roads_open_time_daily = 0
	} = source;

	vehicle_open_roads_creation_time = formatTimeAgo( vehicle_open_roads_creation_time );
	vehicle_roads_tonnage = formatNumber( vehicle_roads_tonnage, locale );
	vehicle_open_roads_open_time = formatDate( vehicle_open_roads_open_time );
	vehicle_roads_type = vehicle_roads_type ? vehicle_roads_type.toLowerCase() : "";
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					{ translate("Xe") }
					{ _styles.SPACESYMBOL }
					{ vehicle_roads_type }
					{ _styles.SPACESYMBOL }
					{`"${vehicle_roads_code}"`}
					{ _styles.SPACESYMBOL }
					{ vehicle_roads_tonnage }
					{ _styles.SPACESYMBOL }
					{ vehicle_roads_tonnage_unit }
				</Text>
			}

			{
				(!!vehicle_open_roads_open_place) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Open") }
							{ _styles.SPACESYMBOL }
							{ vehicle_open_roads_open_place }
						</Text>
					</Text>
			}

			{
				(
                    !!vehicle_open_roads_open_time ||
                    vehicle_open_roads_open_time_daily == 1
                ) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>{ vehicle_open_roads_open_time ? vehicle_open_roads_open_time : ( vehicle_open_roads_open_time_daily == 1 ? translate("Thường ngày") : "" ) }</Text>
					</Text>
			}

			{
				!!vehicle_open_roads_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ vehicle_open_roads_creation_time }</Text>
			}
		</View>
	);
};

VehicleOpen.displayName = "VehicleOpen";

export default VehicleOpen;