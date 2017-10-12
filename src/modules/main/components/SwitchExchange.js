"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, View, Modal, Image } from 'react-native';
import IzifixIcon from 'izifix-icon';
import { sizes, colors, hitSlop, scale } from '~/configs/styles';
import { translate, setCurrentLanguage } from '~/utilities/language';
import mapCurrentLanguageToProps from '~/utilities/mapCurrentLanguageToProps';
import Registry from '~/library/Registry';

// import roadsBackground from '~/assets/images/roads-background.jpg';
// import riversBackground from '~/assets/images/rivers-background.jpg';
// import seasBackground from '~/assets/images/seas-background.jpg';

import langEng from '~/assets/images/en.jpg';
import langVi from '~/assets/images/vi.jpg';

const roadsBackground = {
	uri: "https://izifix.com/images/roads-background.jpg"
};

const riversBackground = {
	uri: "https://izifix.com/images/rivers-background.jpg"
};

const seasBackground = {
	uri: "https://izifix.com/images/seas-background.jpg"
};


class SwitchExchange extends React.Component {

	static displayName = "SwitchExchange";

	static propTypes = {
		navigation: PropTypes.object
	};

	constructor( props ) {
		super( props );

		this.state = {
			modalVisible: false,
			firstUse: false
		};
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			this.props.currentLanguage !== nextProps.currentLanguage ||
			this.state.modalVisible !== nextState.modalVisible ||
			this.state.firstUse !== nextState.firstUse
		);
	}

	render() {

		const { navigation } = this.props;

		return (
			<View>
				<TouchableOpacity onPress={ () => this.setState({modalVisible: true}) } activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={ _styles.container }>
					<IzifixIcon name="switch-exchange" style={ _styles.icon }/>
				</TouchableOpacity>
				<Modal
					visible 			= { this.state.modalVisible }
					animationType 		= "slide"
					onRequestClose 		= { () => {

						if( !this.state.firstUse ) {

							this.setState({modalVisible: false});
						}
					} }
				>
					<View style={ _styles.containerChoose }>
						<TouchableOpacity activeOpacity={ colors.activeOpacity } style={ _styles.containerChoose } onPress={ () => {

							this.setState({
								modalVisible: false,
								firstUse: false
							});
							navigation.navigate('/roads/list');
							Registry.set("exchange", "roads");
						} }>
							<Image source={ roadsBackground } style={ _styles.backgroundChoose }/>
							<Text style={ [_styles.labelExchange, _styles.labelExchangeRight] }>{ translate("#$seas$#Đường bộ") }</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={ colors.activeOpacity } style={_styles.containerChoose} onPress={ () => {

							this.setState({
								modalVisible: false,
								firstUse: false
							});
							navigation.navigate('/rivers/list');
							Registry.set("exchange", "rivers");
						} }>
							<Image source={ riversBackground } style={_styles.backgroundChoose}/>
							<Text style={ _styles.labelExchange }>{ translate("#$seas$#Đường sông") }</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={ colors.activeOpacity } style={_styles.containerChoose} onPress={ () => {

							this.setState({
								modalVisible: false,
								firstUse: false
							});
							navigation.navigate('/seas/list');
							Registry.set("exchange", "seas");
						} }>
							<Image source={ seasBackground } style={_styles.backgroundChoose}/>
							<View style={ [_styles.labelExchangeContainer, _styles.labelExchangeRight] }>
								<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={ _styles.labelExchangeRow } onPress={ () => {

									this.setState({
										modalVisible: false,
										firstUse: false
									});
									setCurrentLanguage("vi");
									navigation.navigate('/seas/list');
									Registry.set("exchange", "seas");
								} }>
									<Image source={ langVi } style={ _styles.flagImage }/>
									<Text style={ _styles.labelExchangeSeas }>{ "Đường biển" }</Text>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={ _styles.labelExchangeRow } onPress={ () => {

									this.setState({
										modalVisible: false,
										firstUse: false
									});
									setCurrentLanguage("en");
									navigation.navigate('/seas/list');
									Registry.set("exchange", "seas");
								} }>
									<Image source={ langEng } style={ _styles.flagImage }/>
									<Text style={ _styles.labelExchangeSeas }>{ "Sea transport" }</Text>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		)
	}

	componentDidMount() {

		if( !Registry.get("exchange") ) {

			this.setState({
				firstUse: true,
				modalVisible: true
			});
		}
	}
}

const _styles = {
	container: {
		width: sizes.buttonNormal,
		height: sizes.buttonNormal,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 2.5 * scale
	},
	icon: {
		color: colors.secondColor,
		fontSize: 25 * scale
	},

	containerChoose: {
		flex: 1,
		position: "relative",
		justifyContent: "center"
	},
	backgroundChoose: {
		flex: 1,
		//resizeMode: "stretch"
		resizeMode: "cover"
	},
	labelExchange: {
		color: colors.secondColor,
		fontSize: 25 * scale,
		fontWeight: "bold",
		position: "absolute",
		margin: sizes.margin,
		backgroundColor: "transparent"
	},
	labelExchangeRight: {
		alignSelf: "flex-end",
		right: sizes.margin
	},
	labelExchangeContainer: {
		position: "absolute",
		margin: sizes.margin
	},
	labelExchangeSeas: {
		color: colors.secondColor,
		fontSize: 25 * scale,
		fontWeight: "bold",
		backgroundColor: "transparent"
	},
	labelExchangeRow: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		margin: sizes.margin
	},
	flagImage: {
		width: 25 * scale,
		height: 25 * scale,
		resizeMode: "contain",
		marginRight: sizes.margin
	}
};

export default mapCurrentLanguageToProps(SwitchExchange);