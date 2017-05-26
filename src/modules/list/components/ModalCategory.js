import React from 'react';
import { View, ListView, Text, TouchableOpacity, Modal } from 'react-native';
import ModalHeader from '~/components/ModalHeader';
import Radio from '~/components/Radio';
import IzifixIcon from '~/components/IzifixIcon';
import { translate } from '~/utilities/language';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';

class ModalCategory extends React.PureComponent {

	static displayName = "@ModalCategory";

	static propTypes = {
		visible: React.PropTypes.bool,
		onRequestClose: React.PropTypes.func.isRequired,
		source: React.PropTypes.array.isRequired,
		activeName: React.PropTypes.string,
		onChange: React.PropTypes.func
	};
	static defaultProps = {
		visible: false,
		activeName: ""
	};

	constructor( props ) {
		super( props );

		this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)});
		this._renderRows = this._renderRows.bind(this);
	}

	shouldComponentUpdate( nextProps ) {

		return (
			this.props.visible !== nextProps.visible ||
			this.props.activeName !== nextProps.activeName ||
			this.props.onRequestClose != nextProps.onRequestClose ||
			this.props.onChange != nextProps.onChange ||
			!recursiveShallowEqual( this.props.source, nextProps.source )
		);
	}

	_renderRows( rowData, sectionID, rowID, highlightRow ) {

		const { params: { Exchange = "", type = "" } = {}, label, iconName } = rowData;

		return (
			<TouchableOpacity onPress={ () => {

				this.props.onChange && this.props.onChange( Exchange, type );
			} } style={ _styles.item }>
				<IzifixIcon name={ iconName } size={ 20 }/>
				<View style={ _styles.itemLabel }>
					<Text numberOfLines={1}>{ label }</Text>
					<Radio checked={ Exchange === this.props.activeName } />
				</View>
			</TouchableOpacity>
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
					title 		= { translate("Chọn danh mục") }
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
				/>
			</Modal>
		);
	}
}

const _styles = {
	item: {
		height: 40,
		alignItems: "center",
		borderBottomColor: "#e5e5e5",
		borderBottomWidth: 0.5,
		paddingRight: 15,
		paddingLeft: 10,
		flexDirection: "row"
	},
	itemLabel: {
		justifyContent: "space-between",
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		marginLeft: 10
	}
};

export default ModalCategory;