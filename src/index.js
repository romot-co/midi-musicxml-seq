import React from 'react';
import ReactDOM from 'react-dom/client';
import 'scss/index.scss';
import 'remixicon/fonts/remixicon.css';
import App from './App';
// Viteではサービスワーカー実装が異なるため、必要に応じて別途設定

// React 18の新しいルートAPIを使用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
