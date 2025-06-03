import React, { useEffect, useState } from "react";
import AxiosInstence from "./AxiosInstance";
import StripeCheckoutButton from "./forms/BuyNowButton";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await AxiosInstence.get("/cart-items/");
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p>Loading your cart...</p>;

  const totalCartValue = cartItems.reduce((total, item) => {
    return total + item.product.final_price * item.quantity;
  }, 0);

  

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <strong>{item.product.product_name}</strong> x {item.quantity} =
                ₹{(item.product.final_price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ₹{totalCartValue.toFixed(2)}</strong>
          </p>
          {/* <StripeCheckoutButton price={totalCartValue} productId={"1"} /> */}
        </>
      )}
    </div>
  );
}

export default Cart;
