import PropTypes from 'prop-types';
import React from 'react';
import { View, ListView, Text, TouchableOpacity, Modal } from 'react-native';
import ModalHeader from '~/components/ModalHeader';
import Radio from '~/components/Radio';
import IzifixIcon from 'izifix-icon';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { translate } from '~/utilities/language';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';

import mapCurrentLanguage from '~/utilities/mapCurrentLanguageToProps';

class ModalCategory extends React.Component {

	static displayName = "@ModalCategory";

	static propTypes = {
		visible: PropTypes.bool,
		onRequestClose: PropTypes.func.isRequired,
		source: PropTypes.array.isRequired,
		activeName: PropTypes.string,
		onChange: PropTypes.func
	};
	
	static defaultProps = {
		visible: false,
		activeName: ""
	};

	constructor( props ) {
		super( props );

		this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)});
	}

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.visible !== nextProps.visible ||
			this.props.activeName !== nextProps.activeName ||
			this.props.onRequestClose != nextProps.onRequestClose ||
			this.props.onChange != nextProps.onChange ||
			this.props.currentLanguage !== nextProps.currentLanguage ||
			!recursiveShallowEqual( this.props.source, nextProps.source )
		);
	}

	render() {

		const { visible, onRequestClose, source } = this.props;

		const dataSource = this._ds.cloneWithRows( source );

		return (
			<Modal
				visible 		= { visible }
				animationType 	= "fade"
				onRequestClose 	= { onRequestClose }
			>
				<ModalHeader 
					backHandle 	= { onRequestClose }
					title 		= { translate("#$seas$#Chọn danh mục") }
				/>
				<ListView
					dataSource 					= { dataSource }
					renderRow 					= { this._renderRows }
					initialListSize				= { 20 }
					pageSize 					= { 30 }
					scrollRenderAheadDistance	= { 40 }
					enableEmptySections 		= { true }
					keyboardDismissMode 		= "interactive"
					keyboardShouldPersistTap 	= "always"
					showsHorizontalScrollIndicator	= { false }
					showsVerticalScrollIndicator	= { true }
					horizontal 						= { false }
					directionalLockEnabled 			= { true }
					style 						= { _styles.listView }
				/>
			</Modal>
		);
	}

	_renderRows = (rowData, sectionID, rowID, highlightRow) => {

		const { params: { Exchange = "", type = "" } = {}, label, iconName } = rowData;

		return (
			<TouchableOpacity onPress={() => {

				this.props.onChange && this.props.onChange(Exchange, type);
			}} style={_styles.item}>
				{
					iconName === "home" ?
						<FAIcon name={iconName} style={_styles.icon} /> :
						<IzifixIcon name={iconName} style={_styles.icon} />
				}
				<View style={_styles.itemLabel}>
					<Text numberOfLines={1} style={_styles.label}>{translate(label)}</Text>
					<Radio checked={Exchange === this.props.activeName} />
				</View>
			</TouchableOpacity>
		);
	};
}

const _styles = {
	listView: {
		backgroundColor: colors.modalBackground
	},
	item: {
		height: sizes.rowItemHeight,
		alignItems: "center",
		borderBottomColor: colors.primaryBorderColor,
		borderBottomWidth: sizes.borderWidth,
		paddingRight: sizes.margin,
		paddingLeft: sizes.margin,
		flexDirection: "row"
	},
	itemLabel: {
		justifyContent: "space-between",
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		marginLeft: sizes.margin
	},
	label: {
		color: colors.normalColor,
		fontSize: fontSizes.normal
	},
	icon: {
		fontSize: 20 * scale,
		color: colors.normalColor
	}
};

export default mapCurrentLanguage(ModalCategory);