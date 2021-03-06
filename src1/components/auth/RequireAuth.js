import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class RequireAuth extends Component {
		componentWillMount() {
			if (!this.props.authenticated) {
				this.props.history.push('/signin');
			}
		}
		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.props.history.replace('/signin');
			}
		}
		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	// function mapStateToProps({ AuthenticationReducer }) { // get state object from header.js
	// 	return { AuthenticationReducer };
	// }
	const mapStateToProps = (state) => {
		const { authenticated } = state.auth;
		return { authenticated };
	}
	return connect(mapStateToProps)(RequireAuth); // we're now wrapping a higher-order component with another HOC
}
