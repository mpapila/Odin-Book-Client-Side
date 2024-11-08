import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import EachPost from "./EachPost";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import CreatePost from "./CreatePost";
import { fetchFriendsPosts, setCreatePost } from "../redux/PostFeedSlice";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {
  fetchUsersInfo,
  myFriendsList,
  myPendingFriendsListforRequesterUsers,
} from "../redux/UserSlice";
import Loading from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { formatBirthDate } from "../utils";

function PostFeed() {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const createPost = useSelector(
    (state: RootState) => state.PostFeed.setCreatePost
  );
  const incomingFriendRequestList = useSelector(
    (state: RootState) => state.UserInfo.incomingFriendRequestList
  );
  const myPendingFriendsListforRequesterUsersList = useSelector(
    (state: RootState) => state.UserInfo.myPendingFriendsListforRequesterUsers
  );
  const allUsersInfo = useSelector(
    (state: RootState) => state.UserInfo.allUsers
  );
  const myFriendList = useSelector(
    (state: RootState) => state.UserInfo.myFriendsList
  );
  const friendPosts = useSelector(
    (state: RootState) => state.PostFeed.friendPosts
  );
  const isComputerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const rightSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.rightSidebarOpen
  );
  const containerDisplay = isComputerScreen ? "flex" : "block";

  // console.log("friendPosts", friendPosts);
  const myUserId = localStorage.getItem("myUserId");
  const myUserInfo = allUsersInfo.find((user) => user._id == myUserId);
  const myFirstName = myUserInfo?.firstName;
  // console.log("myFirstName", myFirstName);
  const dispatch = useDispatch<AppDispatch>();
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
      window.location.reload();
    },
  });

  useEffect(() => {
    dispatch(myPendingFriendsListforRequesterUsers());
    dispatch(fetchUsersInfo());
    dispatch(myFriendsList());
    dispatch(fetchFriendsPosts());
  }, []);

  const incomingFriendRequestIds = incomingFriendRequestList.map(
    (request) => request.requesterId
  );

  const friendSuggestions = allUsersInfo
    .filter((user) => user._id !== myUserId)
    .filter((user) => !incomingFriendRequestIds.includes(user._id));

  const addFriend = (userId: any) => {
    mutationAddFriend.mutate(userId);
  };
  return (
    <>
      {mutationAddFriend.isPending && <Loading />}
      {createPost && <CreatePost />}
      <Box
        p="20px"
        display={containerDisplay}
        // display="block"
        // width="70vw"
        width={isPhoneScreen ? "100vw" : "70vw"}
        justifyContent="space-around"
      >
        <Box
          overflow="scroll"
          height="85vh"
          display="flex"
          flexDirection="column"
          sx={{
            // maxWidth: "40vw",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&-ms-overflow-style:": {
              display: "none",
            },
          }}
        >
          <Box
            p="15px"
            display="flex"
            alignItems="center"
            gap={1}
            marginBottom="30px"
            sx={{ backgroundColor: "#f6f6f6" }}
          >
            <>
              {allUsersInfo.map((user) => {
                if (user._id === myUserId) {
                  return user.profilePhoto.length === 0 ? (
                    <FaceIcon
                      key={user._id}
                      fontSize="large"
                      sx={{ mr: "10px" }}
                    />
                  ) : (
                    <img
                      key={user._id}
                      src={user.profilePhoto}
                      alt="Profile"
                      width="40px"
                    />
                  );
                }
                return null;
              })}

              <TextField
                size="small"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  margin: "5px 5px 5px 0px",
                  // width: "30vw",
                  width: !isComputerScreen ? "100vw" : "30vw",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "5px 0px 0px 10px",
                }}
                placeholder={`What's on your mind, ${myFirstName}?`}
                onClick={() => {
                  dispatch(setCreatePost(true));
                }}
              />
            </>
          </Box>
          {friendPosts && friendPosts.length > 0 ? (
            friendPosts.map((post) => <EachPost post={post} key={post._id} />)
          ) : (
            <p>No Post Avaiable</p>
          )}
        </Box>
        {rightSidebarOpen && (
          <Box
            display="block"
            position="fixed"
            top={50}
            right={30}
            height="85vh"
            width="50vw"
            p={2}
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              overflowY: "auto",
            }}
          >
            <Box
              // display={isComputerScreen ? "block" : "none"}
              display="block"
              sx={{ maxWidth: "100vw" }}
            >
              <Box>
                <Typography pr={15} color="#939090" fontWeight={700}>
                  Birthdays
                </Typography>
                {myFriendList.length > 0 && (
                  <Box
                    display="flex"
                    alignItems="self-start"
                    flexDirection="column"
                    gap={1}
                    mt={3}
                    mb={3}
                  >
                    {myFriendList.map((friend, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        onClick={() => navigate(`profile/${friend._id}`)}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "#ededed",
                          },
                        }}
                      >
                        <CelebrationIcon />
                        <Typography ml={2}>
                          {friend.firstName} {friend.lastName}
                          's birthday is {formatBirthDate(friend.dateOfBirth)}.
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                <Box borderTop="1px solid #c3c0c0" mb={1}>
                  <Typography fontWeight={700} color="#939090" mt={3}>
                    Friends
                  </Typography>
                  {myFriendList.length > 0 ? (
                    <Box>
                      {myFriendList.map((friend) => (
                        <Box
                          key={friend._id}
                          display="flex"
                          alignItems="center"
                          flexDirection="row"
                          pt={1}
                          pb={1}
                          onClick={() => navigate(`profile/${friend._id}`)}
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: "#ededed",
                            },
                          }}
                        >
                          {friend.profilePhoto.length == 0 ? (
                            <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
                          ) : (
                            <img src={friend.profilePhoto} width="40px" />
                          )}
                          <Typography fontWeight="bold" ml={2}>
                            {friend.firstName} {friend.lastName}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography fontWeight={700} mt={3}>
                      No Friends
                    </Typography>
                  )}
                </Box>
                {friendSuggestions.length > 0 ? (
                  <Box borderTop="1px solid #c3c0c0" mb={1}>
                    <Typography fontWeight={700} color="#939090" mt={3}>
                      Contacts
                    </Typography>
                    <Box>
                      {friendSuggestions
                        .filter(
                          (user) =>
                            !myFriendList.some(
                              (friend) => friend._id === user._id
                            ) &&
                            !myPendingFriendsListforRequesterUsersList.some(
                              (pending) => pending.receiverId === user._id
                            )
                        )
                        .map((user) => (
                          <Box
                            key={user._id}
                            display="flex"
                            alignItems="center"
                            flexDirection="row"
                            pt={1}
                            pb={1}
                          >
                            {/* <FaceIcon sx={{ fontSize: "40px" }} /> */}
                            {user.profilePhoto.length == 0 ? (
                              <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
                            ) : (
                              <img src={user.profilePhoto} width="40px" />
                            )}
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
              </Box>
            </Box>
          </Box>
        )}

        {isComputerScreen && (
          <Box
            // display={isComputerScreen ? "block" : "none"}
            display="block"
            sx={{ maxWidth: "25vw" }}
          >
            <Box>
              <Typography pr={15} color="#939090" fontWeight={700}>
                Birthdays
              </Typography>
              {myFriendList.length > 0 && (
                <Box
                  display="flex"
                  alignItems="self-start"
                  flexDirection="column"
                  gap={1}
                  mt={3}
                  mb={3}
                >
                  {myFriendList.map((friend, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      onClick={() => navigate(`profile/${friend._id}`)}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#ededed",
                        },
                      }}
                    >
                      <CelebrationIcon />
                      <Typography ml={2}>
                        {friend.firstName} {friend.lastName}
                        's birthday is {formatBirthDate(friend.dateOfBirth)}.
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Box borderTop="1px solid #c3c0c0" mb={1}>
                <Typography fontWeight={700} color="#939090" mt={3}>
                  Friends
                </Typography>
                {myFriendList.length > 0 ? (
                  <Box>
                    {myFriendList.map((friend) => (
                      <Box
                        key={friend._id}
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                        pt={1}
                        pb={1}
                        onClick={() => navigate(`profile/${friend._id}`)}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "#ededed",
                          },
                        }}
                      >
                        {friend.profilePhoto.length == 0 ? (
                          <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
                        ) : (
                          <img src={friend.profilePhoto} width="40px" />
                        )}
                        <Typography fontWeight="bold" ml={2}>
                          {friend.firstName} {friend.lastName}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography fontWeight={700} mt={3}>
                    No Friends
                  </Typography>
                )}
              </Box>
              {friendSuggestions.length > 0 ? (
                <Box borderTop="1px solid #c3c0c0" mb={1}>
                  <Typography fontWeight={700} color="#939090" mt={3}>
                    Contacts
                  </Typography>
                  <Box>
                    {friendSuggestions
                      .filter(
                        (user) =>
                          !myFriendList.some(
                            (friend) => friend._id === user._id
                          ) &&
                          !myPendingFriendsListforRequesterUsersList.some(
                            (pending) => pending.receiverId === user._id
                          )
                      )
                      .map((user) => (
                        <Box
                          key={user._id}
                          display="flex"
                          alignItems="center"
                          flexDirection="row"
                          pt={1}
                          pb={1}
                        >
                          {/* <FaceIcon sx={{ fontSize: "40px" }} /> */}
                          {user.profilePhoto.length == 0 ? (
                            <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
                          ) : (
                            <img src={user.profilePhoto} width="40px" />
                          )}
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
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default PostFeed;
