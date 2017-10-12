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
import capitalize from '~/utilities/capitalize';

const VehicleOpen = ( props ) => {

	const { style, source = {} } = props;

	let {
		vehicle_open_seas_creation_time = 0,
		vehicle_open_seas_vsl_type = "",
		vehicle_open_seas_dwt = 0,
		vehicle_open_seas_dwt_unit = translate("dwt"),
		vehicle_open_seas_vsl_name = "TBN",
		vehicle_open_seas_open_place = "",
        vehicle_open_seas_open_time_from = 0,
        vehicle_open_seas_class = "",
        vehicle_open_seas_operator = ""
	} = source;

	vehicle_open_seas_creation_time = formatTimeAgo( vehicle_open_seas_creation_time );
	vehicle_open_seas_dwt = formatNumber( vehicle_open_seas_dwt );
	vehicle_open_seas_open_time_from = formatDate( vehicle_open_seas_open_time_from );
	vehicle_open_seas_vsl_type = vehicle_open_seas_vsl_type ? capitalize(vehicle_open_seas_vsl_type.toLowerCase()) : "";
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					{ /*translate("#$seas$#Tàu")*/ }
					{ /*_styles.SPACESYMBOL*/ }
					{ vehicle_open_seas_vsl_type }
					{ _styles.SPACESYMBOL }
					{`"${vehicle_open_seas_vsl_name}"`}
					{ _styles.SPACESYMBOL }
					{ vehicle_open_seas_dwt }
					{ _styles.SPACESYMBOL }
					{ vehicle_open_seas_dwt_unit }
				</Text>
            }
            
            {
                !!vehicle_open_seas_class &&
                    <Text style={ [_styles.textRow, _styles.text] }>
                        { translate("#$seas$#Đăng kiểm") }:
                        { _styles.SPACESYMBOL }
                        { vehicle_open_seas_class } 
                    </Text>
            }
                
            {
                !!vehicle_open_seas_operator &&
                    <Text style={ [_styles.textRow, _styles.text] }>
                        { translate("#$seas$#Quản lý tàu") }:
                        { _styles.SPACESYMBOL }
                        { vehicle_open_seas_operator } 
                    </Text>
			}

			{
				(!!vehicle_open_seas_open_place) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Open") }
							{ _styles.SPACESYMBOL }
							{ vehicle_open_seas_open_place }
						</Text>
					</Text>
			}

			{
				!!vehicle_open_seas_open_time_from &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>{ vehicle_open_seas_open_time_from }</Text>
					</Text>
			}

			{
				!!vehicle_open_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ vehicle_open_seas_creation_time }</Text>
			}
		</View>
	);
};

VehicleOpen.displayName = "VehicleOpen";

export default VehicleOpen;