import { useRouteError, Link } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError();

    console.error("Route Error:", error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong.</h1>
            <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try refreshing the page.</p>

            {/* Safe Error Display */}
            <div className="text-sm bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 mb-6 max-w-lg mx-auto">
                {error?.statusText || error?.message || "Unknown error occurred"}
            </div>

            <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
                Refresh Page
            </button>

            <div className="mt-4">
                <Link to="/" className="text-gray-500 hover:text-gray-700 underline text-sm">Go to Home</Link>
            </div>
        </div>
    );
}
