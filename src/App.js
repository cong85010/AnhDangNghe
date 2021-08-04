import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/styles/styles.scss'
const Home = React.lazy(() => import('./components/Features/Home/index'))
function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
    <BrowserRouter>
      <Switch>
            <Route path='/' component={Home} />
            <Route  />
      </Switch>
    </BrowserRouter>
    </Suspense>

  );
}

export default App;
