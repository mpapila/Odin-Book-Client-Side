import { CardContent, Container, Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import BookIcon from "/book.png";

function Sidebar() {
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
          paddingLeft="2%"
          paddingBottom="10%"
          paddingTop="5%"
        >
          <img height="50px" src={BookIcon}></img>
          <Typography variant="h5" marginTop="2px" marginLeft="4%">
            odinbook
          </Typography>
        </Typography>
        <Typography display="flex" color="#0D66FF" padding="5% 0 5% 2%">
          <FeedIcon sx={{ marginRight: "5px" }} /> Home
        </Typography>
        <Typography display="flex" color="#0D66FF" padding="0 0 5% 2%">
          <Person2Icon sx={{ marginRight: "5px" }} /> Profile
        </Typography>
        <Typography display="flex" color="#0D66FF" padding="0 0 5% 2%">
          <Diversity3Icon sx={{ marginRight: "5px" }} /> Friends
        </Typography>
        <Typography display="flex" color="#0D66FF" padding="0 0 5% 2%">
          <NotificationsNoneIcon sx={{ marginRight: "5px" }} /> Notification{" "}
          <NotificationsActiveIcon sx={{ marginRight: "5px" }} />
        </Typography>
        <Typography display="flex" color="#0D66FF" padding="0 0 5% 2%">
          <LogoutIcon sx={{ marginRight: "5px" }} /> Logout
        </Typography>
      </CardContent>
    </>
  );
}

export default Sidebar;
