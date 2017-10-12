"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import IzifixIcon from 'izifix-icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { translate } from '~/utilities/language';
import formatNumber from '../utils/formatNumber';
import formatPrice from '../utils/formatPrice';
import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';

const Purchase = ( props ) => {

	const { style, source = {} } = props;

	let {
		purchase_seas_creation_time = 0,
		purchase_seas_type = "SELL",
		purchase_seas_dwt = 0,
		purchase_seas_dwt_unit = translate("dwt"),
		purchase_seas_year_built = `${translate("#$seas$#trước năm")} 1980`,
		purchase_seas_country_built = "",
		purchase_seas_vehicle_type = "",
		purchase_seas_place_inspect = "",
		purchase_seas_idea_price = 0,
		purchase_seas_idea_price_currency = "usd",
		purchase_seas_main_engine_maker = "",
		purchase_seas_total_me_power = 0,
		purchase_seas_total_me_power_unit = "dwt"
	} = source;
	
	purchase_seas_creation_time = formatTimeAgo( purchase_seas_creation_time );
	purchase_seas_type = purchase_seas_type == "SELL" ? translate("#$seas$purchase_type$#Bán") : translate("#$seas$purchase_type$#Cần mua");
	purchase_seas_dwt = formatNumber( purchase_seas_dwt );
	purchase_seas_total_me_power = formatNumber( purchase_seas_total_me_power );

	if( purchase_seas_idea_price != 0 ) {

		purchase_seas_idea_price = `${formatPrice( purchase_seas_idea_price, translate("#$seas$#Giá thỏa thuận") )} ${purchase_seas_idea_price_currency}`;
	} else {

		purchase_seas_idea_price = formatPrice( purchase_seas_idea_price, translate("#$seas$#Giá thỏa thuận") );
	}
	purchase_seas_vehicle_type = purchase_seas_vehicle_type ? purchase_seas_vehicle_type.toLowerCase() : purchase_seas_vehicle_type;
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					<Text style={[_styles.text, _styles.highlightType]}>
						{ purchase_seas_type }:
					</Text>
					{ /*_styles.SPACESYMBOL*/ }
					{ /*translate("#$seas$#tàu")*/ }
					{ _styles.SPACESYMBOL }
					{ purchase_seas_vehicle_type }
					{ _styles.SPACESYMBOL }
					{ purchase_seas_dwt }
					{ _styles.SPACESYMBOL }
					{ purchase_seas_dwt_unit }
				</Text>
			}

			{
				(
					!!purchase_seas_year_built || 
					!!purchase_seas_country_built
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='configuration' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ purchase_seas_year_built ? `${translate("#$seas$yearBuilt$#Đóng")}${ _styles.SPACESYMBOL }` : "" }
							{ purchase_seas_year_built }
							{ (purchase_seas_year_built && purchase_seas_country_built) ? _styles.SEPARATE : "" }
							{ purchase_seas_country_built }
						</Text>
					</Text>
			}

			{
				(
					!!purchase_seas_main_engine_maker || 
					!!purchase_seas_total_me_power
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='engine' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("#$seas$#Máy") }:
							{ 
								purchase_seas_main_engine_maker ?  
									`${ _styles.SPACESYMBOL }${ purchase_seas_main_engine_maker }`
								: ""
							}
							{
								purchase_seas_total_me_power ?
								 `${ _styles.SPACESYMBOL }${ purchase_seas_total_me_power }${ _styles.SPACESYMBOL }${ purchase_seas_total_me_power_unit }`
								: ""
							}
						</Text>
					</Text>
			}
			
			{
				(!!purchase_seas_place_inspect) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("#$seas$#Nơi xem") }:
							{ _styles.SPACESYMBOL }
							{ purchase_seas_place_inspect }
						</Text>
					</Text>
			}
				
			{
				(!!purchase_seas_idea_price) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ purchase_seas_idea_price }</Text>
					</Text>
			}
			
			{
				!!purchase_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ purchase_seas_creation_time }</Text>
			}
		</View>
	);
};

Purchase.displayName = "Purchase";

export default Purchase;