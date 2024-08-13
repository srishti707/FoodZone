import React from 'react'
import { useContext } from 'react'
import Modal from './UI/Modal'
import Button from './UI/Button'
import CartItem from './UI/CartItem'
import CartContext from '../Store/CartContext'
import { currencyFormatter } from '../utils/formatting'
import UserProgressContext from '../Store/UserProgressContext'

const Cart = () => {
  const cartCtx=useContext(CartContext);
  const userProgressCtx=useContext(UserProgressContext);

  const CartTotal=cartCtx.items.reduce(
    (totalPrice,item)=>totalPrice+item.quantity*item.price,0);

function handleCloseCart(){
  userProgressCtx.hideCart();
}
function handleGoToCheckout(){
 userProgressCtx.showCheckout();
}

  return (
    <Modal className="cart" open={userProgressCtx.progress==='cart'} onClose={handleCloseCart}>
    <h2>Your Cart</h2>
    <ul>
    {cartCtx.items.map(item=>
   <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
    onIncrease={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)} />)}
    </ul>
    <p className="cart-total">{currencyFormatter.format(CartTotal)}</p>
    <p className="modal-actions">
      <Button textOnly onClick={handleCloseCart}>Close</Button>
     {cartCtx.items.length>0  && (
      <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
     )}
    </p>
    </Modal>
  )
}

export default Cart
