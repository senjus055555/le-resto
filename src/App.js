import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurentListScreen from './screens/RestaurentListScreen';
import MenuListScreen from './screens/MenuListScreen';
import CartScreen from './screens/CartScreen';
import SuccessScreen from './screens/SuccessScreen';
import CancelScreen from './screens/CancelScreen';
import CookLoginScreen from './screens/CookLoginScreen';
import OrderUpdationScreen from './screens/OrderUpdationScreen';
import InventoryScreen from './screens/InventoryScreen';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' Component={SplashScreen} />
          <Route path='/login' Component={LoginScreen} />
          <Route path='/signup' Component={SignupScreen} />
          <Route path='/home' Component={HomeScreen} />
          <Route path='/restaurents' Component={RestaurentListScreen} />
          <Route path='/menu/:id' Component={MenuListScreen} />
          <Route path='/cart' Component={CartScreen} />
          <Route path='/cancel' Component={CancelScreen} />
          <Route path='/success' Component={SuccessScreen} />
          <Route path='/cookLogin' Component={CookLoginScreen} /> 
          <Route path='/orders' Component={OrderUpdationScreen} />
          <Route path='/inventory' Component={InventoryScreen} />
      </Routes>
    </Router>
  );
}

export default App;
