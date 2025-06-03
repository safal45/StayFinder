import { Box } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import MyButtons from "./forms/MyButtons";
import MyPassFields from "./forms/MyPassFields";
import MyTextField from "./forms/MyTextField";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstence from "./AxiosInstance";
import MyMessage from "./Message";

function PasswordReset() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);

  const { token } = useParams();
  console.log(token)

  const submission = (data) => {
    console.log("Submitting password reset with token:", token);
    AxiosInstence.post(`api/password-reset/confirm/`, {
      password: data.password,
      token: token,
    })
      .then((response) => {
        console.log("Response from password reset:", response);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log("Error in password reset:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <div className={"myBackground"}>
        {showMessage ? (
          <MyMessage text={"Your password reset was succesfull!!!!! You will be redirected to login page"} />
        ) : null}
        <Box className={"whiteBox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Reset Password</Box>
          </Box>
          <Box className={"itemBox"}>
            <MyPassFields
              label={"Password"}
              name={"password"}
              control={control}
            />{" "}
          </Box>
          <Box className={"itemBox"}>
            <MyPassFields
              label={"Confirm Password"}
              name={"password2"}
              control={control}
            />{" "}
          </Box>
          <Box className={"itemBox"}>
            <MyButtons label={" Reset Password"} type={"submit"} />
          </Box>
          <Box className={"itemBox"} sx={{ flexDirection: "column" }}></Box>
        </Box>
      </div>
    </form>
  );
}

export default PasswordReset;
