import { Box, CardContent, Typography } from "@mui/material";
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

function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");
  const myUserId = localStorage.getItem("myUserId");
  const mergedIncomingRequestsList = useSelector(
    (state: RootState) => state.UserInfo.mergedIncomingRequestsList
  );

  const activeButton = useSelector(
    (state: RootState) => state.Sidebar.setActiveButton
  );

  const allUsersInfo = useSelector(
    (state: RootState) => state.UserInfo.allUsers
  );

  const navigate = useNavigate();

  console.log("activeButton", activeButton);
  console.log("mergedIncomingRequestsList", mergedIncomingRequestsList);
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
    </>
  );
}

export default Sidebar;
