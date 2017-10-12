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
        purchase_rivers_creation_time = 0,
        purchase_rivers_type = "SELL",
        purchase_rivers_tonnage = 0,
        purchase_rivers_tonnage_unit = translate("tấn"),
        purchase_rivers_year_built = `${translate("trước năm")} 1980`,
        purchase_rivers_place_built = "",
        purchase_rivers_vehicle_type = "",
        purchase_rivers_place_delivery = "",
        purchase_rivers_price = 0
	} = source;
	
    purchase_rivers_creation_time = formatTimeAgo( purchase_rivers_creation_time );
    purchase_rivers_type = purchase_rivers_type == "SELL" ? translate("Bán") : translate("Cần mua");
    purchase_rivers_tonnage = formatNumber( purchase_rivers_tonnage, locale );
    purchase_rivers_price = formatPrice( purchase_rivers_price, undefined, locale );
    purchase_rivers_vehicle_type = purchase_rivers_vehicle_type ? purchase_rivers_vehicle_type.toLowerCase() : purchase_rivers_vehicle_type;
    
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				<Text style={ [_styles.textRow, _styles.text] }>
                    <Text style={[_styles.text, _styles.highlightType]}>
                        { purchase_rivers_type }:
                    </Text>
                    { _styles.SPACESYMBOL }
                    { translate("sà lan") }
                    { _styles.SPACESYMBOL }
                    { purchase_rivers_vehicle_type }
                    { _styles.SPACESYMBOL }
                    { purchase_rivers_tonnage }
                    { _styles.SPACESYMBOL }
                    { purchase_rivers_tonnage_unit }
				</Text>
            }

            {
				(
                    !!purchase_rivers_year_built || 
                    !!purchase_rivers_place_built
                ) &&
                    <Text style={ _styles.textRow }>
                        <IzifixIcon name='configuration' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { purchase_rivers_year_built ? `${translate("Đóng")}${ _styles.SPACESYMBOL }` : "" }
                            { purchase_rivers_year_built }
                            { (purchase_rivers_year_built && purchase_rivers_place_built) ? _styles.SEPARATE : "" }
                            { purchase_rivers_place_built }
                        </Text>
                    </Text>
            }
            
            {
				(!!purchase_rivers_place_delivery) &&
                    <Text style={ _styles.textRow }>
                        <MaterialIcons name='place' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { translate("Nơi xem") }:
                            { _styles.SPACESYMBOL }
                            { purchase_rivers_place_delivery }
                        </Text>
                    </Text>
            }
                
            {
				(!!purchase_rivers_price) &&
					<Text style={ _styles.textRow }>
						<IzifixIcon name='money' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.textPrice }>{ purchase_rivers_price }</Text>
					</Text>
			}
            
			{
				!!purchase_rivers_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ purchase_rivers_creation_time }</Text>
			}
		</View>
	);
};

Purchase.displayName = "Purchase";

export default Purchase;