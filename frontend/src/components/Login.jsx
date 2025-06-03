import { Box } from '@mui/material'
import React from 'react'
import '../App.css'
import MyButtons from './forms/MyButtons'
import MyPassFields from './forms/MyPassFields'
import MyTextField from './forms/MyTextField'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstence from './AxiosInstance'
import Nav from './Nav'



function Login() {

  const navigate = useNavigate()
  const { handleSubmit, control } = useForm()
  
   const submission = (data) => {
     AxiosInstence.post(`login/`, {
       email: data.email,
       password: data.password,
     }).then((response) => {
       console.log(response)
        localStorage.setItem('Token',response.data.token)
        navigate(`/home`);
     }).catch((error) => {
       console.error('Error during login',error)
     })
   };
  
  return (
    <>
      <Nav/>
    <form onSubmit={handleSubmit(submission)}>
      <div className={"myBackground"}>
        <Box className={"whiteBox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>LOG IN </Box>
          </Box>
          <Box className={"itemBox"}>
            <MyTextField label={"Email"} name={"email"} control={control} />
          </Box>
          <Box className={"itemBox"}>
            <MyPassFields
              label={"Password"}
              name={"password"}
              control={control}
            />
          </Box>
          <Box className={"itemBox"}>
            <MyButtons label={"Login"} type={"submit"} />
          </Box>
          <Box className={"itemBox"} sx={{flexDirection:'column'}}>
            <Link to={"/register"}>
              Need an Account??<bold>Register</bold>
            </Link>
            <Link to={"/request/password_reset"}>
              <bold>Password forgotten? Click Here</bold>
            </Link>
          </Box>
        </Box>
      </div>
      </form>
      </>
  );
}

export default Login