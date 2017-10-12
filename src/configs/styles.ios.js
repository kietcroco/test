import { PixelRatio, Dimensions } from 'react-native';

// màu
const colors = {
	primaryBackgroundColor: "white", // màu background chủ đạo (đen)
	primaryColor: "#2672ba", // màu chủ đạo (xanh header)
	secondBackgroundColor: "#f5f3f4", // màu background chủ đạo thay thế (xám footer)
	secondColor: "white", // màu chữ khi có background (trắng)
	modalBackground: "#f0f3fb", // màu nền các modal
	italicColor: "#c8c8ca" ,//"#c5c5c5", // màu chữ nhạt (xám mờ)
	boldColor: "#1e1e1e", //"#4e4e4e", // màu chữ in đậm (đen)
	activeColor: "#fd8c08", // màu khi được active (vàng cam nút đăng tin)
	focusColor: "#ff0000", // màu khi focus (đỏ swipe chọn sàn)
	primaryBorderColor: "#e5e5e5", // màu border (xám)
	secondBorderColor: "white",
	highlightColor: "#f71818", // màu chữ nỗi bật (đỏ giá)
	normalColor: "#2d2d2d", //"#979797", // màu chữ bình thường
	titleColor: "#2979bd", // màu chữ tiêu đề, icon (xanh)
	refreshColor: ["#2672ba", "gray"], // màu component refresh
	loadingColor: "gray", // màu loading
	checkedColor: "#0DFF92", // màu icon checked (xanh)
	placeholderColor: "#e2e2e2", // màu placeholder (xám)
	//endFillColor: "rgba(38, 114, 186, 0.5)", // màu khi scroll hết dữ liệu (xanh)
	errorColor: "#a94442", // màu khi error (đỏ)
	warningColor: "#8a6d3b", // màu khi warning (vàng tím)
	successColor: "#3c763d", // màu khi success (xanh)
	backgroundSuccess: "#cde69c", // màu nền khi success
	backgroundWarning: "#ffe5ab", // màu nền khi warning
	backgroundError: "#FBD8DB", // màu nền khi error
	infoColor: "gray", // màu thông báo (xám)
	required: "red", // màu * required (đỏ)
	disableColor: "#eee", // màu khi disable (xám)
	buttonDisableColor: "#dfdfdf", // màu button khi disable (xám)
	buttonDisableColorBorderColor: "#d8d8d8", // màu border button khi disable (xám)
	overlayColor: "rgba(0, 0, 0, 0.5)", // màu background backdrop (đen)
	activeOpacity: 0.5, // touch opacity
	actionButtonBackgroundColor: "#a57395", // màu action button (tím)
	codeBackground: "#f5f3f4", // màu background mã tin (xám)
	buttonMoreColor: "#aaa9aa", // màu nút xem thêm (xám)
	buttonMoreBorder: "#a0a0a0", // màu border nút xem thêm (xám đậm)
	descriptionBackground: "#FCFFC9", // màu nền ticket thông báo (vàng)
	buttonSubmitColor: "#337ab7", // màu button submit (xanh)
	buttonSubmitBorder: "#2e6da4" // màu border submit (xanh đậm)
};

// https://stackoverflow.com/questions/34837342/font-size-on-iphone-6s-plus
// https://github.com/react-native-training/react-native-elements/pull/68/commits/002c3c35b44675706fdde12b5db0c4265d85f0a6
// http://dpi.lv/
// https://facebook.github.io/react-native/docs/pixelratio.html
var scale = 1;

// c1:
//const pixelRatio = PixelRatio.get();
//const deviceHeight = Dimensions.get('window').height;

// if (deviceHeight === 667) {

// 	scale = 1.2;
// } else if (deviceHeight === 736) {

// 	scale = 1.4;
// } else if (pixelRatio != 2) {

// 	scale = 1.15;
// }

// c2:
// if(PixelRatio.get() != 2) {
// 	scale = 1.15;
// } 

// c3:
// const getScale = () => {

// 	const pixelRatio = PixelRatio.get();
// 	const deviceHeight = Dimensions.get('window').height;
// 	const deviceWidth = Dimensions.get('window').width;

// 	switch (pixelRatio) {

// 		case 2:
// 			// iphone 5s and older Androids
// 			if (deviceWidth < 360) {

// 				return 0.95;
// 			}
			
// 			// iphone 5
// 			if (deviceHeight < 667) { 

// 				return 1;
// 			} 

// 			// iphone 6-6s
// 			if (deviceHeight >= 667 && deviceHeight <= 735) { 
			
// 				return 1.15;
// 			}

// 			// older phablets
// 			return 1.25;

// 		case 3:

// 			// catch Android font scaling on small machines
// 			// where pixel ratio / font scale ratio => 3:3
// 			if (deviceWidth <= 360) {

// 				return 1;
// 			} 
			
// 			 // Catch other weird android width sizings
// 			if (deviceHeight < 667) {

// 				return 1.15;
// 			}

// 			// catch in-between size Androids and scale font up
// 			// a tad but not too much
// 			if (deviceHeight >= 667 && deviceHeight <= 735) {

// 				return 1.2;
// 			}

// 			// catch larger devices
// 			// ie iphone 6s plus / 7 plus / mi note 等等
// 			return 1.27;

// 		case 3.5:

// 			// catch Android font scaling on small machines
// 			// where pixel ratio / font scale ratio => 3:3
// 			if (deviceWidth <= 360) {

// 				return 1;
// 			}
			
// 			// Catch other smaller android height sizings
// 			if (deviceHeight < 667) {

// 				return 1.20;
// 			}

// 			// catch in-between size Androids and scale font up
// 			// a tad but not too much
// 			if (deviceHeight >= 667 && deviceHeight <= 735) {

// 				return 1.25;
// 			}

// 				// catch larger phablet devices
// 			return 1.40;

// 		default:
// 			return 1;
// 	}
// };
// scale = getScale();

//scale = 1;

// fontSize
const fontSizes = {
	small: 12 * scale,
	normal: 14 * scale,
	large: 16 * scale
};

const sizes = {
	margin: 10 * scale, // lề ngoài
	padding: 10 * scale, // lề trong
	spacing: 5 * scale, // khoảng cách
	titleSpacing: 10 * scale, // khoảng cách giữa tiêu đề và nội dung
	footerHeight: 45 * scale, // chiều cao footer
	headerHeight: 40 * scale, // chiều cao header
	borderWidth: 0.5 * scale, // border width
	actionButton: 45 * scale, // đường kính action button
	actionButtonRadius: 22.5 * scale, // borderRadius
	borderRadius: 5 * scale, // bo gốc
	buttonNormal: 30 * scale, // nút nhấn (icon)
	rowItemHeight: 36 * scale, // select row
	inputContactHeight: 20 * scale, // chiều cao input liên hệ
	submitButton: 35 * scale, // nút submit
	formPaddingBottom: 200 * scale // padding bottom cho form
};

const hitSlop = {
	top: 10 * scale,
	right: 20 * scale,
	bottom: 10 * scale,
	left: 20 * scale
};

// bóng đỗ
const shadow = {
	shadowOpacity: 0.2,
	shadowOffset: {
		width: 0,
		height: 1 * scale
	},
	shadowColor: '#2672ba',
	shadowRadius: 3 * scale,
	elevation: 3 * scale
};


export {
	colors,
	fontSizes,
	shadow,
	sizes,
	scale,
	hitSlop
};