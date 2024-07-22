import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './lib/store.js'
import Loading from './components/loading/index.jsx'
import './index.scss'
import 'number-brm'

const App = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Suspense fallback={<Loading key={'main.jsx'} />}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
  // </React.StrictMode>,
)
