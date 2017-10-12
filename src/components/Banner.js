import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

const getImageExchane = (exchange: String = "rivers") => {

	switch( exchange ) {

		case "rivers":

			return require('~/assets/images/box_salan.png');
		case "roads":

			return require('~/assets/images/box_duongbo.png');
		case "seas":

			return require('~/assets/images/box_taubien.png');
	}

	return null;
};

const getExchangeName = (exchange: String = "rivers") => {

	switch( exchange ) {

		case "rivers":

			return translate("Đường Sông");
		case "roads":

			return translate("Đường Bộ");
		case "seas":

			return translate("#$seas$#Đường Biển");
	}

	return "IZIFIX";
};

class Banner extends React.Component {

	static displayName = '@Banner';

	static propTypes = {
		children: PropTypes.string.isRequired, // tên sàn con
		exchange: PropTypes.oneOf([
			"rivers",
			"roads",
			"seas"
		]),
		onPress: PropTypes.func
	};

	static defaultProps = {
		exchange: "rivers"
	};

	shouldComponentUpdate() {

		return false;
	}

	render() {

		const { exchange, children, onPress } = this.props;

		return (
			<View style={ _styles.container }>
				<View style={ _styles.bannerWrapper }>
					<Image style={ _styles.banner } source={ getImageExchane( exchange ) }/>
					<Text style={ _styles.exchange }>{ getExchangeName( exchange ) }</Text>
				</View>
				<Text adjustsFontSizeToFit={true} style={ _styles.subExchange }>{ children }</Text>
				<TouchableOpacity hitSlop={ hitSlop } activeOpacity={ colors.activeOpacity } onPress={ onPress } style={ _styles.favorite }>
					<FAIcon name="star-o" style={ _styles.icon }/>
				</TouchableOpacity>
			</View>
		);
	}
}

const _styles = {
	container: {
		width: 200 * scale,
		height: 70 * scale,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		borderRadius: sizes.borderRadius,
		position: "relative"
	},
	bannerWrapper: {
		height: 45 * scale,
		paddingHorizontal: 2 * scale,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: sizes.borderWidth,
		borderBottomColor: colors.primaryBorderColor
	},
	banner: {
		resizeMode: "contain",
		flex: 1
	},
	exchange: {
		flex: 1,
		fontWeight: "bold",
		fontSize: fontSizes.normal,
		textAlign: "center",
		textAlignVertical: "center",
		color: colors.boldColor
	},
	subExchange: {
		flex: 1,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.normal,
		color: colors.boldColor
	},
	favorite: {
		position: "absolute",
		bottom: 5 * scale,
		left: sizes.margin
	},
	icon: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default Banner;