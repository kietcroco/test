import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, DatePickerIOS, Modal, TouchableOpacity } from 'react-native';
import { colors, sizes, fontSizes, hitSlop, scale } from '~/configs/styles';
import { translate } from '~/utilities/language';

class DatePicker extends React.Component {

	static displayName = '@DatePicker';

	static propTypes = {
		visible: PropTypes.bool, // ẩn hiện
		date: PropTypes.instanceOf(Date).isRequired, // value
		minDate: PropTypes.instanceOf(Date), // giá trị nhỏ nhất
		maxDate: PropTypes.instanceOf(Date), // giá trị lớn nhất
		// androidMode: PropTypes.oneOf([ // loại lịch hiển thị trên android
		// 	"calendar",
		// 	"spinner",
		// 	"default"
		// ]),
		mode: PropTypes.oneOf([ // loại input
			"date",
			"time",
			"datetime"
		]),
		onDateChange: PropTypes.func.isRequired, // sự kiện change
		onCancel: PropTypes.func.isRequired, // sự kiện huỷ
		onError: PropTypes.func.isRequired // sự kiện lỗi
	};

	static defaultProps = {
		visible: false,
		date: new Date(),
		//minDate: new Date(),
		//androidMode: "default",
		mode: "date"
	};

	constructor( props ) {
		super( props );

		this.state ={
			currentDate: props.date
		};
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.visible !== nextProps.visible && nextProps.visible ) {

			this.setState({
				currentDate: nextProps.date
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.currentDate !== nextState.currentDate ||
			this.props.visible !== nextProps.visible ||
			this.props.minDate !== nextProps.minDate ||
			this.props.maxDate !== nextProps.maxDate ||
			this.props.mode !== nextProps.mode
		);
	}

	render() {

		const { visible, date, minDate, maxDate, mode, onDateChange, onCancel } = this.props;

		return (
			<Modal
				animationType 		= "slide"
				visible 			= { visible }
				onRequestClose 		= { () => {

					this.setState({
						currentDate: date
					});
					onCancel();
				} }
				transparent 		= { true }
			>
				<View style={ _styles.wrapper } pointerEvents="box-none">
					<TouchableOpacity onPress={ () => {

						this.setState({
							currentDate: date
						});
						onCancel();
					} } style={ _styles.backdrop } activeOpacity={ 1 }></TouchableOpacity>
					<View style={ _styles.container }>
						<View style={ _styles.navigation }>
							<TouchableOpacity onPress={ () => {

								this.setState({
									currentDate: date
								});
								onCancel();
							} } style={ _styles.button } hitSlop={ hitSlop }>
								<Text style={ _styles.label }>{ translate("Hủy") }</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={ () => onDateChange( this.state.currentDate ) } style={ _styles.button } hitSlop={ hitSlop }>
								<Text style={ _styles.label }>{ translate("Áp dụng") }</Text>
							</TouchableOpacity>
						</View>
						<DatePickerIOS
							date 		= { this.state.currentDate }
							minimumDate = { minDate }
							maximumDate = { maxDate }
							mode 		= { mode }
							onDateChange= { newDate => this.setState({
								currentDate: newDate
							}) }
						>
						</DatePickerIOS>
					</View>
				</View>
			</Modal>
		);
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	container: {
		width: "100%",
		height: 250,
		backgroundColor: colors.modalBackground
	},
	backdrop: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		//backgroundColor: colors.overlayColor
	},
	button: {
		height: sizes.buttonNormal,
		width: 60 * scale,
		justifyContent: "center",
		alignItems: "center"
	},
	label: {
		fontSize: fontSizes.normal
	},
	navigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: sizes.borderWidth,
		borderTopWidth: sizes.borderWidth,
		borderBottomColor: colors.primaryBorderColor,
		borderTopColor: colors.primaryBorderColor,
		paddingHorizontal: sizes.margin
	}
};

export default DatePicker;