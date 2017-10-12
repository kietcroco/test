import ReducerRegistry from '~/library/ReducerRegistry';
import { namespace } from '../constants';
import { itemPerPage } from '~/configs/application';

const key = `/seas${ namespace }`;
const initialState = {
	refreshing: true, // trạng thái refresh
	messageTitle: null, // tiêu đề thông báo
	message: null, // nội dung thông báo
	messageType: null, // loại thông báo [WARNING, ERROR]
	messageHandle: null, // handle nhấn OK
	data: [], // dữ liệu
	type: "init", // kiểu load trang [init, nextPage]
	page: 0, // số trang
	isSearch: false // đang tìm kiếm
};

export default ReducerRegistry.register( key, ( state = initialState, action ) => {

	switch ( action.type ) {

		// xử lý thông báo lỗi
		case `${key}#message`: 

			var data = state.data;
			var refreshing = false;

			// loại bỏ dòng thông báo ở dưới cùng
			if( typeof data[ data.length - 1 ] === "string" ) { 

				data.splice(data.length - 1, 1);
			}

			// // nếu là init thì reset source
			// if( action.payload.type === "init" ) {
			// 	data = [];
			// } else if( typeof data[ data.length - 1 ] === "string" ) { // loại bỏ dòng thông báo ở dưới cùng

			// 	data.splice(data.length - 1, 1);
			// }

			// loading ở init thì hiển thị refreshing
			if( action.payload.listMessage === "loading" && action.payload.type === "init" ) {

				refreshing = true;
				data = [];
			} else if( action.payload.listMessage ){

				data.push( action.payload.listMessage );
			}

			return {
				...state,
				refreshing,
				messageTitle: null, // tiêu đề thông báo
				message: null, // nội dung thông báo
				messageType: null, // loại thông báo [WARNING, ERROR]
				messageHandle: null, // handle nhấn OK
				data
			};

		// xử lý kết quả trả về
		case `${key}#result`: 

			var resultData = Array.isArray(action.payload.data) ? action.payload.data : [];
			var data = state.data;
			var isSearch = action.payload.isSearch;

			// loại bỏ dòng thông báo ở dưới cùng
			if( typeof data[ data.length - 1 ] === "string" ) {

				data.splice(data.length - 1, 1);
			}

			// nếu không phải là init thì cộng dồn mảng data
			if( action.payload.type !== "init" ) {

				//var listMessage = [];

				// // loại bỏ dòng thông báo ở dưới cùng
				// if( typeof state.data[ state.data.length - 1 ] === "string" ) {

				// 	listMessage = state.data.splice(state.data.length - 1, 1);
				// }
				if( resultData.length ) {

					data = [...data, ...resultData];//, ...listMessage];
				}
			} else {

				data = resultData;
			}

			if( !data.length ) {

				if( isSearch ) {

					data.push("notFound");
				} else {

					data.push("empty");
				}
			}

			return {
				...state,
				refreshing: false,
				messageTitle: action.payload.messageTitle,
				message: action.payload.message,
				messageType: action.payload.messageType,
				messageHandle: action.payload.messageHandle,
				data,
				type: action.payload.type,
				page: action.payload.page,
				isSearch
			};

		// xử lý thông báo lỗi
		case `${key}#alert`: 

			var data = state.data;

			// loại bỏ dòng thông báo ở dưới cùng
			if( typeof data[ data.length - 1 ] === "string" ) {

				data.splice(data.length - 1, 1);
			}

			if( !data.length ) {

				var isSearch = state.isSearch;
				if( isSearch ) {

					data.push("notFound");
				} else {

					data.push("empty");
				}
			}

			return {
				...state,
				refreshing: false,
				messageTitle: action.payload.messageTitle,
				message: action.payload.message,
				messageType: action.payload.messageType,
				messageHandle: action.payload.messageHandle,
				data
			};

		case `${key}#newOffers`: 

			var data = state.data;

			// dữ liệu tin mới
			if( action.payload.data ) {

				var newOffers = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];
				newOffers = newOffers.filter( item => ( item && typeof item === "object" && item.id && item.exchanges ) );

				// loại bỏ dòng thông báo ở dưới cùng
				if( typeof data[ data.length - 1 ] === "string" ) {

					data.splice(data.length - 1, 1);
				}

				if( newOffers.length ) {

					data = [...newOffers, ...data];
				}

				if( !data.length ) {

					var isSearch = state.isSearch;
					if( isSearch ) {

						data.push("notFound");
					} else {

						data.push("empty");
					}
				}
			}

			return {
				...state,
				refreshing: false, // trạng thái refresh
				messageTitle: null, // tiêu đề thông báo
				message: null, // nội dung thông báo
				messageType: null, // loại thông báo [WARNING, ERROR]
				messageHandle: null, // handle nhấn OK
				data
			};
			
		case `${key}#update`: 

			var data = state.data;

			if( action.payload.data ) {

				// dữ liệu tin mới
				//var data = state.data.slice();

				// loại bỏ dòng thông báo ở dưới cùng
				if( typeof data[ data.length - 1 ] === "string" ) {

					data.splice(data.length - 1, 1);
				}

				let foundIndex = state.data.findIndex( item => item && item.id === action.payload.data.id );
				
				if( foundIndex !== -1 ) {

					data[ foundIndex ] = action.payload.data;
				}

				if( !data.length ) {

					var isSearch = state.isSearch;
					if( isSearch ) {

						data.push("notFound");
					} else {

						data.push("empty");
					}
				}
			}

			return {
				...state,
				refreshing: false, // trạng thái refresh
				messageTitle: null, // tiêu đề thông báo
				message: null, // nội dung thông báo
				messageType: null, // loại thông báo [WARNING, ERROR]
				messageHandle: null, // handle nhấn OK
				data
			};

		case `${key}#remove`: 

			// dữ liệu tin mới
			var data = state.data;
			var type = state.type;
			var page = state.page;

			if( action.payload.id ) {

				//data = data.slice();
				// loại bỏ dòng thông báo ở dưới cùng
				if( typeof data[ data.length - 1 ] === "string" ) {

					data.splice(data.length - 1, 1);
				}

				let foundIndex = data.findIndex( item => (item && item.id === action.payload.id) );
				if( foundIndex !== -1 ) {

					data.splice(foundIndex, 1);
				}

				if( !data.length ) {

					var isSearch = state.isSearch;
					if( isSearch ) {

						data.push("notFound");
					} else {

						data.push("empty");
					}
				}
			}

			// reset
			if( data.length <= itemPerPage ) {

				type = "init";
				page = 1;
			}

			return {
				...state,
				refreshing: false, // trạng thái refresh
				messageTitle: null, // tiêu đề thông báo
				message: null, // nội dung thông báo
				messageType: null, // loại thông báo [WARNING, ERROR]
				messageHandle: null, // handle nhấn OK
				type,
				page,
				data
			};
	}

	return state;
}, true );