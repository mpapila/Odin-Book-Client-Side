import { Box, TextField, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EachPost from "./EachPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import CreatePost from "./CreatePost";
import { setCreatePost } from "../redux/PostFeedSlice";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setUsersInfo } from "../redux/UserSlice";
import { useEffect } from "react";

function PostFeed() {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const createPost = useSelector(
    (state: RootState) => state.PostFeed.setCreatePost
  );
  const allUsersInfo = useSelector(
    (state: RootState) => state.UserInfo.setUsersInfo
  );
  const myUserId = localStorage.getItem("myUserId");
  console.log("usersinfo", allUsersInfo);
  console.log("create post", createPost);
  const dispatch = useDispatch();
  const mutationAddFriend = useMutation({
    mutationFn: async (friendId) => {
      return axios.post(
        `${URL}/addFriend`,
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      const { message } = response.data;
      console.log(message);
    },
  });

  const mutationUsersInfo = useMutation({
    mutationFn: async () => {
      return axios.get(`${URL}/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (response) => {
      dispatch(setUsersInfo(response.data.allUsers));
    },
    onError: (error) => {
      console.error("error fetching users info:", error);
    },
  });
  useEffect(() => {
    mutationUsersInfo.mutate();
  }, []);
  const friendSuggestions = allUsersInfo.filter(
    (user) => user._id !== myUserId
  );
  console.log("friendSuggestions", friendSuggestions);

  const addFriend = (userId: any) => {
    mutationAddFriend.mutate(userId);
    console.log("user", userId);
  };

  return (
    <>
      {createPost && <CreatePost />}
      <Box
        p="20px"
        display="flex"
        // minWidth="70vw"
        width="70vw"
        justifyContent="space-around"
      >
        <Box
          overflow="scroll"
          height="85vh"
          display="flex"
          flexDirection="column"
          sx={{
            maxWidth: "40vw",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&-ms-overflow-style:": {
              display: "none",
            },
          }}
        >
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
          <EachPost />
          <EachPost />
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
            <Box borderTop="1px solid #c3c0c0" mb={1}>
              <Typography fontWeight={700} color="#939090" mt={3}>
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
            {/*  */}
            {/*  */}
            {/*  */}
            {friendSuggestions.length > 0 ? (
              <Box borderTop="1px solid #c3c0c0" mb={1}>
                <Typography fontWeight={700} color="#939090" mt={3}>
                  Contacts
                </Typography>
                <Box>
                  {friendSuggestions.map((user) => (
                    <Box
                      key={user._id}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      pt={1}
                      pb={1}
                    >
                      <FaceIcon sx={{ fontSize: "40px" }} />
                      <Typography fontWeight="bold" ml={2}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <PersonAddIcon
                        htmlColor="#0690FD"
                        onClick={() => addFriend(user._id)}
                        sx={{
                          ml: "10px",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Typography>No New Contacts</Typography>
            )}
            {/*  */}
            {/*  */}
            {/*  */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PostFeed;
