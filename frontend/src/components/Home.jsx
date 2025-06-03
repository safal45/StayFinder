import { useEffect, useState } from "react";
import AxiosInstence from "./AxiosInstance";
import { loadStripe } from "@stripe/stripe-js";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // store quantity per product
  const stripePromise = loadStripe(
    "pk_test_51RB9wNPrLHWonlChV5HfCfrjyNuo6pCk1CHuvGpT9sZiYXrAYj7igCE1sjLc4vIhECYqWzd10yMwtJfwWiAYoXMK00zzrsfM00"
  );

  const getProductList = () => {
    AxiosInstence.get(`products/`)
      .then((res) => {
        setProductList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: parseInt(value) || 1,
    }));
  };

  // const handleAddToCart = async (productId) => {
  //   const quantity = quantities[productId] || 1;

  //   try {
  //     await AxiosInstence.post(`/cart-items/`, {
  //       product: productId,
  //       quantity: quantity,
  //     });
  //     alert("Added to cart!");
  //   } catch (error) {
  //     console.error("Failed to add to cart:", error);
  //     // console.log("Product ID:", product.id);
  //     alert("Failed to add to cart");
  //   }
  // };
  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1;

    try {
      const res = await AxiosInstence.post(`/cart-items/`, {
        product: productId,
        quantity: quantity,
      });
      console.log("Add to cart response:", res.data);
      alert("Added to cart!");
    } catch (error) {
      console.error(
        "Failed to add to cart:",
        error.response?.data || error.message
      );
      alert("Failed to add to cart");
    }
  };

const handleBuyNow = async (productId) => {
  try {
    const response = await AxiosInstence.post(
      `/products/${productId}/create-checkout-session/`
    );
    const sessionId = response.data.id;

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Stripe Checkout failed:", error);
    alert("Failed to initiate checkout.");
  }
};

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {productList.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition duration-300"
        >
          <img
            src={product.items_image}
            alt={product.product_name}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-semibold">{product.product_name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-600 font-bold">₹{product.price}</p>
          <p className="text-red-500">Discount: {product.discount}%</p>
          <p className="text-sm">Category: {product.category}</p>
          <p className="text-sm">Brand: {product.brand}</p>
          <p className="text-sm">In Stock: {product.in_stock ? "Yes" : "No"}</p>
          <p className="text-sm">Stock left: {product.stock}</p>
          <p className="text-sm">Rating: {product.rating} ⭐</p>
          <p className="text-sm">Reviews: {product.num_reviews}</p>
          <p className="text-xs text-gray-500">Seller ID: {product.seller}</p>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              min="1"
              className="w-16 px-2 py-1 border rounded"
              value={quantities[product.id] || 1}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
