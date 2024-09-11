import { Box, TextField, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EachPost from "./EachPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { setCreatePost } from "../redux/PostFeedSlice";
import CloseIcon from "@mui/icons-material/Close";

function PostFeed() {
  const createPost = useSelector(
    (state: RootState) => state.PostFeed.setCreatePost
  );
  console.log("create post", createPost);
  const dispatch = useDispatch();
  return (
    <>
      {createPost && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "25%",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
              zIndex: 10,
              backgroundColor: "white",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
              borderBottom="5px solid black"
            >
              <div></div>
              <Typography fontSize="20px" fontWeight="800">
                Create Post
              </Typography>
              <div
                onClick={() => {
                  dispatch(setCreatePost(false));
                }}
              >
                <CloseIcon
                  sx={{
                    position: "absolute",
                    top: 8, // Adjust as needed
                    right: 8, // Adjust as needed
                    cursor: "pointer",
                  }}
                />
              </div>
            </Box>
            <Typography>Hello</Typography>
          </Box>
        </>
      )}
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
        <Box sx={{ maxWidth: "40vw" }}>ALL FRIENDS</Box>
      </Box>
    </>
  );
}

export default PostFeed;
