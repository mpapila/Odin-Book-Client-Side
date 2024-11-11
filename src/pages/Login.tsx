import BookIcon from "/book.png";

import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ErrorDetail, LoginFormData } from "../type";
import { setErrorMessage } from "../redux/UserErrorSlice";
import Loading from "../components/LoadingSpinner";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}/login`;
  const demoToken = import.meta.env.VITE_DEMO_TOKEN;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(
    (state: RootState) => state.UserError.setErrorMessage
  );

  const mutation = useMutation({
    mutationFn: async (body: LoginFormData) => {
      return axios.post(URL, body, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (response) => {
      dispatch(setErrorMessage(null));
      const { token, myUserId } = response.data;
      console.log("myUserId", myUserId);
      localStorage.setItem("myUserId", myUserId);
      localStorage.setItem("token", token);
      navigate("/");
      console.log("message", token);
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorMessage(null));
        const errorMessage: ErrorDetail = e.response?.data?.errorMessage;
        console.error("Registration failed:", errorMessage);
        if (typeof errorMessage === "string") {
          dispatch(setErrorMessage(errorMessage));
        } else if (Array.isArray(errorMessage)) {
          const errorString = errorMessage.map((error) => error.msg).join(", ");
          // console.log("error string", errorString);
          dispatch(setErrorMessage(errorString));
        }
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body: LoginFormData = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    // console.log("body", body);
    mutation.mutate(body);
  };

  const handleDemoAccountClick = () => {
    localStorage.setItem("token", `${demoToken}`);
    localStorage.setItem("myUserId", "672e38dee53d439d9c06c5c1");
    navigate("/");
  };

  return (
    <>
      {mutation.isPending && <Loading />}
      <>
        <Container
          maxWidth="sm"
          className="full-background"
          sx={{
            backgroundColor: "#F6F6F6",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 0,
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box
              component="img"
              src={BookIcon}
              alt="Book Icon"
              width="60px"
              // height="60px"
            ></Box>
            <Typography ml={3} fontSize="30px">
              Odin Book
            </Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 8,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            {error && (
              <>
                <Typography component="h1" color="red" variant="body1">
                  {error}
                </Typography>
              </>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Log In
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={handleDemoAccountClick}
              >
                Try a Demo Account
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="text"
                sx={{ textDecoration: "underline", textTransform: "none" }}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "auto",
              // backgroundColor: "#202C33",
              // color: "#fff",
              textAlign: "center",
              py: 2,
            }}
          >
            <Typography variant="body2">Mehmet Papila &copy; 2024</Typography>
          </Box>
        </Container>
      </>
    </>
  );
}

export default Login;
