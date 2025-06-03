import React from "react";
import AxiosInstence from "../AxiosInstance";

const StripeCheckoutButton = ({ price, productId }) => {
 const handleCheckout = async () => {
   try {
     const response = await AxiosInstence.post("/api/cart/create-checkout-session/");
     if (response.data.url) {
       console.log("Stripe session res: ", res);
       window.location.href = response.data.url;
     }
   } catch (error) {
     console.error("Checkout error:", error);
   }
 };

  return (
    <button
      onClick={handleCheckout}
      style={{
        padding: "10px 20px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      Buy Now
    </button>
  );
};

export default StripeCheckoutButton;
