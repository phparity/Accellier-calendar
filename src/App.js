"use client";
import PageRoutes from "./navigation/PageRoutes"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from './config/Authentications/AuthContext';
import { DataProvider } from "./service/DataContex";
// import ErrorBoundary from "./ErrorBoundary";

import './App.css';



function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
function App() {

  const logError = (error, info) => {
    console.log(error, info, 'onError');
    // Do something with the error, e.g. log to an external API
  };

  return (
        <AuthProvider>
          <DataProvider>
            <PageRoutes />
          </DataProvider>
        </AuthProvider>
  );
}

export default App;
