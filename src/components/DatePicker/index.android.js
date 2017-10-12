import PropTypes from 'prop-types';
import React from 'react';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';

class DatePicker extends React.Component {

	static displayName = '@DatePicker';

	static propTypes = {
		visible: PropTypes.bool, // ẩn hiện
		date: PropTypes.instanceOf(Date).isRequired, // value
		minDate: PropTypes.instanceOf(Date), // giá trị nhỏ nhất
		maxDate: PropTypes.instanceOf(Date), // giá trị lớn nhất
		androidMode: PropTypes.oneOf([ // loại lịch hiển thị trên android
			"calendar",
			"spinner",
			"default"
		]),
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
		androidMode: "default",
		mode: "date"
	};

	constructor( props ) {
		super( props );

		this._generateOptions = this._generateOptions.bind(this);
		this.open = this.open.bind(this);
	}

	_generateOptions( props: Object, onError: Function ) {

		const date = !(props.date instanceof Date) ? new Date( props.date ) : props.date;
		const minDate = props.minDate && !(props.minDate instanceof Date) ? new Date( props.minDate ) : props.minDate;
		const maxDate = props.maxDate && !(props.maxDate instanceof Date) ? new Date( props.maxDate ) : props.maxDate;

		switch( "Invalid Date" ) {

			case `${date}`:
			case `${minDate}`:
			case `${maxDate}`:
				onError && onError( new Error("Invalid Date") );
				return;
		}

		return {
			date,
			minDate,
			maxDate,
			mode: props.androidMode
		};
	}

	async open( options: Object, onError: Function ) {

		try {

			var result;
			const date = options.date;
			const nowDate = new Date();
			switch( this.props.mode ) {

				// nếu lấy giờ
				case "time":

					// mở modal chọn giờ
					result = await TimePickerAndroid.open({
						hour: date.getHours(),
						minute: date.getMinutes(),
						is24Hour: true, // Will display '2 PM'
					});

					// nếu là chọn giờ
					if (result.action !== TimePickerAndroid.dismissedAction) {
						
						// trigger
						this.props.onDateChange && this.props.onDateChange( new Date( 
							nowDate.getFullYear(), 
							nowDate.getMonth(), 
							nowDate.getDay(),
							result.hour,
							result.minute,
							nowDate.getSeconds(),
							nowDate.getMilliseconds()
						) );
						return result;
					}
					break;

				// nếu là chọn ngày
				case "date":

					// mở modal lịch
					result = await DatePickerAndroid.open( options );

					// nếu có chọn
					if (result.action !== DatePickerAndroid.dismissedAction) {
					
						// trigger
						this.props.onDateChange && this.props.onDateChange( new Date( 
							result.year, 
							result.month, 
							result.day 
						) );

						return result;
					}
					break;

				// nếu chọn cả ngày và giờ
				case "datetime":

					// mở modal ngày
					result = await DatePickerAndroid.open( options );

					// nếu có chọn
					if (result.action !== DatePickerAndroid.dismissedAction) {
						
						// mở modal giờ
						var resultTime = await TimePickerAndroid.open({
							hour: date.getHours(),
							minute: date.getMinutes(),
							is24Hour: true, // Will display '2 PM'
						});

						// nếu có chọn
						if (resultTime.action !== TimePickerAndroid.dismissedAction) {

							// trigger
							this.props.onDateChange && this.props.onDateChange( new Date( 
								result.year, 
								result.month, 
								result.day,
								resultTime.hour,
								resultTime.minute,
								nowDate.getSeconds(),
								nowDate.getMilliseconds()
							) );

							return {
								year: result.year,
								month: result.month,
								day: result.month,
								hour: resultTime.hour,
								minute: resultTime.minute,
								second: nowDate.getSeconds(),
								milliSecond: nowDate.getMilliseconds()
							};
						}
					}

					break;
			}

			this.props.onCancel && this.props.onCancel();
		} catch (e) {

			//console.log(e)
			onError && onError(e);
		}

		return false;
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.visible !== nextProps.visible && nextProps.visible ) {

			var options = this._generateOptions( nextProps, nextProps.onError );

			this.open(options, nextProps.onError);
		}
	}

	render() {

		return null;
	}

	componentDidMount() {

		if( this.props.visible ) {

			var options = this._generateOptions( this.props, this.props.onError );

			this.open(options, this.props.onError);
		}
	}
}

export default DatePicker;