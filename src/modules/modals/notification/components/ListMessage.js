import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { translate } from '~/utilities/language';
import { colors, fontSizes, scale } from '~/configs/styles';

class ListMessage extends React.Component {

	static displayName = '@ListMessage';

	static propTypes = {
		messageType: PropTypes.oneOf([
			"empty",
			"loading",
			"notFound",
			"endPage"
		]),
		emptyMessage: PropTypes.string,
		notFoundMessage: PropTypes.string,
		endPageMessage: PropTypes.string
	};

	static defaultProps = {
		messageType: "loading"
	};

	render() {

		const { 
			messageType,
			emptyMessage = translate("Danh sách rỗng"),
			notFoundMessage = translate("Không tìm thấy dữ liệu"),
			endPageMessage = translate("Bạn đã ở tin cuối")
		} = this.props;

		if( messageType === "loading" ) {

			return <ActivityIndicator hidesWhenStopped={true} animating={true} color={ colors.loadingColor }/>
		}

		let backgroundColor = colors.infoColor;
		let message = "";

		switch( messageType ) {

			case "empty": 
				message = emptyMessage;
				backgroundColor = colors.infoColor;
				break;
			case "notFound": 
				message = notFoundMessage;
				backgroundColor = colors.infoColor;
				break;
			case "endPage": 
				message = endPageMessage;
				backgroundColor = colors.infoColor;
				break;
		}

		return (
			<View style={[ _styles.container, {
				backgroundColor
			} ]}><Text style={ _styles.message }>{ message }</Text></View>
		);
	}
}

const _styles = {
	container: {
		height: 30 * scale,
		alignItems: "center",
		justifyContent: "center"
	},
	message: {
		color: colors.secondColor,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.normal
	}
};

export default ListMessage;