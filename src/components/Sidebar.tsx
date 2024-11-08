import {
  Box,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { TypographyButton } from "../styles/SharedStyles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllNotifications } from "../redux/NotificationSlice";
import { fetchUsersInfo, mergedIncomingRequests } from "../redux/UserSlice";
import { setLeftSidebarOpen } from "../redux/PostFeedSlice";

function Sidebar() {
  const theme = useTheme();
  const leftSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.leftSidebarOpen
  );
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");
  const myUserId = localStorage.getItem("myUserId");
  const mergedIncomingRequestsList = useSelector(
    (state: RootState) => state.UserInfo.mergedIncomingRequestsList
  );

  const allUsersInfo = useSelector(
    (state: RootState) => state.UserInfo.allUsers
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(mergedIncomingRequests());
    dispatch(fetchAllNotifications());
    dispatch(fetchUsersInfo());

    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
      {!isPhoneScreen && (
        <CardContent
          sx={{
            height: "%100",
            width: "25%",
            minWidth: "25%",
            backgroundColor: "#F6F6F6",
            padding: "50px 0 0 0",
            margin: "0",
            minHeight: "80vh",
          }}
        >
          {allUsersInfo.map((user) => (
            <Box key={user._id}>
              {user._id === myUserId ? (
                <Typography
                  padding="20px 0 30px 30px"
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    navigate(`/profile/${myUserId}`);
                  }}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: "#0043B7",
                      backgroundColor: "#ededed",
                    },
                    lineHeight: "0.7",
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
              ) : null}
            </Box>
          ))}
          <TypographyButton onClick={() => navigate("/")}>
            <FeedIcon sx={{ marginRight: "5px" }} /> Home
          </TypographyButton>
          <TypographyButton onClick={() => navigate(`/profile/${myUserId}`)}>
            <Person2Icon sx={{ marginRight: "5px" }} /> Profile
          </TypographyButton>
          {mergedIncomingRequestsList.length < 1 ? (
            <TypographyButton onClick={() => navigate("/notification")}>
              <NotificationsNoneIcon sx={{ marginRight: "5px" }} /> Notification
            </TypographyButton>
          ) : (
            <TypographyButton onClick={() => navigate("/notification")}>
              <NotificationsActiveIcon sx={{ marginRight: "5px" }} />
              Notification
            </TypographyButton>
          )}

          <TypographyButton
            onClick={() => {
              localStorage.removeItem("myUserId");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <LogoutIcon sx={{ marginRight: "5px" }} /> Logout
          </TypographyButton>
        </CardContent>
      )}
      {leftSidebarOpen && (
        <Box
          display="block"
          position="fixed"
          top={50}
          left={0}
          height="50vh"
          width="50vw"
          p={2}
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            overflowY: "auto",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "80%",
              // minWidth: "25%",
              backgroundColor: "#F6F6F6",
              padding: "50px 0 0 0",
              margin: "0",
              // minHeight: "80vh",
            }}
          >
            {allUsersInfo.map((user) => (
              <Box key={user._id}>
                {user._id === myUserId ? (
                  <Typography
                    padding="20px 0 30px 30px"
                    fontWeight="fontWeightBold"
                    onClick={() => {
                      navigate(`/profile/${myUserId}`);
                      dispatch(setLeftSidebarOpen(false));
                    }}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        color: "#0043B7",
                        backgroundColor: "#ededed",
                      },
                      lineHeight: "0.7",
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                ) : null}
              </Box>
            ))}
            <TypographyButton
              onClick={() => {
                navigate("/");
                dispatch(setLeftSidebarOpen(false));
              }}
            >
              <FeedIcon sx={{ marginRight: "5px" }} /> Home
            </TypographyButton>
            <TypographyButton
              onClick={() => {
                dispatch(setLeftSidebarOpen(false));
                navigate(`/profile/${myUserId}`);
              }}
            >
              <Person2Icon sx={{ marginRight: "5px" }} /> Profile
            </TypographyButton>
            {mergedIncomingRequestsList.length < 1 ? (
              <TypographyButton
                onClick={() => {
                  dispatch(setLeftSidebarOpen(false));
                  navigate("/notification");
                }}
              >
                <NotificationsNoneIcon sx={{ marginRight: "5px" }} />{" "}
                Notification
              </TypographyButton>
            ) : (
              <TypographyButton
                onClick={() => {
                  dispatch(setLeftSidebarOpen(false));
                  navigate("/notification");
                }}
              >
                <NotificationsActiveIcon sx={{ marginRight: "5px" }} />
                Notification
              </TypographyButton>
            )}

            <TypographyButton
              onClick={() => {
                localStorage.removeItem("myUserId");
                localStorage.removeItem("token");
                dispatch(setLeftSidebarOpen(false));
                navigate("/login");
              }}
            >
              <LogoutIcon sx={{ marginRight: "5px" }} /> Logout
            </TypographyButton>
          </CardContent>
        </Box>
      )}
    </>
  );
}

export default Sidebar;
