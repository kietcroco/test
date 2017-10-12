"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import IzifixIcon from 'izifix-icon';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import formatNumber from '../utils/formatNumber';
import formatPrice from '../utils/formatPrice';
import formatDate from '../utils/formatDate';
import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';

const locale = "vi";

const Container = ( props ) => {

	const { style, source = {} } = props;

	let {
		container_roads_load_port = "",
		container_roads_discharge_port = "",
		container_roads_type_name = "",
		container_roads_type_group_name = "",
		container_roads_weight = 0,
		container_roads_weight_unit = translate("tue"),
		container_roads_freight = 0,
		container_roads_loading_time_earliest = 0,
		container_roads_loading_time_latest = 0,
		container_roads_creation_time = 0
	} = source;
	
	container_roads_weight = formatNumber(container_roads_weight, locale);
	container_roads_freight = formatPrice( container_roads_freight, undefined, locale );

	container_roads_loading_time_earliest = formatDate( container_roads_loading_time_earliest );
	container_roads_loading_time_latest = formatDate( container_roads_loading_time_latest );
	container_roads_loading_time_latest = container_roads_loading_time_latest != container_roads_loading_time_earliest ? container_roads_loading_time_latest : ""

	container_roads_creation_time = formatTimeAgo( container_roads_creation_time );
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				(
					!!container_roads_load_port || 
					!!container_roads_discharge_port
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='route' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ container_roads_load_port }
							{ !!container_roads_discharge_port && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!container_roads_load_port && 
								!!container_roads_discharge_port
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!container_roads_load_port && _styles.TABSYMBOL }
							{ container_roads_discharge_port }
						</Text>
					</Text>
			}

			{
				(
					!!container_roads_type_name || 
					!!container_roads_type_group_name
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='container' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Cont") }
                            { _styles.SPACESYMBOL }
							{ container_roads_type_name || container_roads_type_group_name }
							{ _styles.SPACESYMBOL }
							{ container_roads_weight } 
							{ _styles.SPACESYMBOL }
							{ container_roads_weight_unit }
						</Text>
					</Text>
			}

			{
				(!!container_roads_freight) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ container_roads_freight }</Text>
					</Text>
			}

			{
				(
					!!container_roads_loading_time_earliest || 
					!!container_roads_loading_time_latest
				) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Xếp hàng") }:
						</Text>
						{ _styles.SPACESYMBOL }
						<Text style={ _styles.text }>
							{ container_roads_loading_time_earliest }
							{ !!container_roads_loading_time_latest && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!container_roads_loading_time_earliest && 
								!!container_roads_loading_time_latest
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!container_roads_loading_time_earliest && _styles.TABSYMBOL }
							{ container_roads_loading_time_latest }
						</Text>
					</Text>
			}

			{
				!!container_roads_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ container_roads_creation_time }</Text>
			}
		</View>
	);
};

Container.displayName = "Container";

export default Container;