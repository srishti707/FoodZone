import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import {UserProgressContextProvider} from './Store/UserProgressContext';
import { CartContextProvider } from './Store/CartContext';
import Checkout from "./components/UI/Checkout";
function App() {
  return (
    <UserProgressContextProvider>
         <CartContextProvider>
    <Header/>
    <Meals/>
    <Cart/>
    <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
 
  );
}

export default App;
