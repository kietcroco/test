export default function onValueChange( checked: Boolean ) {

    this.setState({
        purchase_seas_total_me_power_unit: {
            ...this.state.purchase_seas_total_me_power_unit,
            value: checked ? "kw" : "bhp"
        }
    });
};