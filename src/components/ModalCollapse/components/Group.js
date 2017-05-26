import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from '~/components/Collapsible';
import ArrowTranform from '~/components/ArrowTranform';

class Group extends React.PureComponent {

	static displayName = '@ModalCollapseGroup';

	static propTypes = {
		onPress: React.PropTypes.func,
		label: React.PropTypes.string.isRequired,
		multiple: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		isSelectAll: React.PropTypes.bool,
		autoCheck: React.PropTypes.bool,
		isHot: React.PropTypes.bool,
		isOther: React.PropTypes.bool,
		level: React.PropTypes.number,
		children: React.PropTypes.node.isRequired,
		opened: React.PropTypes.bool
	};
	
	static defaultProps = {
		multiple: false,
		checked: false,
		isSelectAll: false,
		autoCheck: false,
		isHot: false,
		isOther: false,
		level: 1,
		opened: false
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.opened !== nextProps.opened ||
			this.props.label !== nextProps.label ||
			this.props.multiple !== nextProps.multiple ||
			this.props.checked !== nextProps.checked ||
			this.props.isSelectAll !== nextProps.isSelectAll ||
			this.props.autoCheck !== nextProps.autoCheck ||
			this.props.isHot !== nextProps.isHot ||
			this.props.isOther !== nextProps.isOther ||
			this.props.level !== nextProps.level ||
			this.props.children != nextProps.children ||
			this.props.onPress != nextProps.onPress
		);
	}

	render() {

		const { 
			children,
			label,
			level,
			opened,
			onPress
		} = this.props;

		const paddingLeft = level * 10;

		let mask = [];

		if( !opened ) {

			(Array.isArray(children) ? children : [children]).forEach( Item => {

				if( Item.props.checked || Item.props.isHot ) {

					mask.push( Item );
				}
			} );
		}

		return (
			<View style={ !opened ? mask && mask.length && _styles.containerHasMask : _styles.containerIsOpen }>
				<TouchableOpacity onPress={ onPress } style={ [_styles.item, {
					paddingLeft
				}] }>
					<Text numberOfLines={1} style={ _styles.label }>{ label }</Text>
					<ArrowTranform
						disable
						dir 		= { opened ? "up" : "down" }
					/>
				</TouchableOpacity>
				{ mask }
				<Collapsible
					collapsed 		= { !opened }
				>
					{ children }
				</Collapsible>
			</View>
		);
	}
}

const _styles = {
	containerIsOpen: {
		backgroundColor: "#f3f3f3"
	},
	containerHasMask: {
		borderColor: "#979797",
		borderBottomWidth: 1,
		borderTopWidth: 1
	},
	item: {
		height: 36,
		alignItems: "center",
		borderBottomColor: "#e5e5e5",
		borderBottomWidth: 0.5,
		paddingRight: 15,
		flexDirection: "row"
	},
	label: {
		fontWeight: "bold",
		marginRight: 8
	}
};

export default Group;