import { CardContent, Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import BookIcon from "/book.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { setActiveButton } from "../redux/SideBarSlice";
import { TypographyButton } from "../styles/SharedStyles";

function Sidebar() {
  const dispatch = useDispatch();
  const notificationBar = useSelector(
    (state: RootState) => state.Sidebar.setNotificationBar
  );
  const activeButton = useSelector(
    (state: RootState) => state.Sidebar.setActiveButton
  );
  const handleButtonClick = (buttonId: string) => {
    dispatch(setActiveButton(buttonId));
  };

  console.log("activeButton", activeButton);

  return (
    <>
      <CardContent
        sx={{
          height: "%100",
          width: "25%",
          backgroundColor: "#F6F6F6",
          padding: "0",
          margin: "0",
        }}
      >
        <Typography
          display="flex"
          color="#0D66FF"
          borderBottom="1px white solid"
          padding="5% 0 10% 2%"
          variant="h5"
          margin="2px 0 0 4%"
        >
          <img height="50px" src={BookIcon}></img>
          odinbook
        </Typography>
        <TypographyButton onClick={() => handleButtonClick("home")}>
          <FeedIcon sx={{ marginRight: "5px" }} /> Home
        </TypographyButton>
        <TypographyButton onClick={() => handleButtonClick("profile")}>
          <Person2Icon sx={{ marginRight: "5px" }} /> Profile
        </TypographyButton>
        <TypographyButton onClick={() => handleButtonClick("friend")}>
          <Diversity3Icon sx={{ marginRight: "5px" }} /> Friends
        </TypographyButton>
        {!notificationBar ? (
          <TypographyButton onClick={() => handleButtonClick("notification")}>
            <NotificationsNoneIcon sx={{ marginRight: "5px" }} /> Notification
          </TypographyButton>
        ) : (
          <TypographyButton onClick={() => handleButtonClick("notification")}>
            <NotificationsActiveIcon sx={{ marginRight: "5px" }} />
            Notification
          </TypographyButton>
        )}
        <TypographyButton>
          <LogoutIcon sx={{ marginRight: "5px" }} /> Logout
        </TypographyButton>
      </CardContent>
    </>
  );
}

export default Sidebar;
