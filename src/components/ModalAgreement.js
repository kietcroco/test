"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, WebView } from 'react-native';
import { translate } from '~/utilities/language';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { shadow, sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class ModalAgreement extends React.Component {

	static displayName = "ModalAgreement";

	static propTypes = {
		onRequestClose: PropTypes.func.isRequired,
		visible: PropTypes.bool,
		onAgree: PropTypes.func,
		source: PropTypes.object.isRequired
	};

	static defaultProps = {
		visible: false
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.visible !== nextProps.visible ||
			this.props.source != nextProps.source
		);
	}

	render() {

		const { onRequestClose, visible, onAgree, source } = this.props;

		return (
			<Modal
				animationType       = "fade"
				transparent 		= { true }
				onRequestClose 		= { onRequestClose }
				visible 			= { visible }
			>
				<TouchableOpacity hitSlop={ hitSlop } style={ _styles.backdrop } onPress={ e => onRequestClose(e) }/>
				<View style={ _styles.wrapper } pointerEvents="box-none">
					<View style={ _styles.container }>
						<WebView
							source 				= { source }
							style 				= { _styles.webView }
							startInLoadingState = { true }	
						>
						</WebView>
						<View style={ _styles.footer }>
							{
								!!onAgree &&
									<TouchableOpacity hitSlop={ hitSlop } style={ _styles.btnOK } onPress={ e => onAgree(e) }>
										<Text style={ _styles.icon }>{ translate("Đồng ý") }</Text>
									</TouchableOpacity>
							}
							<TouchableOpacity hitSlop={ hitSlop } style={ _styles.btnClose } onPress={ e => onRequestClose(e) }>
								<FAIcon name="times" style={ _styles.icon }/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		backgroundColor: colors.overlayColor,
		marginTop: sizes.headerHeight,
		padding: sizes.margin
	},
	backdrop: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	container: {
		flex: 1,
		backgroundColor: "white",
		borderRadius: sizes.borderRadius,
		...shadow
	},
	footer: {
		flexDirection: 'row',
		justifyContent: "flex-end",
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		padding: sizes.margin,
		alignItems: "center"
	},
	btnOK: {
		width: 60 * scale,
		height: sizes.buttonNormal,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		borderRadius: sizes.borderRadius,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: sizes.spacing
	},
	btnClose: {
		width: 40 * scale,
		height: sizes.buttonNormal,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		borderRadius: sizes.borderRadius,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: sizes.spacing
	},
	webView: {
		flex: 1
	},
	icon: {
		fontSize: fontSizes.normal,
		color: colors.boldColor
	}
};

export default ModalAgreement;