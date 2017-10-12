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

const Product = ( props ) => {

	const { style, source = {} } = props;

	let {
		product_rivers_load_port = "",
		product_rivers_discharge_port = "",
		product_rivers_type_name = "",
		product_rivers_type_group_name = "",
		product_rivers_weight = 0,
		product_rivers_weight_unit = translate("tấn"),
		product_rivers_freight = 0,
		product_rivers_loading_time_earliest = 0,
		product_rivers_loading_time_latest = 0,
		product_rivers_creation_time = 0
	} = source;
	
	product_rivers_weight = formatNumber(product_rivers_weight, locale);
	product_rivers_freight = formatPrice( product_rivers_freight, undefined, locale );

	product_rivers_loading_time_earliest = formatDate( product_rivers_loading_time_earliest );
	product_rivers_loading_time_latest = formatDate( product_rivers_loading_time_latest );
	product_rivers_loading_time_latest = product_rivers_loading_time_latest != product_rivers_loading_time_earliest ? product_rivers_loading_time_latest : ""

	product_rivers_creation_time = formatTimeAgo( product_rivers_creation_time );
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				(
					!!product_rivers_load_port || 
					!!product_rivers_discharge_port
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='route' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ product_rivers_load_port }
							{ !!product_rivers_discharge_port && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!product_rivers_load_port && 
								!!product_rivers_discharge_port
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!product_rivers_load_port && _styles.TABSYMBOL }
							{ product_rivers_discharge_port }
						</Text>
					</Text>
			}

			{
				(
					!!product_rivers_type_name || 
					!!product_rivers_type_group_name
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='sacks' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ product_rivers_type_name || product_rivers_type_group_name }
							{ _styles.SPACESYMBOL }
							{ product_rivers_weight } 
							{ _styles.SPACESYMBOL }
							{ product_rivers_weight_unit }
						</Text>
					</Text>
			}

			{
				(!!product_rivers_freight) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ product_rivers_freight }</Text>
					</Text>
			}

			{
				(
					!!product_rivers_loading_time_earliest || 
					!!product_rivers_loading_time_latest
				) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Xếp hàng") }:
						</Text>
						{ _styles.SPACESYMBOL }
						<Text style={ _styles.text }>
							{ product_rivers_loading_time_earliest }
							{ !!product_rivers_loading_time_latest && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!product_rivers_loading_time_earliest && 
								!!product_rivers_loading_time_latest
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!product_rivers_loading_time_earliest && _styles.TABSYMBOL }
							{ product_rivers_loading_time_latest }
						</Text>
					</Text>
			}

			{
				!!product_rivers_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ product_rivers_creation_time }</Text>
			}
		</View>
	);
};

Product.displayName = "Product";

export default Product;