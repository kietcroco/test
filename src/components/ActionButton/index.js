import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Item from './Item';
import MainButton from './MainButton';
import Button from './Button';
import { colors, scale } from '~/configs/styles';

class ActionButton extends React.Component {

	static displayName = "@action-button";

	static propTypes = {
		style: PropTypes.object,
		label: PropTypes.string,
		onPress: PropTypes.func,
		duration: PropTypes.number,
		children: PropTypes.node,
		active: PropTypes.bool,
		backgroundTappable: PropTypes.bool,
		backdrop: PropTypes.bool,
		offset: PropTypes.shape({
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
			left: PropTypes.number
		}),
		labelPost: PropTypes.string,
		scaleValueAnim: PropTypes.object
	};

	static defaultProps = {
		duration: 300,
		active: false,
		backgroundTappable: true,
		backdrop: true
	};

	constructor( props ) {
		super( props );

		this.state = {
			visible: props.active
		};
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.visible !== nextState.visible ||
			this.props.label !== nextProps.label ||
			this.props.duration !== nextProps.duration ||
			this.props.backgroundTappable !== nextProps.backgroundTappable ||
			this.props.backdrop !== nextProps.backdrop ||
			this.props.labelPost !== nextProps.labelPost ||
			this.props.scaleValueAnim !== nextProps.scaleValueAnim ||
			this.props.offset != nextProps.offset
		);
	}

	_onPress = () => {

		this.setState({
			visible: !this.state.visible
		});
	};

	render() {

		const { 
			style, 
			children, 
			label, 
			onPress, 
			offset, 
			duration,
			backgroundTappable,
			backdrop, 
			labelPost,
			scaleValueAnim
		} = this.props;

		if( onPress && !label && !children ) {

			return (
				<Button scaleValueAnim={scaleValueAnim} offset={ offset } style={ style } onPress={ onPress } label={ labelPost }/>
			);
		}

		const actionButtons = children && !Array.isArray(children) ? [children] : children;
		var delay = duration;
		const tmpTime = delay / actionButtons.length;

		return (

			<View pointerEvents="box-none" style={ _styles.wrapper }>
				{
					backdrop && this.state.visible && 
						<TouchableOpacity activeOpacity={1} onPress={ backgroundTappable ? this._onPress : undefined } style={ _styles.backdrop } />
				}
				<View style={ offset ? [_styles.actionContainer, {
					marginRight: offset.right,
					marginLeft: offset.left,
					marginTop: offset.top
				}] : _styles.actionContainer } pointerEvents="box-none">
					{
						this.state.visible &&
							<ScrollView 
								pointerEvents 					= "box-none" 
								contentContainerStyle 			= { _styles.content }
								showsHorizontalScrollIndicator	= { false }
								showsVerticalScrollIndicator	= { true }
								horizontal 						= { false }
								directionalLockEnabled 			= { true }
								keyboardDismissMode 			= "interactive"
								keyboardShouldPersistTap 		= "always"
							>
								{ 
									!!actionButtons && actionButtons.map( (ActionButton, i) => {

										if( !ActionButton ) return;
										if( i > 0 ) {

											delay -= tmpTime;
										}

										return (
											<Item
												{ ...ActionButton.props }
												key 	= {"action-button-" + i}
												delay 	= { delay }
											>
												{ ActionButton.props.children }
											</Item>
										);
									} )
								}
							</ScrollView>
					}
				</View>
				<MainButton scaleValueAnim={scaleValueAnim} label={ labelPost } offset={ offset } active={ this.state.visible } onPress={ this._onPress }>{ label }</MainButton>
			</View>
		);
	}
}

ActionButton.Item = Item;

const _styles = {
	wrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	actionContainer: {
		flex: 1,
		width: 260 * scale,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	content: {
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		//backgroundColor: "black",
		//opacity: 0.5
		backgroundColor: colors.overlayColor
	}
};

export default ActionButton;