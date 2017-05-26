/**
 * @todo: Hàm gửi request lấy gợi ý của google
 * @author: Croco
 * @since: 14-3-2017
 * @param: url: api, success: callback success, error: callback error
*/
export default function( url: String, success: Function, error: Function ) {
	
	// nếu chưa có cache thì khởi tạo
	if( !this._cache ) {

		this._cache = {};
	}

	// nếu có cache gọi callback
	if( this._cache[url] !== undefined ) {

		success( this._cache[url] );
		return;
	}

	// tạo request mới
	const request = new XMLHttpRequest();

	// thêm vào danh sách đợi
	this._requests.push(request);

	if( this.props.timeout ) {

		request.timeout = this.props.timeout;
	}

	request.ontimeout = this.props.onTimeout;

	// khi thay đổi trạng thái
	request.onreadystatechange = () => {

		// nếu chưa sẵn sàng
		if (request.readyState !== 4) {

			return;
		}

		// nếu thành công
		if (request.status === 200) {

			if( success ) {

				// lưu cache
				this._cache[ url ] = JSON.parse( request.responseText || null );

				// gọi callback trả về
				let responseJSON = JSON.parse(request.responseText || null );
				success( responseJSON );
			}
		}
		else {

			error && error( request );
		}
	};

	// mở request
	request.open('GET', url);

	// gán header
	request.setRequestHeader('Accept', 'application/json');
	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.setRequestHeader('X-Alt-Referer', 'https://izifix.com');
	request.setRequestHeader("Referer", "https://izifix.com");
	request.setRequestHeader("Content-Type","text/plain");

	// gửi ajax
	request.send();

	return request;
};