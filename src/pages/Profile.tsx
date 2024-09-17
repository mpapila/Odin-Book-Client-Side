import { Box, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EachPost from "../components/EachPost";
import CakeIcon from "@mui/icons-material/Cake";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Profile() {
  return (
    <>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Box
            p="20px"
            sx={{
              height: "80vh",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "&-ms-overflow-style:": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{ backgroundColor: "#F6F6F6" }}
              borderRadius="5px"
              width="70vw"
              display="flex"
              justifyContent="space-between"
              boxShadow="2"
            >
              <Box display="flex">
                <Box
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                    position: "relative",
                    "&:hover::after": {
                      content: '"Click to add photo"',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      fontSize: "16px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      zIndex: 1,
                    },
                  }}
                >
                  <FaceIcon
                    sx={{
                      fontSize: "170px",
                      "&:hover": {
                        filter: "blur(1px)",
                      },
                    }}
                  />
                </Box>
                <Typography
                  fontWeight="bold"
                  fontSize="28px"
                  mb={4}
                  ml={1}
                  alignSelf="self-end"
                >
                  Mehmet Papila
                </Typography>
              </Box>
              <Box display="flex">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    backgroundColor: "#d3cfcf",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#a5a3a3",
                    },
                  }}
                  color="black"
                  p={1}
                  borderRadius="5px"
                  alignSelf="self-end"
                  mb={4}
                  // mr={2}
                >
                  <EditIcon sx={{ mb: "2px" }} />
                  <Typography>Edit Profile</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    backgroundColor: "#0B60F2",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#094ec5",
                    },
                  }}
                  color="white"
                  p={1}
                  borderRadius="5px"
                  alignSelf="self-end"
                  mb={4}
                  mr={2}
                >
                  <PersonAddIcon sx={{ mb: "2px" }} />
                  <Typography>Add Friend</Typography>
                </Box>
              </Box>
            </Box>
            <Box
              p={2}
              mt={2}
              boxShadow={2}
              borderRadius="5px"
              sx={{ backgroundColor: "#F6F6F6" }}
            >
              <Typography fontSize="17px" fontWeight="bold">
                INFO
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <AccessTimeIcon />
                <Typography>Joined September 2024</Typography>
              </Box>
              <Box mt={2} display="flex" gap={1}>
                <CakeIcon />
                <Box mt="3px">
                  <Typography color="black" sx={{ lineHeight: "0.7" }}>
                    March 14, 1995
                  </Typography>
                  <Typography color="#373737" variant="caption">
                    Birth Date
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              p={2}
              mt={2}
              boxShadow={2}
              borderRadius="5px"
              sx={{ backgroundColor: "#F6F6F6" }}
            >
              <Typography fontSize="17px" fontWeight="bold">
                POSTS
              </Typography>
            </Box>
            <Box mt={3} width="70vw">
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
            </Box>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
