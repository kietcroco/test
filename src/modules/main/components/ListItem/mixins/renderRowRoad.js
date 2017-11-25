import React from 'react';
import RowItem from '~/components/RowItem/Roads';
import ListMessage from '../../ListMessage';
import getDetailRouteName from '../utilities/getDetailRouteName';

export default function renderRow(rowData, sectionID, rowID, highlightRow) {

	// message row
	if (typeof rowData === 'string') {

		return (
			<ListMessage messageType={rowData} />
		);
	}

	return (
		<RowItem onPress={() => {
			this.props.navigation.navigate(`/roads${getDetailRouteName(rowData.exchanges)}`, {
				source: rowData,
				id: rowData.id
			});
		}} key={`ListItem-Roads-${sectionID}-${rowID}`} source={rowData} />
	);
};