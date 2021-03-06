"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import IzifixIcon from 'izifix-icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import formatNumber from '../utils/formatNumber';
//import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';

const Enterprise = ( props ) => {

	const { style, source = {} } = props;

	let {
        //enterprise_seas_creation_time = 0,
        account: {
            account_company_name = "",
            account_company_name_acronym = "",
            account_contact = "",
            account_company_address = "",
            account_phone = "",
            account_mobile = ""
        } = {},
        enterprise_seas_vehicle_counter = 0
    } = source;
    
	//enterprise_seas_creation_time = formatTimeAgo( enterprise_seas_creation_time );
    enterprise_seas_vehicle_counter = formatNumber( enterprise_seas_vehicle_counter );
    
	return (
        <View style={[ _styles.wrapper, style ]}>
        
            {
				<Text style={ [_styles.textRow, _styles.text] }>
					{ account_company_name || account_company_name_acronym || account_contact }
				</Text>
            }
            
            {
				(!!account_company_address) &&
                    <Text style={ _styles.textRow }>
                        <MaterialIcons name='place' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { account_company_address }
                        </Text>
                    </Text>
            }
                
            {
				(!!account_phone || account_mobile) &&
                    <Text style={ _styles.textRow }>
                        <FAIcon name='phone' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { account_phone }
                            { (account_phone && account_mobile) ? _styles.SEPARATE : "" }
                            { account_mobile }
                        </Text>
                    </Text>
            }
                
            {
				(!!enterprise_seas_vehicle_counter) &&
                    <Text style={ _styles.textRow }>
                        <FAIcon name='ship' style={_styles.icon} />
                        { _styles.TABSYMBOL }
                        <Text style={ _styles.text }>
                            { translate("#$seas$#Số lượng") }:
                            { _styles.SPACESYMBOL }
                            { enterprise_seas_vehicle_counter }
                            { _styles.SPACESYMBOL }
                            { translate("#$seas$#tàu") }
                        </Text>
                    </Text>
			}
			
			{/*
				!!enterprise_seas_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ enterprise_seas_creation_time }</Text>
			*/}
		</View>
	);
};

Enterprise.displayName = "Enterprise";

export default Enterprise;