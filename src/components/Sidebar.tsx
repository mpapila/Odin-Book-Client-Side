import { CardContent } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { setActiveButton } from "../redux/SideBarSlice";
import { TypographyButton } from "../styles/SharedStyles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Sidebar() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const myUserId = localStorage.getItem("myUserId");
  const notificationBar = useSelector(
    (state: RootState) => state.Sidebar.setNotificationBar
  );
  const activeButton = useSelector(
    (state: RootState) => state.Sidebar.setActiveButton
  );
  const handleButtonClick = (buttonId: string) => {
    dispatch(setActiveButton(buttonId));
  };

  const navigate = useNavigate();

  console.log("activeButton", activeButton);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  });

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
        <TypographyButton onClick={() => navigate("/")}>
          <FeedIcon sx={{ marginRight: "5px" }} /> Home
        </TypographyButton>
        <TypographyButton onClick={() => navigate("/profile")}>
          {/* Replace "1" with the user's actual ID when dynamic */}
          <Person2Icon sx={{ marginRight: "5px" }} /> Profile
        </TypographyButton>
        <TypographyButton onClick={() => navigate("/postpage")}>
          <Diversity3Icon sx={{ marginRight: "5px" }} /> Post Page
        </TypographyButton>
        {!notificationBar ? (
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
