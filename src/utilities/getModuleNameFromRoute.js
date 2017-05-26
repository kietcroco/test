export default ( { routeName = "" }, defaultName: String = "rivers" ) => {

	const moduleName = routeName.split("/")[2] || "";

	if( moduleName !== "rivers" && moduleName !== "roads" && moduleName !== "seas" ) {

		return defaultName;
	}
	return moduleName;
};