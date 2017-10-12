import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import IzifixIcon from 'izifix-icon';
import { sizes, colors } from '~/configs/styles';

const getIconName = ( exchange: String = "rivers" ) => {

	switch( exchange ) {

		case "rivers":

			return "barge";
		case "roads": 

			return "truck";
		case "seas":

			return "ship";
	}

	return "truck";
};

class Icon extends React.Component {

	static displayName = '@swipe-exchange-icon';

	static propTypes = {
		active: PropTypes.bool, // cờ sàn được active
		focus: PropTypes.bool, // cờ đang swipe
		size: PropTypes.number.isRequired, // đường kính icon
		children: PropTypes.oneOf(['roads', 'rivers', 'seas']), // tên sàn
		visibility: PropTypes.bool // ẩn hoặc hiện
	};

	static defaultProps = {
		active: false,
		focus: false,
		visibility: true,
		children: "rivers"
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.visibility !== nextProps.visibility ||
			this.props.active !== nextProps.active ||
			this.props.focus !== nextProps.focus ||
			this.props.size !== nextProps.size ||
			this.props.children !== nextProps.children
		);
	}

	render() {

		const { active, focus, size, visibility, children } = this.props;

		return (
			<View style={[ _styles.normal, {
				width: size,
				height: size,
				borderRadius: size/2,
				opacity: visibility ? 1 : 0
			},  active && _styles.active, focus && _styles.focus]}>
				<IzifixIcon style={[ _styles.iconNormal, {
					fontSize: size - 10,
					backgroundColor: "transparent"
				}, active && _styles.iconActive, focus && _styles.iconFocus]} name={ getIconName( children ) }/>
			</View>
			
		);
	}
}

const _styles = {
	normal: {
		justifyContent: "center",
		alignItems: "center",
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		backgroundColor: colors.primaryBackgroundColor
		
	},
	iconNormal: {
		color: "black",
		textAlign: "center",
		textAlignVertical: "center"
	},
	active: {
		backgroundColor: colors.primaryColor
		
	},
	iconActive: {
		color: colors.secondColor
	},
	focus: {
		backgroundColor: colors.focusColor
		
	},
	iconFocus: {
		color: colors.secondColor
	}
};

export default Icon;