import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary Caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Algo salió mal: {this.state.error.message}</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;