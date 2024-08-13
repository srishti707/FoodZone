
import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import UserProgressContext from '../Store/UserProgressContext';
const Header = () => {

  const cartCtx= useContext(CartContext);

 const userProgressCtx= useContext(UserProgressContext);

  const totalCartItems=cartCtx.items.reduce((totalNumberofItems,item)=>{
return totalNumberofItems+item.quantity;
  },0);

  function handleShowCart(){
   userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
         <div id="title">
      <img src={logoImg} alt="A restaurant"/>
      <h1>ReactFood</h1>

    </div>
    <nav>
        <Button  onClick={handleShowCart} textOnly={true}>Cart({totalCartItems})</Button>
    </nav>
    </header>
   
  )
}

export default Header
