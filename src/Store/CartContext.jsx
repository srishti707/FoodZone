
import { createContext, useReducer } from 'react'
const CartContext =createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
});
function cartReducer(state,action){
    if(action.type==='ADD_ITEM'){
       //update the state to add a new item 
       //existingItemindex is the index of the item alredy present in the cart.
            const existingItemIndex=state.items.findIndex((item)=> item.id===action.item.id);

                const updatedItems=[...state.items];

            
                if(existingItemIndex> -1){
                    const existingItem=state.items[existingItemIndex];
                    const updatedItem={
                        ...existingItem,
                        quantity:existingItem.quantity + 1,
                    };
                    updatedItems[existingItemIndex]=updatedItem;
                }
                else{
                   updatedItems.push({...action.item,quantity:1});
                }
                return {...state,items:updatedItems};
    }
    if(action.type==='REMOVE_ITEM'){
        //...remove the item from the state
     const existingItemIndex=state.items.findIndex((item)=>item.id===action.id);

            const existingItem=state.items[existingItemIndex];   
                 const updatedItems=[...state.items];

            if(existingItem.quantity===1){
              updatedItems.splice(existingItemIndex,1);
            }
            else{
                const updatedItem={
                    ...existingItem,
                    quantity:existingItem.quantity-1,
                };
                updatedItems[existingItemIndex]=updatedItem;
            
            }
    
    return {...state,items:updatedItems};//useReducer returns updatedstate.
        }
        return state;
}//cart is state

export function CartContextProvider({children}){
   const [cart,dispatchCartAction]= useReducer(cartReducer,{items:[]});

  
   function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item})
   }
   function removeItem(id){
    dispatchCartAction({type:'REMOVE_ITEM',id});
   }
   const CtContext={
    items: cart.items,
    addItem:addItem,
    removeItem:removeItem
   };
   console.log(CartContext);
    return (
<CartContext.Provider value={CtContext}>{children}</CartContext.Provider>
    ) ;
    
}
export default CartContext;