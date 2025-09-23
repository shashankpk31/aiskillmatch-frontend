import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store/store';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/common/Loader';
import AppRoutes from './routes';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
            <Toaster position="top-right" />
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;