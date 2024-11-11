import BookIcon from "/book.png";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ErrorDetail, RegisterFormData } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../redux/UserErrorSlice";
import { RootState } from "../redux/Store";
import Loading from "../components/LoadingSpinner";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Register() {
  const error = useSelector(
    (state: RootState) => state.UserError.setErrorMessage
  );
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const URL = `${apiUrl}/register`;

  const mutation = useMutation({
    mutationFn: async (body: RegisterFormData) => {
      return axios.post(URL, body, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (response) => {
      const { message } = response.data;
      console.log(message);
      dispatch(setErrorMessage(null));
      navigate("/login");
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
    const body: RegisterFormData = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
      dateOfBirth: data.get("dateOfBirth") as string,
    };
    console.log("body", body);
    mutation.mutate(body);
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
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {error && (
              <>
                <Typography component="h1" color="red" variant="body1">
                  {error}
                </Typography>
              </>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="dateOfBirth "
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={mutation.isPending}
              >
                Sign Up
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                sx={{ textDecoration: "underline", textTransform: "none" }}
              >
                Already have an account? Sign in
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "auto",
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

export default Register;
