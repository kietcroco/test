import rivers from './seas';

const data = JSON.parse( JSON.stringify( rivers ) );
data.shift();

for( let key in data ) {

	if( 
		data[ key ] && 
		data[ key ].children && 
		data[ key ].children.length
	) {

		// bỏ chọn tất cả và auto check
		if( data[ key ].children[ 0 ] ) {

			//data[ key ].children[ 0 ].isSelectAll = false;
			//data[ key ].children[ 0 ].autoCheck = false;
			data[ key ].children.splice(0,1);
		}

		// thêm field other vào tin cuối
		if( data[ key ].children[ data[ key ].children.length - 1 ] ) {

			data[ key ].children[ data[ key ].children.length - 1 ].isOther = true;
		}
	}
}

data.push({
	"label": "#$seas$#Các cảng khác trên thế giới",
	"value": "Other port on the world",
	"isOther": true
});

export default data;