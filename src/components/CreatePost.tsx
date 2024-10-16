import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendsPosts, setCreatePost } from "../redux/PostFeedSlice";
import CloseIcon from "@mui/icons-material/Close";
import FaceIcon from "@mui/icons-material/Face";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PostForm } from "../type";
import { AppDispatch, RootState } from "../redux/Store";
import { fetchUsersInfo } from "../redux/UserSlice";

function CreatePost() {
  const allUsers = useSelector((state: RootState) => state.UserInfo.allUsers);
  console.log("allUsers", allUsers);
  const myUserId = localStorage.getItem("myUserId");
  console.log("myUserId", myUserId);
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  const postCreateMutation = useMutation({
    mutationFn: async (body: PostForm) => {
      return axios.post(`${URL}/newPost`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (response) => {
      dispatch(setCreatePost(false));
      dispatch(fetchFriendsPosts());
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body: PostForm = {
      content: data.get("content") as string,
    };
    console.log("body", body);
    postCreateMutation.mutate(body);
  };
  return (
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
          width: "500px",
          minHeight: "350px",
          borderRadius: 1,
          boxShadow: 24,
          // p: 4,
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pb={2}
          pt={2}
          borderBottom="1px solid #c3c0c0"
        >
          <div></div>
          <Typography fontSize="18px" fontWeight="800">
            Create Post
          </Typography>
          <div
            onClick={() => {
              dispatch(fetchUsersInfo());
              dispatch(setCreatePost(false));
            }}
          >
            <CloseIcon
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                cursor: "pointer",
              }}
            />
          </div>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          ml={2}
          mt={1}
          display="flex"
          marginBottom="10px"
        >
          <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
          {allUsers.map((userOne) => (
            <Box mt="5px" key={userOne._id}>
              {userOne._id === myUserId ? (
                <Box mr={4}>
                  <Typography
                    fontWeight="fontWeightBold"
                    sx={{ lineHeight: "0.7" }}
                    ml={1}
                    mb={1}
                  >
                    {userOne.firstName} {userOne.lastName}
                  </Typography>

                  <TextField
                    name="content"
                    multiline
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      maxRows: 5,
                    }}
                    sx={{
                      margin: "5px 5px 5px 0px",
                      width: "400px",
                      // backgroundColor: "#c3c0c0",
                      borderRadius: "10px",
                      padding: "5px 0px 0px 10px",
                      height: "80%",
                      minHeight: "124px",
                    }}
                    placeholder={`What's on your mind, ${userOne.firstName}?`}
                  />
                  <Button
                    type="submit"
                    // onClick={() => {
                    //   console.log("post");
                    // }}
                    sx={{ marginTop: "auto" }}
                    fullWidth
                    variant="contained"
                  >
                    Post
                  </Button>
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default CreatePost;
