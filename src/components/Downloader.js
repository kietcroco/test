"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { 
	Modal,
	View,
	Text
} from 'react-native';
import ProgressBar from '~/components/ProgressBar';
import { shadow, sizes, fontSizes, scale, colors } from '~/configs/styles';
import { translate } from '~/utilities/language';

class Downloader extends React.Component {

	static displayName = "Downloader";

	static propTypes = {
		current: PropTypes.number,
		total: PropTypes.number,
		visible: PropTypes.bool
	};

	static defaultProps = {
		current: 0,
		total: 0,
		visible: true
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.current !== nextProps.current ||
			this.props.total !== nextProps.total ||
			this.props.visible !== nextProps.visible
		);
	}

	render() {

		const {
			current,
			total,
			visible
		} = this.props;

		let state = `${translate("Đang tải xuống")}: ${current}/${total}`;
		if( !current || !total ) {

			state = translate("Đang kết nối");
		} else if( `${current}` == `${total}` ) {

			state = translate("Hoàn tất");
		}

		let progress = 0;

		if( current && total ) {

			progress = current / total;
		}

		return (
			<Modal
				animationType 		= "fade"
				transparent 		= { true }
				visible 			= { visible }
				onRequestClose 		= { blankHandle }
			>
				<View style={ _styles.downloaderWrapper }>
					<View style={ _styles.downloaderContainer }>
						<Text style={ _styles.downloaderText }>{ state }</Text>
						<ProgressBar 
							progress 		= { progress } 
							style 			= { _styles.processBar }
							color 			= { colors.primaryColor }
							borderWidth 	= { sizes.borderWidth }
							indeterminate 	= { progress <= 0 }
							height 			= { 20 * scale }
							borderRadius 	= { 4 * scale }
						>
							<Text style={ _styles.progressText }>{ `${progress * 100}%` }</Text>
						</ProgressBar>
					</View>
				</View>
			</Modal>
		)
	}
}

const blankHandle = () => {};

const _styles = {
	downloaderWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	downloaderContainer: {
		width: "80%",
		borderRadius: 10 * scale,
		borderWidth: 1 * scale,
		borderColor: colors.primaryBorderColor,
		paddingVertical: 30 * scale,
		paddingHorizontal: 5 * scale,
		backgroundColor: colors.primaryBackgroundColor,
		...shadow
	},
	processBar: {
		position: "relative",
		marginTop: 5 * scale
	},
	progressText: {
		position: "absolute",
		alignSelf: "center",
		fontSize: fontSizes.normal,
		color: colors.normalColor,
		backgroundColor: "transparent"
	},
	downloaderText: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default Downloader;