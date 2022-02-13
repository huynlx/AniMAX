import { matchRoutes, Route, Routes, useLocation } from "react-router";
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes/Routes';

import './App.css';

const routeObj = routes.map(({ component: Component, path }) => ({
  caseSentitive: false,
  element: <Component />,
  path
}))

function App() {
  const location = useLocation();
  const matchedRoute = matchRoutes(routeObj, location)?.[0]; //mỗi lần chuyển route sẽ trả về 1 cái MatchedRoute

  return (
    <div className="App">
      <Header matchedRoute={matchedRoute} />
      <div className="px-4 py-20 lg:px-20 lg:py-24 lg:pb-0 min-h-screen">
        <Routes>
          {
            routes.map(({ path, component: Component }) => (
              <Route key={path} element={<Component />} path={path} />
            ))
          }
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
