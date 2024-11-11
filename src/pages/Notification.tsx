import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import {
  fetchAllNotifications,
  setNotificationRead,
} from "../redux/NotificationSlice";
import { AllNotifications } from "../type";
import { setMyName } from "../redux/UserProfileSlice";

function Notification() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("myUserId");
  const allUsersInfo = useSelector(
    (state: RootState) => state.UserInfo.allUsers
  );
  const myName = useSelector((state: RootState) => state.UserProfile.myName);
  allUsersInfo.map((user) => {
    if (myUserId == user._id) {
      dispatch(setMyName(user.firstName));
    }
  });
  // console.log("myname", myName);
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  const allNotifications: AllNotifications = useSelector(
    (state: RootState) => state.Notification.allNotifications
  );

  console.log("birthday today", allNotifications.birthdaysToday);
  console.log("allNotifications", allNotifications);
  const mergedIncomingRequestsList = useSelector(
    (state: RootState) => state.UserInfo.mergedIncomingRequestsList
  );
  // console.log("allNotifications", allNotifications);

  useEffect(() => {
    dispatch(mergedIncomingRequests());
    dispatch(fetchAllNotifications());
  }, []);
  // console.log("mergedIncomingRequestsList", mergedIncomingRequestsList);

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
  const leftSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.leftSidebarOpen
  );
  const isComputerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const leftSidebar = isComputerScreen || isTabletScreen || leftSidebarOpen;

  return (
    <>
      {mutationAcceptFriendRequest.isPending && <Loading />}
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          {leftSidebar && <Sidebar />}
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
                {mergedIncomingRequestsList.map((request) => {
                  dispatch(setNotificationRead(true));
                  return (
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
                          onClick={() => {
                            dispatch(setNotificationRead(false));
                            acceptFriend(request.requestId);
                          }}
                          sx={{ ml: "10px" }}
                          size="small"
                          variant="contained"
                        >
                          Accept
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
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
                // color="GrayText"
                display="flex"
                alignItems="center"
                gap={1}
              >
                {allNotifications.birthdaysToday &&
                  allNotifications.birthdaysToday.map((notification, index) => (
                    <Box display="flex" alignItems="center" gap={1} key={index}>
                      <FaceIcon sx={{ fontSize: "50px" }} />
                      <Box>
                        {notification.firstName !== myName ? (
                          <Box display="flex" flexDirection="row">
                            <Typography fontWeight="bold">
                              {notification.firstName} {notification.lastName}
                            </Typography>
                            <Typography>'s Birthday Today</Typography>
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography>
                              Happy Birthday, {notification.firstName}{" "}
                              {notification.lastName}
                            </Typography>
                            <Typography fontSize="30px">🎉🎉</Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
              </Box>
              {allNotifications.notifications &&
                allNotifications.notifications.map((notification) => (
                  <Box
                    key={notification._id}
                    onClick={() => {
                      if (notification.postId) {
                        navigate(`/posts/${notification.postId}`);
                      }
                    }}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#ededed",
                      },
                    }}
                    // color="GrayText"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {allUsersInfo.map((user) => {
                      if (user._id == notification.userId) {
                        return user.profilePhoto.length === 0 ? (
                          <FaceIcon key={user._id} sx={{ fontSize: "50px" }} />
                        ) : (
                          <img
                            key={user._id}
                            src={user.profilePhoto}
                            alt="Profile"
                            width="40px"
                          />
                        );
                      }
                      return null;
                    })}

                    <Box display="flex" gap={0}>
                      <Typography>{notification.message}</Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Notification;
