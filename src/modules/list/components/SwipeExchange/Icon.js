"use strict";
import React from 'react';
import { Image, Touchable } from 'react-native';
import iconPointer from './iconPointer';

class Icon extends React.Component {

	static displayName = '@swipe-exchange-icon';

	static propTypes = {
		style: React.PropTypes.object,
		active: React.PropTypes.bool, // cờ sàn được active
		focus: React.PropTypes.bool, // cờ đang swipe
		size: React.PropTypes.number.isRequired, // đường kính icon
		children: React.PropTypes.oneOf(['roads', 'rivers', 'seas']), // tên sàn
		visibility: React.PropTypes.bool // ẩn hoặc hiện
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
		
		const { style, active, focus, size, visibility, children } = this.props;

		const iconName = children + ( active || focus ? "Active" : "" );

		return (
			<Image 
				style 	= { [style, _styles.pointer, {
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: active && focus ? "red" : ( active ? "#2672BA" : "white" ),
					opacity: visibility ? 1 : 0
				}] }
				source 	= { iconPointer[ "pointer" ] }
			>
				<Image 
					style 	= { _styles.icon }
					source 	= { iconPointer[ iconName ] }
				/>
			</Image>
		);
	}
}


const _styles = {
	pointer: {
		resizeMode: "contain",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		zIndex: 1
	},
	icon: {
		flex: 1,
		resizeMode: "contain"
	}
};

export default Icon;