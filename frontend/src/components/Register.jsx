import { Box } from '@mui/material'
import React from 'react'
import '../App.css'
import MyButtons from './forms/MyButtons'
import MyPassFields from './forms/MyPassFields'
import MyTextField from './forms/MyTextField'
import { data, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstence from './AxiosInstance'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import MyDateField from './forms/MyDateField'



function Register() {
  const navigate = useNavigate()
  const{handleSubmit,control} = useForm()

  const submission = (data) => {
    AxiosInstence.post(`register/`, {
      username: data.username,
      email: data.email,
      birthday: data.birthday,
      password: data.password,
      phone_no: data.phone_no,
      alternate_phone_no: data.alternate_phone_no,
      address: data.address,
      zip_code: data.zip_code,
      city: data.city,
      country: data.country
    }).then(() => {
      navigate(`/`);
    });
  }
  return (
    <>
      <Nav />
      <div className=" h-100vh flex items-center justify-center mt-8">
        <form onSubmit={handleSubmit(submission)}>
          <Box className='h-auto w-full border-2 grid grid-cols-2'>
            <Box className={"itemBox"}>
              <Box className="text-3xl text-blue-500 text-center">Register</Box>
            </Box>
            <hr/>
            <Box className={"itemBox"}>
              <MyTextField
                label={"Username"}
                name={"username"}
                control={control}
              />
            </Box>
            <Box className={"itemBox"}>
              <MyTextField label={"Email"} name={"email"} control={control} />
            </Box>
            {/* <Box className={"itemBox"}> */}
            {/* <MyTextField
                label={"Date of Birth"}
                name={"birthday"}
                control={control}
              /> */}
            <Box className={"itemBox"}>
              <MyDateField
                name={"birthday"}
                label={"Date of Birth"}
                control={control}
              />
            </Box>
            {/* </Box> */}
            <Box className={"itemBox"}>
              <MyPassFields
                label={"Password"}
                name={"password"}
                control={control}
              />
            </Box>
            {/* <Box className={"itemBox"}>
              <MyPassFields
                label={" Confirm Password"}
                name={"password2"}
                control={control}
              />
            </Box> */}
            <Box className={"itemBox"}>
              <MyTextField
                label={"Phone No."}
                name={"phone_no"}
                control={control}
              />
            </Box>
            <Box className={"itemBox"}>
              <MyTextField
                label={"Alternate Phone No. "}
                name={"alternate_phone_no"}
                control={control}
              />
            </Box>{" "}
            <Box className={"itemBox"}>
              <MyTextField
                label={"Address"}
                name={"address"}
                control={control}
              />
            </Box>
            <Box className={"itemBox"}>
              <MyTextField
                label={"Area PIN Code"}
                name={"zip_code"}
                control={control}
              />
            </Box>
            <Box className={"itemBox"}>
              <MyTextField label={"City"} name={"city"} control={control} />
            </Box>
            <Box className={"itemBox"}>
              <MyTextField
                label={"Country"}
                name={"country"}
                control={control}
              />
            </Box>
            {/* <Box className={"itemBox"}>
              <FormControlLabel
                control={<Checkbox defaultUnChecked />}
                label={"Are you Seller???"}
                name={is_seller}
              />
            </Box> */}
            <Box className={"itemBox"}>
              <MyButtons label={"Register"} type={"submit"} />
            </Box>
            <Box className={"itemBox"}>
              Already have an Account??
              <Link to={"/"}>
                <bold>Login</bold>
              </Link>{" "}
            </Box>
          </Box>
        </form>
      </div>
    </>
  );
}

export default Register