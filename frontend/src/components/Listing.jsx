import { useState } from "react";
import AxiosInstance from "./AxiosInstance";

const Listing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price_per_night: "",
    address: "",
    city: "",
    state: "",
    country: "",
    available_from: "",
    available_to: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await AxiosInstance.post("/listings/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Listing created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(
        "Error creating listing:",
        err.response?.data || err.message
      );
      alert("Failed to create listing.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 border rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="number"
        name="price_per_night"
        placeholder="Price per night"
        value={formData.price_per_night}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="date"
        name="available_from"
        value={formData.available_from}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="date"
        name="available_to"
        value={formData.available_to}
        onChange={handleChange}
        className="input mb-2"
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="input mb-4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Listing
      </button>
    </form>
  );
};

export default Listing;
