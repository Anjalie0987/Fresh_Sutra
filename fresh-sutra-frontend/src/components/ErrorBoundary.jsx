import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiAlertTriangle className="text-red-500 text-2xl" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-500 mb-6 text-sm">
                            We're sorry, but the application encountered an unexpected error.
                        </p>

                        <details className="text-left bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 overflow-auto max-h-48">
                            <summary className="text-xs font-semibold text-gray-700 cursor-pointer mb-2">Error Details</summary>
                            <pre className="text-xs text-red-600 whitespace-pre-wrap font-mono">
                                {this.state.error && this.state.error.toString()}
                            </pre>
                        </details>

                        <button
                            onClick={() => window.location.reload()}
                            className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors w-full"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
