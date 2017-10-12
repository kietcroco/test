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

const Product = ( props ) => {

	const { style, source = {} } = props;

	let {
		product_seas_load_port = "",
		product_seas_discharge_port = "",
		product_seas_type_name = "",
		product_seas_type_group_name = "",
		product_seas_weight = 0,
		product_seas_weight_unit = translate("#$seas$#tấn"),
		product_seas_freight = 0,
		product_seas_freight_currency = "usd",
		product_seas_loading_time_earliest = 0,
		product_seas_loading_time_latest = 0,
		product_seas_creation_time = 0
	} = source;
	
	product_seas_weight = formatNumber(product_seas_weight);
	
	if( product_seas_freight != 0 ) {

		product_seas_freight = `${ formatPrice( product_seas_freight, translate("#$seas$#Giá thỏa thuận") ) } ${product_seas_freight_currency}/${ product_seas_weight_unit }`;
	} else {

		product_seas_freight = formatPrice( product_seas_freight, translate("#$seas$#Giá thỏa thuận") );
	}

	product_seas_loading_time_earliest = formatDate( product_seas_loading_time_earliest );
	product_seas_loading_time_latest = formatDate( product_seas_loading_time_latest );
	product_seas_loading_time_latest = product_seas_loading_time_latest != product_seas_loading_time_earliest ? product_seas_loading_time_latest : ""

	product_seas_creation_time = formatTimeAgo( product_seas_creation_time );
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				(
					!!product_seas_load_port || 
					!!product_seas_discharge_port
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='route' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ product_seas_load_port }
							{ !!product_seas_discharge_port && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!product_seas_load_port && 
								!!product_seas_discharge_port
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!product_seas_load_port && _styles.TABSYMBOL }
							{ product_seas_discharge_port }
						</Text>
					</Text>
			}

			{
				(
					!!product_seas_type_name || 
					!!product_seas_type_group_name
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='sacks' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ product_seas_type_name || product_seas_type_group_name }
							{ _styles.SPACESYMBOL }
							{ product_seas_weight } 
							{ _styles.SPACESYMBOL }
							{ product_seas_weight_unit }
						</Text>
					</Text>
			}

			{
				(!!product_seas_freight) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ product_seas_freight }</Text>
					</Text>
			}

			{
				(
					!!product_seas_loading_time_earliest || 
					!!product_seas_loading_time_latest
				) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
							{ translate("#$seas$#Xếp hàng") }:
						</Text>
						{ _styles.SPACESYMBOL }
						<Text style={ _styles.text }>
							{ product_seas_loading_time_earliest }
							{ !!product_seas_loading_time_latest && _styles.TABSYMBOL }
						</Text>
						{
							(
								!!product_seas_loading_time_earliest && 
								!!product_seas_loading_time_latest
							) &&
								<FAIcon style={ _styles.text } name='long-arrow-right' />
						}
						<Text style={ _styles.text }>
							{ !!product_seas_loading_time_earliest && _styles.TABSYMBOL }
							{ product_seas_loading_time_latest }
						</Text>
					</Text>
			}

			{
				!!product_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ product_seas_creation_time }</Text>
			}
		</View>
	);
};

Product.displayName = "Product";

export default Product;