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

const locale = "vi";

const Purchase = ( props ) => {

	const { style, source = {} } = props;

	let {
		purchase_roads_creation_time = 0,
		purchase_roads_type = "SELL",
		purchase_roads_tonnage = 0,
		purchase_roads_tonnage_unit = translate("tấn"),
		purchase_roads_year_built = `${translate("trước năm")} 1980`,
		purchase_roads_place_built = "",
		purchase_roads_vehicle_type = "",
		purchase_roads_place_delivery = "",
		purchase_roads_price = 0,
		purchase_roads_trademark = ""
	} = source;
	
	purchase_roads_creation_time = formatTimeAgo( purchase_roads_creation_time );
	purchase_roads_type = purchase_roads_type == "SELL" ? translate("Bán") : translate("Cần mua");
	purchase_roads_tonnage = formatNumber( purchase_roads_tonnage, locale );
	purchase_roads_price = formatPrice( purchase_roads_price, undefined, locale );
	purchase_roads_vehicle_type = purchase_roads_vehicle_type ? purchase_roads_vehicle_type.toLowerCase() : purchase_roads_vehicle_type;
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
					<Text style={[_styles.text, _styles.highlightType]}>
						{ purchase_roads_type }:
					</Text>
					{ _styles.SPACESYMBOL }
					{ translate("xe") }
					{ _styles.SPACESYMBOL }
					{ purchase_roads_vehicle_type }
					{ _styles.SPACESYMBOL }
					{ purchase_roads_tonnage }
					{ _styles.SPACESYMBOL }
					{ purchase_roads_tonnage_unit }
				</Text>
			}

			{
				!!purchase_roads_trademark &&
					<Text style={ [_styles.textRow, _styles.text] }>
						{ translate("Hiệu") }:
						{ _styles.SPACESYMBOL }
						{ purchase_roads_trademark }
					</Text>
			}

			{
				(
					!!purchase_roads_year_built || 
					!!purchase_roads_place_built
				) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='configuration' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ purchase_roads_year_built ? `${translate("Sản xuất")}${ _styles.SPACESYMBOL }` : "" }
							{ purchase_roads_year_built }
							{ (purchase_roads_year_built && purchase_roads_place_built) ? _styles.SEPARATE : "" }
							{ purchase_roads_place_built }
						</Text>
					</Text>
			}
			
			{
				(!!purchase_roads_place_delivery) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ translate("Nơi xem") + ': ' }
							{ _styles.SPACESYMBOL }
							{ purchase_roads_place_delivery }
						</Text>
					</Text>
			}
				
			{
				(!!purchase_roads_price) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ purchase_roads_price }</Text>
					</Text>
			}
			
			{
				!!purchase_roads_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ purchase_roads_creation_time }</Text>
			}
		</View>
	);
};

Purchase.displayName = "Purchase";

export default Purchase;