import React from 'react'
import { Link } from 'react-router-dom'


function Nav() {
  return (
    <div className="h-14 flex items-center bg-cream-400 justify-between">
      <div className="">
        <h1 className="text-3xl ml-9">
          <Link to={"/home"} className='text-red-700'>Stay Finder</Link>
        </h1>
        {/* <h2 className=" ml-10 text-sm">Enjoy the Service, Own the World</h2> */}
      </div>
      <div className="flex items-center w-auto  mr-6">
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/"}>
            <a className="mr-5  ">Sign In</a>
          </Link>
        </div>
        <div className="w-auto h-9 flex justify-center items-center ">
          <Link to={"/register"}>
            <a className="mr-5">Get Started</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav
