"use strict";
import { namespace } from '../constants';
import { itemPerPage } from '~/configs/application';
import { translate } from '~/utilities/language';
import getServiceByExchange from '../utilities/getServiceByExchange';
import _ from 'lodash';

const defaultOptions = {
	Exchange: "",
	type: ""
};

// key reducer
const key = `/rivers${namespace}`;

var request = null; // deferred ajax
var currentPage = 0; // trang hiện tại
var nextPage = 1; // trang tiếp theo
var prevData = []; // dữ liệu đã load trước đó


// hàm huỷ request
const abort = () => {

	if (request) {

		request.abort();
		request = null;
	}
};


// lọc dữ liệu bị trùng với trang trước
const filterDuplicate = ( data: Array = [], type = "nextPage" ) => {

	if( type === "init" ) {

		prevData = [];
	} else if( data.length ){

		data = _.differenceBy( data, prevData, "id" );
		data = _.filter(data, item => (typeof item === "object") );
	}

	if( data.length ) {

		prevData = data;
	}
	
	return data;
};

export default {

	// load dữ liệu
	fetchData(options: Object = defaultOptions, type = "nextPage") {
		
		// nếu là init
		if (type === "init") {

			currentPage = 0; // set lại trang đầu
			nextPage = 1
		}

		// fix options
		options = {
			"item-per-page": itemPerPage, // số phần tử/ trang
			page: nextPage, // số trang cần load
			...options,
		};

		// có phải dữ liệu tìm
		var isSearch = !!options.type;

		// nếu là trang cuối
		if( currentPage == nextPage ) {

			return dispatch => {

				// thông báo hết dữ liệu
				dispatch({
					type: `${key}#message`,
					payload: {
						listMessage: "endPage",
						type,
						page: currentPage,
						isSearch
					}
				});

				//tắt thông báo
				setTimeout(() => dispatch({
					type: `${key}#message`,
					payload: {
						listMessage: "",
						type,
						page: currentPage,
						isSearch
					}
				}), 3000);
			};
		}

		// swich service
		const service = getServiceByExchange("RIVERS", options.Exchange || "");

		// huỷ ajax trước
		abort();

		return async dispatch => {

			// loading
			dispatch({
				type: `${key}#message`,
				payload: {
					listMessage: "loading",
					type,
					page: nextPage,
					isSearch
				}
			});

			try {

				// tạo ajax
				request = service.get(options);

				// chờ kết quả từ server
				const response = await request;
				//request = null;

				// nếu success
				if (response.status === 200) {

					if( response.data.STATUS !== "ERROR" ) {

						let resultData = filterDuplicate( response.data.data || [], type );

						currentPage = nextPage; // cộng page lên page tiếp theo

						// nếu số phần tử trên trang <= số phần tử load dc thì tăng số trang
						if (
							resultData.length &&
							(type === "init" || resultData.length >= itemPerPage)
						) {

							nextPage++;
						}

						// thông báo
						let messageData = {
							messageTitle: null,
							message: null,
							messageType: null,
							messageHandle: null
						};

						// nếu là warning thì set lại thông báo
						if (response.data.STATUS === "WARNING") {

							messageData = {
								messageTitle: response.data.messageTitle || translate("Cảnh báo"),
								message: response.data.message || translate("Lỗi không xác định"),
								messageType: "WARNING",
								messageHandle: () => {
									dispatch({
										type: `${key}#alert`,
										payload: {
											messageTitle: null,
											message: null,
											messageType: null,
											messageHandle: null,
											isSearch
										}
									});
								}
							};
						}

						// trả kết quả
						dispatch({
							type: `${key}#result`,
							payload: {
								...messageData,
								data: resultData,
								type,
								page: currentPage,
								isSearch
							}
						});

						// nếu là init
						if ( type !== "init" && !resultData.length ) {

							// thông báo hết dữ liệu
							dispatch({
								type: `${key}#message`,
								payload: {
									listMessage: "endPage",
									type,
									page: currentPage,
									isSearch
								}
							});

							//tắt thông báo
							setTimeout(() => dispatch({
								type: `${key}#message`,
								payload: {
									listMessage: "",
									type,
									page: currentPage,
									isSearch
								}
							}), 3000);
						}

						return;
					}
				}
				
				dispatch({
					type: `${key}#alert`,
					payload: {
						messageTitle: "Error",
						message: translate("Lỗi kết nối"),
						messageType: "ERROR",
						messageHandle: () => {
							dispatch({
								type: `${key}#alert`,
								payload: {
									messageTitle: null,
									message: null,
									messageType: null,
									messageHandle: null,
									isSearch
								}
							});
						},
						isSearch
					}
				});

			} catch (e) {

				if (!(request && request.isCancel(e))) {

					dispatch({
						type: `${key}#alert`,
						payload: {
							messageTitle: "Error",
							message: translate("Lỗi kết nối"),
							messageType: "ERROR",
							messageHandle: () => {
								dispatch({
									type: `${key}#alert`,
									payload: {
										messageTitle: null,
										message: null,
										messageType: null,
										messageHandle: null
									}
								});
							},
							isSearch
						}
					});
				}
			}

			request = null; // done request
		}
	},

	abort
};