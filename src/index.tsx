/**
 * @module src/index.tsx
 * @description Client Entry Point - Hang App off #root in index.html
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './client/App';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);
