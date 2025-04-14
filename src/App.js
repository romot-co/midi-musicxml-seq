import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

//import MidiUploadPage from 'pages/MidiUploadPage';
import MidiEditPage from 'pages/MidiEditPage';

const AppRoutes = () => {
  // Viteでの環境変数の参照はimport.meta.env
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || '';

  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        {/* <Route path="/" element={<MidiUploadPage />} /> */}
        <Route path="/" element={<MidiEditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <main className="main">
          <AppRoutes />
        </main>
      </div>
    </HelmetProvider>
  );
}

export default App;
