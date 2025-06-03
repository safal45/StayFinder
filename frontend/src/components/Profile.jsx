import React, { useEffect, useState } from "react";
import AxiosInstence from "./AxiosInstance";
import { Box } from "@mui/material";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = () => {
    AxiosInstence.get(`users/profile/`) // ✅ only logged-in user's data
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <Box sx={{ p: 2, m: 2, boxShadow: 3 }}>
          <div>ID: {userData.id}</div>
          <div>Username: {userData.username}</div>
          <div>Email: {userData.email}</div>
          <div>Date of Birth: {userData.birthday}</div>
          <div>Address: {userData.address}</div>
          <div>City: {userData.city}</div>
          <div>Phone No: {userData.phone_no}</div>
          {/* aur bhi fields jo serializer me ho */}
        </Box>
      ) : (
        <p>User not found or not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
