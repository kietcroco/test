
const stringToRegx = ( str ) => {

	let match = str.match(new RegExp('^/(.*?)/([gimy]*)$'));
	if( match && match.length == 3 ) {

		return new RegExp(match[1], match[2]);
	}
	return null;
};

// hàm chuyển route cho các trang list
const getActionList = ( url ) => {

	// khởi tạo route
	var routeName = "/";
	var params = {
		Exchange: "",
		type: ""
	};
	var data = {};

	// check sàn
	switch( true ) {
		case (/duong-song/.test(url)):

			routeName = "/rivers/list";
			data = require('~/data/category/rivers.json');
			break;
		case (/duong-bo/.test(url)):

			routeName = "/roads/list";
			data = require('~/data/category/roads.json');
			break;
		case (/duong-bien|sea-transport/.test(url)):

			routeName = "/seas/list";
			data = require('~/data/category/seas.json');
			break;

		case false:
		default: // nếu không đúng sàn nào
			return null;
	}

	findParam:
		for ( let prop in data ) { // duyệt sàn con
			
			if( prop && data[ prop ] && data[ prop ]['category'] ) {

				let category = data[ prop ]['category'];

				// duyệt trong config param category
				for (let i = category.length - 1; i >= 0; i--) {
					
					// nếu có config regex
					if( category[i] && category[i].regex ) {

						// match url
						let regex = stringToRegx( category[i].regex );

						// nếu đúng url gán lại param và break khỏi 2 for
						if( regex && regex.test( url ) ) {

							params = category[i].params;
							break findParam;
						}
					}
				}
			}
		}
	
	// payload
	return {
		routeName,
		params
	};
};

// hàm chuyển route các trang chi tiết
const getActionDetailAndHandle = ( url ) => {

	const getPayload = ( data ) => {
		for ( let routeName in data ) { // duyệt sàn con
		
			// match url
			let regex = stringToRegx( data[ routeName ] );

			// nếu đúng url trả về payload
			if( regex && regex.test( url ) ) {

				let match = url.match( regex );
				if( match && match.length == 2 ) {

					return {
						routeName,
						params: {
							id: match[1]
						}
					};
				}
			}
		}
		return null;
	};

	return (
		getPayload( require('~/data/routes/rivers.json') )
		|| getPayload( require('~/data/routes/roads.json') )
		|| getPayload( require('~/data/routes/seas.json') )
	);
};

// hàm chuyển route cho các trang thành viên
const getActionMember = ( url ) => {

	const data = require('~/data/routes/member.json');
	for ( let routeName in data ) { // duyệt sàn con
		
		// match url
		let regex = stringToRegx( data[ routeName ] );

		// nếu đúng url trả về payload
		if( regex && regex.test( url ) ) {

			let payload = {
				routeName
			};
			let match = url.match( regex );
			if( match && match.length == 2 ) {

				payload.params = {
					id: match[1]
				};
			}
			return payload;
		}
	}

	return null;
};

const getNavigateActionFromUrl = ( url ) => {

	url = url.toLowerCase();
	return getActionDetailAndHandle( url ) || getActionMember( url ) || getActionList( url ) || null;
};

export default getNavigateActionFromUrl;