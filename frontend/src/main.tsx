import React from 'react';
import ReactDOM from 'react-dom/client';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import App from './App';

import './styles/globals.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const {mockServer} = await import('./mock-server');

    return mockServer.start();
}

enableMocking().then(() =>
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    ),
);
