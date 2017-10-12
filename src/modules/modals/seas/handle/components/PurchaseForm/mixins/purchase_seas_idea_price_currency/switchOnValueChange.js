export default function onValueChange( checked: Boolean ) {

    this.setState({
        purchase_seas_idea_price_currency: {
            ...this.state.purchase_seas_idea_price_currency,
            value: checked ? "vnd" : "usd"
        }
    });
};