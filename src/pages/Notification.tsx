import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import FaceIcon from "@mui/icons-material/Face";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { mergedIncomingRequests } from "../redux/UserSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();
  const isNotificationNew = useSelector(
    (state: RootState) => state.Notification.setNotificationRead
  );
  const mergedIncomingRequestsList = useSelector(
    (state: RootState) => state.UserInfo.mergedIncomingRequestsList
  );

  useEffect(() => {
    dispatch(mergedIncomingRequests());
  }, []);
  console.log("mergedIncomingRequestsList", mergedIncomingRequestsList);

  const mutationAcceptFriendRequest = useMutation({
    mutationFn: async (requestId) => {
      return axios.post(
        `${URL}/acceptFriend`,
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      const { message } = response.data;
      console.log("message", message);
    },
  });
  const acceptFriend = (requestId: any) => {
    console.log("requestId", requestId);
    mutationAcceptFriendRequest.mutate(requestId, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <>
      {mutationAcceptFriendRequest.isPending && <Loading />}
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Box p="20px" minWidth="40vw">
            <Box mb={3} display="flex" flexDirection="column" gap={3}>
              <Typography fontWeight="800" fontSize="large">
                Notifications
              </Typography>
              <Typography fontWeight="600" fontSize="medium">
                New
              </Typography>
            </Box>
            {mergedIncomingRequestsList.length > 0 && (
              <Box>
                {mergedIncomingRequestsList.map((request) => (
                  <Box
                    key={request.requesterId}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#ededed",
                      },
                    }}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <FaceIcon sx={{ fontSize: "50px" }} />
                    <Box display="flex" gap={0} alignItems="center">
                      <Typography mr={1} fontWeight="bold">
                        {request.firstname} {request.lastname}
                      </Typography>
                      <Typography>added you as a friend</Typography>
                      <Typography
                        ml={1}
                        mr={1}
                        fontSize="small"
                        color="success"
                        // color="textSecondary"
                      >
                        7h
                      </Typography>
                      <FiberManualRecordIcon color="success" />
                      <Button
                        onClick={() => acceptFriend(request.requestId)}
                        sx={{ ml: "10px" }}
                        size="small"
                        variant="contained"
                      >
                        Accept
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Box>
              <Box
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#ededed",
                  },
                }}
                color="GrayText"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FaceIcon sx={{ fontSize: "50px" }} />
                <Box display="flex" gap={0}>
                  <Typography mr={1} fontWeight="bold">
                    Bengi Turer
                  </Typography>
                  <Typography>'s Birthday Today</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#ededed",
                  },
                }}
                color="GrayText"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FaceIcon sx={{ fontSize: "50px" }} />
                <Box display="flex" gap={0}>
                  <Typography mr={1} fontWeight="bold">
                    Bora Papila
                  </Typography>
                  <Typography>updated their's profile</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Notification;
