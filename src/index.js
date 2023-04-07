import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0264bc86f3fe4d77b57eab4426b1e5d8@o4504972902334464.ingest.sentry.io/4504972905480192",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);

