import { Box } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import MyButtons from "./forms/MyButtons";
import MyPassFields from "./forms/MyPassFields";
import MyTextField from "./forms/MyTextField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstence from "./AxiosInstance";
import MyMessage from "./Message";

function PasswordResetRequest() {


    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const [showMessage, setShowMessage] = useState(false);

    const submission = (data) => {
      AxiosInstence.post(`api/password_reset/`, {
        email: data.email,
      })
        .then((response) => {
          setShowMessage(true)
        })
    };
  
    return (
      <form onSubmit={handleSubmit(submission)}>
            <div className={"myBackground"}>
                {showMessage ? <MyMessage text={"If your email exists you received an email with intructions for resetting the password"} /> : null
                }
          <Box className={"whiteBox"}>
            <Box className={"itemBox"}>
              <Box className={"title"}>Request Reset Password</Box>
            </Box>
            <Box className={"itemBox"}>
              <MyTextField label={"Email"} name={"email"} control={control} />
            </Box>
            <Box className={"itemBox"}>
              <MyButtons label={"Request Password reset"} type={"submit"} />
            </Box>
            <Box className={"itemBox"} sx={{ flexDirection: "column" }}></Box>
          </Box>
        </div>
      </form>
    );
}

export default PasswordResetRequest;
