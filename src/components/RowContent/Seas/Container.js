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

const Container = ( props ) => {

	const { style, source = {} } = props;

	let {
		container_seas_load_port = "",
		container_seas_discharge_port = "",
		container_seas_type_name = "",
		container_seas_type_group_name = "",
		container_seas_weight = 0,
		container_seas_weight_unit = translate("tue"),
		container_seas_freight = 0,
		//container_seas_freight_currency = "usd",
		container_seas_loading_time_earliest = 0,
		container_seas_loading_time_latest = 0,
		container_seas_creation_time = 0
	} = source;
	
	container_seas_weight = formatNumber(container_seas_weight);
	
	if( container_seas_freight != 0 ) {

		container_seas_freight = `${ formatPrice( container_seas_freight, translate("#$seas$#Giá thỏa thuận") ) } ${ container_seas_weight_unit }`;
	} else {

		container_seas_freight = formatPrice( container_seas_freight, translate("#$seas$#Giá thỏa thuận") );
	}

	container_seas_loading_time_earliest = formatDate( container_seas_loading_time_earliest );
	container_seas_loading_time_latest = formatDate( container_seas_loading_time_latest );
	container_seas_loading_time_latest = container_seas_loading_time_latest != container_seas_loading_time_earliest ? container_seas_loading_time_latest : ""

	container_seas_creation_time = formatTimeAgo( container_seas_creation_time );
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				(
					!!container_seas_load_port || 
					!!container_seas_discharge_port
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='route' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ container_seas_load_port }
							{ !!container_seas_discharge_port && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!container_seas_load_port && 
								!!container_seas_discharge_port
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!container_seas_load_port && _styles.TABSYMBOL }
							{ container_seas_discharge_port }
						</Text>
					</Text>
			}

			{
				(
					!!container_seas_type_name || 
					!!container_seas_type_group_name
				) &&
					<Text style={ _styles.textRow }>
                        <IzifixIcon name='container' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { translate("Cont") }
                            { _styles.SPACESYMBOL }
							{ container_seas_type_name || container_seas_type_group_name }
							{ _styles.SPACESYMBOL }
							{ container_seas_weight } 
							{ _styles.SPACESYMBOL }
							{ container_seas_weight_unit }
						</Text>
					</Text>
			}

			{
				(!!container_seas_freight) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ container_seas_freight }</Text>
					</Text>
			}

			{
				(
					!!container_seas_loading_time_earliest || 
					!!container_seas_loading_time_latest
				) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
							{ translate("#$seas$#Xếp hàng") }:
						</Text>
						{ _styles.SPACESYMBOL }
						<Text style={ _styles.text }>
							{ container_seas_loading_time_earliest }
							{ !!container_seas_loading_time_latest && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!container_seas_loading_time_earliest && 
								!!container_seas_loading_time_latest
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!container_seas_loading_time_earliest && _styles.TABSYMBOL }
							{ container_seas_loading_time_latest }
						</Text>
					</Text>
			}

			{
				!!container_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ container_seas_creation_time }</Text>
			}
		</View>
	);
};

Container.displayName = "Container";

export default Container;