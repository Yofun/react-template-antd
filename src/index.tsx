import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';

// css
import './styles/reset.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppRouter />);
