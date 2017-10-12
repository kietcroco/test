import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IzifixIcon from 'izifix-icon';
import { shadow, sizes, colors, scale, fontSizes } from '~/configs/styles';

class Item extends React.Component {

	static displayName = "@action-button-item";

	static propTypes = {
		delay: PropTypes.number, // thời gian delay show
		duration: PropTypes.number, // thời gian animation
		onPress: PropTypes.func.isRequired, // handle click
		label: PropTypes.string.isRequired, // tiêu đề
		icon: PropTypes.string.isRequired
	};

	static defaultProps = {
		delay: 0,
		duration: 300
	};

	constructor( props ) {
		super( props );

		this._animScale = new Animated.Value(0.01);
	}

	componentWillReceiveProps() {

		this._animScale.stopAnimation();
	}

	shouldComponentUpdate(nextProps) {

		return (
			this.props.delay !== nextProps.delay ||
			this.props.duration !== nextProps.duration ||
			this.props.icon !== nextProps.icon ||
			this.props.label !== nextProps.label
		);
	}

	render() {

		const { onPress, label, icon } = this.props;

		return (
			<TouchableOpacity activeOpacity={1} onPress={ onPress } style={ _styles.container }>
				<Animated.View style={ [_styles.row, {
					transform: [
						{scale: this._animScale}
					]
				}] } >
					<View style={ _styles.label }>
						<Text style={ _styles.labelText }>{ label }</Text>
					</View>
					<View style={ _styles.actionButton }>
						<IzifixIcon adjustsFontSizeToFit={true} style={ _styles.actionButtonIcon } name={ icon }/>
					</View>
				</Animated.View>
			</TouchableOpacity>
		);
	}

	componentDidMount() {

		setTimeout(() => {

			Animated.timing(
				this._animScale,
				{
					toValue: 1,
					duration: this.props.duration,
					useNativeDriver: true
				}
			).start();
		}, this.props.delay);
	}

	componentWillUnmount() {

		this._animScale.stopAnimation();
	}
}

const _styles = {
	container: {
		height: 46 * scale,
		width: 260 * scale
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1
	},
	label: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.secondBackgroundColor,
		flex: 1,
		marginHorizontal: sizes.margin,
		borderRadius: sizes.borderRadius,
		height: 40 * scale,
		...shadow
	},
	labelText: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: fontSizes.normal
	},
	actionButton: {
		width: 36 * scale,
		height: 36 * scale,
		backgroundColor: colors.actionButtonBackgroundColor,
		borderRadius: 18 * scale,
		marginRight: 7 * scale,
		marginLeft: 3 * scale,
		...shadow
	},
	actionButtonIcon: {
		flex: 1,
		textAlign: "center",
		textAlignVertical: "center",
		color: colors.secondColor,
		fontSize: 20 * scale,
		backgroundColor: "transparent"
	}
};

export default Item;