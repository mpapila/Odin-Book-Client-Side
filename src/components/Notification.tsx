import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import FaceIcon from "@mui/icons-material/Face";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Notification() {
  const isNotificationNew = useSelector(
    (state: RootState) => state.Notification.setNotificationRead
  );
  return (
    <>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Box p="20px" width="40vw">
            <Box mb={3} display="flex" flexDirection="column" gap={3}>
              <Typography fontWeight="800" fontSize="large">
                Notifications
              </Typography>
              <Typography fontWeight="600" fontSize="medium">
                New
              </Typography>
            </Box>
            <Box
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
              <Box display="flex" gap={0}>
                <Typography mr={1} fontWeight="bold">
                  David Stephenson
                </Typography>
                <Typography>added you as a friend</Typography>
                <Typography
                  alignSelf="self-end"
                  ml={1}
                  mr={1}
                  fontSize="small"
                  color="success"
                  // color="textSecondary"
                >
                  7h
                </Typography>
                <FiberManualRecordIcon color="success" />
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Notification;
