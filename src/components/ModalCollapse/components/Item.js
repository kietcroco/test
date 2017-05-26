import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Radio from '~/components/Radio';
import Checkbox from '~/components/CheckBox';

class Item extends React.PureComponent {

	static displayName = '@ModalCollapseItem';

	static propTypes = {
		onPress: React.PropTypes.func,
		label: React.PropTypes.string.isRequired,
		multiple: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		isSelectAll: React.PropTypes.bool,
		autoCheck: React.PropTypes.bool,
		isHot: React.PropTypes.bool,
		isOther: React.PropTypes.bool,
		level: React.PropTypes.number
	};

	static defaultProps = {
		multiple: false,
		checked: false,
		isSelectAll: false,
		autoCheck: false,
		isHot: false,
		isOther: false,
		level: 1
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.label !== nextProps.label ||
			this.props.multiple !== nextProps.multiple ||
			this.props.checked !== nextProps.checked ||
			this.props.isSelectAll !== nextProps.isSelectAll ||
			this.props.autoCheck !== nextProps.autoCheck ||
			this.props.isHot !== nextProps.isHot ||
			this.props.isOther !== nextProps.isOther ||
			this.props.level !== nextProps.level ||
			this.props.onPress != nextProps.onPress
		);
	}

	render() {

		const { 
			onPress,
			label,
			multiple,
			checked,
			level
		} = this.props;

		const paddingLeft = (level + 1) * 10;

		return (

			<TouchableOpacity onPress={ onPress } style={ [_styles.container, {
				paddingLeft
			}] }>
				<Text numberOfLines={1}>{ label }</Text>
				{
					multiple ? 
						<Checkbox checked={ checked }/> : 
						<Radio checked={ checked } />
				}
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: 36,
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomColor: "#e5e5e5",
		borderBottomWidth: 0.5,
		paddingRight: 15,
		flexDirection: "row"
	}
};

export default Item;