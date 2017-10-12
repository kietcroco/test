"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import formatDate from '../utils/formatDate';
import formatTimeAgo from '../utils/formatTimeAgo';
import _styles from '../styles';

const Bidding = ( props ) => {

	const { style, source = {} } = props;

	let {
		bidding_rivers_creation_time = 0,
		bidding_rivers_title_own = "",
		bidding_rivers_place = "",
		bidding_rivers_time = 0
	} = source;
	
	bidding_rivers_creation_time = formatTimeAgo( bidding_rivers_creation_time );
	bidding_rivers_time = formatDate( bidding_rivers_time );
	
	return (
		<View style={[ _styles.wrapper, style ]}>
			{
				!!bidding_rivers_title_own &&
					<Text style={ [_styles.textRow, _styles.text] }>
						{ bidding_rivers_title_own }
					</Text>
			}

			{
				(!!bidding_rivers_place) &&
					<Text style={ _styles.textRow }>
						<MaterialIcons name='place' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ bidding_rivers_place }
						</Text>
					</Text>
			}

			{
				( !!bidding_rivers_time ) &&
					<Text style={ _styles.textRow }>
						<FAIcon name='calendar' style={_styles.icon} />
						{ _styles.TABSYMBOL }
						<Text style={ _styles.text }>
							{ bidding_rivers_time }
						</Text>
					</Text>
			}

			{
				!!bidding_rivers_creation_time && 
					<Text style={ _styles.txtTimeAgo }>{ bidding_rivers_creation_time }</Text>
			}
		</View>
	);
};

Bidding.displayName = "Bidding";

export default Bidding;