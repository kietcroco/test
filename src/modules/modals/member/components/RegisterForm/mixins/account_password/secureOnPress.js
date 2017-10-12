export default function onPress() {

    this.setState({
        account_password: {
            ...this.state.account_password,
            secureTextEntry: !this.state.account_password.secureTextEntry
        }
    });
};