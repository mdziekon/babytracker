import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './bootstrap/App.tsx';

// Note: Does not matter here
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
