import { useContext } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import CartContext from "../../Store/CartContext";
import { currencyFormatter } from "../../utils/formatting";
import UserProgressContext from "../../Store/UserProgressContext";
import { useHttp } from "../../hook/useHttp";

const option = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};
export default function Checkout() {
  const { loading, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    option
  );

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const CartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          item: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(CartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="e-mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="">
          <Input label="postalCode" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
