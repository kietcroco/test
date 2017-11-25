import React from 'react';
import RowItem from '~/components/RowItem/Seas';
import ListMessage from '../../ListMessage';
import getDetailRouteName from '../utilities/getDetailRouteName';
import { translate } from '~/utilities/language';

export default function renderRow(rowData, sectionID, rowID, highlightRow) {

	// message row
	if (typeof rowData === 'string') {

		return (
			<ListMessage
				messageType={rowData}
				emptyMessage={translate("#$seas$#Danh sách rỗng")}
				notFoundMessage={translate("#$seas$#Không tìm thấy dữ liệu")}
				endPageMessage={translate("#$seas$#Bạn đã ở tin cuối")}
			/>
		);
	}

	return (
		<RowItem onPress={() => {
			this.props.navigation.navigate(`/seas${getDetailRouteName(rowData.exchanges)}`, {
				source: rowData,
				id: rowData.id
			});
		}} key={`ListItem-Seas-${sectionID}-${rowID}`} source={rowData} />
	);
};