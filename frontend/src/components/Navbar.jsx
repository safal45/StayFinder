import React from 'react'
import { Link } from 'react-router-dom'


function Navbar(props) {
     const { content } = props;
    return (
      <>
    <div className="h-14 flex items-center bg-gray-50 border-sm shadow-md justify-between">
      <div className="">
        <h1 className="text-3xl ml-9">
          <Link to={"/home"}>Stay Finder</Link>
        </h1>
        {/* <h2 className=" ml-10 text-sm">Enjoy the Service, Own the World</h2> */}
      </div>
      <div className="flex items-center w-auto  mr-6">
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/home"}>
            <a className="mr-5  ">Home</a>
          </Link>
        </div>
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/cart"}>
            <a className="mr-5">My Bookings</a>
          </Link>
        </div>
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/contactus"}>
            <a className="mr-5">ContactUs</a>
          </Link>
        </div>
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/user/profile"}>
            <a className="mr-5">My Profile</a>
          </Link>
        </div>
      </div>
            </div>
            <div>
                <h2>{content}</h2>
            </div>
            </>
  );
}

export default Navbar
