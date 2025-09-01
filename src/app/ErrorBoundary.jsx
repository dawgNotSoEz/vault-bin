import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong.</h2>
            <p className="text-gray-300 mb-6">
              We're sorry, but an unexpected error occurred. Please try again.
            </p>
            <details className="text-sm text-gray-400 text-left bg-gray-700 p-4 rounded-lg overflow-auto max-h-48 mb-6">
              <summary className="cursor-pointer text-red-300">Error Details</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
