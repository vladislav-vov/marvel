import { Component } from 'react';
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundare extends Component {
    state = {
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundare;