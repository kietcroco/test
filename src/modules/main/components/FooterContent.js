import React from 'react';
import { View, Text } from 'react-native';
import getRoute from '~/utilities/getRoute';
import getModuleNameFromRoute from '~/utilities/getModuleNameFromRoute';
import SwipeExchange from './SwipeExchange';
import ActionButton from '~/components/ActionButton';
import { translate } from '~/utilities/language';
import { colors, sizes } from '~/configs/styles';

import mapCurrentLanguage from '~/utilities/mapCurrentLanguageToProps';

class FooterContent extends React.Component {

	constructor( props ) {
		super( props );

		this._onChange = this._onChange.bind(this);
		this._renderActionButton = this._renderActionButton.bind(this);
	}

	shouldComponentUpdate( nextProps ) {

		const moduleName = getModuleNameFromRoute( getRoute( this.props.navigation.state ) );
		const nextModuleName = getModuleNameFromRoute( getRoute( nextProps.navigation.state ) );

		return (
			moduleName !== nextModuleName ||
			this.props.currentLanguage !== nextProps.currentLanguage
		);
	}
	
	_onChange( land: String = "rivers" ) {

		this.props.navigation.navigate(`/${land}/list`);
	}

	_renderActionButton( moduleName: String = "rivers" ) {

		const { navigation } = this.props;

		switch( moduleName ) {

			case "rivers":

				return (
					<ActionButton 
						label 		= { translate("Đ.tin đường sông") }
						offset 		= { _styles.actionButtonOffset }
					>
						<ActionButton.Item 
							label 		= { translate("S.lan chạy rỗng cần hàng") }
							icon 		= "barge-o"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/vehicle-hollow');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Hàng - offer") }
							icon 		= "sacks"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/product');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Sà lan - open") }
							icon 		= "barge"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/vehicle-open');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Mua bán - S&P") }
							icon 		= "communicator"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/purchase');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Cần thuê Sà lan") }
							icon 		= "community"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/bidding');
							} }
						/>

						<ActionButton.Item 
							label 		= { translate("Doanh nghiệp") }
							icon 		= "building"
							onPress 	= { () => {
								navigation.navigate('/rivers/handle/enterprise');
							} }
						/>
					</ActionButton>
				);

			case "roads": 
					return (
					<ActionButton 
						label 		= { translate("Đ.tin đường bộ") }
						offset 		= { _styles.actionButtonOffset }
					>
						<ActionButton.Item 
							label 		= { translate("Xe tải chạy rỗng cần hàng") }
							icon 		= "truck-o"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/vehicle-hollow');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Hàng - offer") }
							icon 		= "sacks"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/product');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Xe - open") }
							icon 		= "truck"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/vehicle-open');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Mua bán - S&P") }
							icon 		= "communicator"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/purchase');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("Container - offer") }
							icon 		= "container"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/container');
							} }
						/>

						<ActionButton.Item 
							label 		= { translate("Doanh nghiệp") }
							icon 		= "building"
							onPress 	= { () => {
								navigation.navigate('/roads/handle/enterprise');
							} }
						/>
					</ActionButton>
				);

			case "seas":

				return (
					<ActionButton 
						label 		= { translate("#$seas$#Đ.tin đường biển") }
						offset 		= { _styles.actionButtonOffset }
						labelPost 	= { translate("#$seas$#Đ.tin") }
					>
						<ActionButton.Item 
							label 		= { translate("#$seas$#Tàu chạy rỗng") }
							icon 		= "ship-o"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/vehicle-hollow');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("#$seas$#Chào hàng") }
							icon 		= "sacks"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/product');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("#$seas$#Chào tàu") }
							icon 		= "ship"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/vehicle-open');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("#$seas$#Mua bán tàu (S&P)") }
							icon 		= "communicator"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/purchase');
							} }
						/>
						<ActionButton.Item 
							label 		= { translate("#$seas$#Container") }
							icon 		= "container"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/container');
							} }
						/>

						<ActionButton.Item 
							label 		= { translate("#$seas$#Doanh nghiệp") }
							icon 		= "building"
							onPress 	= { () => {
								navigation.navigate('/seas/handle/enterprise');
							} }
						/>
					</ActionButton>
				);
		}

		return null;
	}

	render() {

		const { navigation } = this.props;
		const moduleName = getModuleNameFromRoute( getRoute( navigation.state ) );

		return (
			<View pointerEvents="box-none" style={ _styles.wrapper }>
				<View style={ _styles.container }>
					<SwipeExchange onChange={ this._onChange }>{ moduleName }</SwipeExchange>
				</View>
				{ this._renderActionButton( moduleName ) }
			</View>
		);
	}
}

const _styles = {
	wrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "flex-end"
	},
	container: {
		height: sizes.footerHeight,
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.secondBackgroundColor
	},
	actionButtonOffset: {
		bottom: sizes.footerHeight + sizes.margin,
		right: sizes.margin
	}
};

export default mapCurrentLanguage(FooterContent);