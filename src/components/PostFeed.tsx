import { Box, Button, TextField, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EachPost from "./EachPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import CreatePost from "./CreatePost";
import { setCreatePost } from "../redux/PostFeedSlice";
import CelebrationIcon from "@mui/icons-material/Celebration";

function PostFeed() {
  const createPost = useSelector(
    (state: RootState) => state.PostFeed.setCreatePost
  );
  console.log("create post", createPost);
  const dispatch = useDispatch();
  return (
    <>
      {createPost && <CreatePost />}
      <Box
        display="flex"
        minWidth="75vw"
        maxWidth="75vw"
        justifyContent="space-around"
      >
        <Box display="flex" flexDirection="column" sx={{ maxWidth: "40vw" }}>
          <Box p="15px" marginBottom="30px" sx={{ backgroundColor: "#f6f6f6" }}>
            <FaceIcon
              fontSize="large"
              sx={{ marginTop: "5px", marginRight: "5px" }}
            />
            <TextField
              size="small"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                margin: "5px 5px 5px 0px",
                width: "30vw",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "5px 0px 0px 10px",
              }}
              placeholder={`What's on your mind, name?`}
              onClick={() => {
                dispatch(setCreatePost(true));
              }}
            />
          </Box>
          <EachPost />
        </Box>
        <Box
          // borderLeft="1px solid black"
          sx={{ maxWidth: "40vw" }}
        >
          <Box>
            <Typography pr={15} color="#939090" fontWeight={700}>
              Birthdays
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              mt={3}
              mb={3}
            >
              <CelebrationIcon />
              <Typography ml={2}>Bora Papila's birthday is today.</Typography>
            </Box>
            <Box borderTop="1px solid #c3c0c0" mb={3}>
              <Typography fontWeight={700} color="#939090" mt={3} mb={3}>
                Friends
              </Typography>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  pt={1}
                  pb={1}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#ededed",
                    },
                  }}
                >
                  <FaceIcon sx={{ fontSize: "40px" }} />
                  <Typography fontWeight="bold" ml={2}>
                    Bengi Turer
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box borderTop="1px solid #c3c0c0" mb={3}>
              <Typography fontWeight={700} color="#939090" mt={3}>
                Contacts
              </Typography>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  pt={1}
                  pb={1}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#ededed",
                    },
                  }}
                >
                  <FaceIcon sx={{ fontSize: "40px" }} />
                  <Typography fontWeight="bold" ml={2}>
                    Bora Papila
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  pt={1}
                  pb={1}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#ededed",
                    },
                  }}
                >
                  <FaceIcon sx={{ fontSize: "40px" }} />
                  <Typography fontWeight="bold" ml={2}>
                    Cigdem Papila
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  pt={1}
                  pb={1}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#ededed",
                    },
                  }}
                >
                  <FaceIcon sx={{ fontSize: "40px" }} />
                  <Typography fontWeight="bold" ml={2}>
                    Turgut Papila
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PostFeed;
