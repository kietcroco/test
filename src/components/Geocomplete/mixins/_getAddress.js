/**
 * @todo: Hàm lấy địa chỉ từ rowData để hiển thị
 * @author: Croco
 * @since: 15-3-2017
 * @param: rowData: object dữ liệu place
 * @return: string
*/
export default function (rowData: Object) {

	return rowData.description || rowData.formatted_address || rowData.name;
};