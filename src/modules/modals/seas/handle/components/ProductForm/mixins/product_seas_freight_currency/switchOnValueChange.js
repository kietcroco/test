export default function onValueChange( checked: Boolean ) {

    this.setState({
        product_seas_freight_currency: {
            ...this.state.product_seas_freight_currency,
            value: checked ? "vnd" : "usd"
        }
    });
};