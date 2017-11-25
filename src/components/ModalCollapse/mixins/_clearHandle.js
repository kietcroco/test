import uncheckAll from '../utils/uncheckAll';
import autoCheck from '../utils/autoCheck';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';

export default function() {

	let dataSource = this._dataSource.slice();

	dataSource = uncheckAll( dataSource );
	dataSource = autoCheck( dataSource, [], this.props.multiple );

	if (this.props.multiple && !recursiveShallowEqual(dataSource, this._dataSource)) {

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(dataSource)
		});
		this._dataSource = dataSource;
		this._applyHandle();
		return;
	}

	this.setState({
		dataSource: this.state.dataSource.cloneWithRows( dataSource )
	});

	this._dataSource = dataSource;

	!this.props.multiple && this._applyHandle();
};