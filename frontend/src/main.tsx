import React from 'react';
import ReactDOM from 'react-dom/client';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import App from './app/App';

import './styles/globals.scss';
import {ENABLE_MOCK} from './config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
    if (!ENABLE_MOCK) {
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
