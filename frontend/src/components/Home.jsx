import { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";

const Home = () => {
  const [listingList, setListingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListingList = () => {
    AxiosInstance.get("listings/")
      .then((res) => {
        setListingList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getListingList();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading listings...</p>;

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {listingList.map((listing) => (
        <div
          key={listing.id}
          className="border p-4 rounded shadow hover:shadow-lg transition duration-300"
        >
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-semibold">{listing.title}</h2>
          <p className="text-gray-700 text-sm">{listing.description}</p>
          <p className="text-green-600 font-bold mt-1">
            ₹{listing.price_per_night} / night
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {listing.address}, {listing.city}, {listing.state},{" "}
            {listing.country}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Available: {listing.available_from} to {listing.available_to}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
