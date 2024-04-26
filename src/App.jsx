import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarContainer from './components/NavbarContainer';
import ItemListContainer from './components/ItemListContainer';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavbarContainer />
        <Switch>
          <Route path="/categoria/:category" component={ItemListContainer} />
          <Route path="/" exact component={ItemListContainer} />
        </Switch>
      </Router>
    </CartProvider>
  );
};

export default App;
