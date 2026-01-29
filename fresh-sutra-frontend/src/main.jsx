import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

console.log("Starting App Initialization...");

try {
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error("Root element not found");

    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    console.log("App successfully mounted to root.");
} catch (error) {
    console.error("CRITICAL: App failed to mount.", error);
    document.body.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; margin: 20px; border-radius: 5px;">
            <h1 style="margin: 0 0 10px;">Critical Application Error</h1>
            <p style="margin: 0 0 10px;">The application failed to start.</p>
            <pre style="background: white; padding: 10px; border: 1px solid #ccc; overflow: auto;">${error.message}\n\n${error.stack}</pre>
        </div>
    `;
}
