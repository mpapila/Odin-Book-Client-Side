import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostbyId, setComment } from "../redux/PostDetailSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { formatDate } from "../utils";
import { useMutation } from "@tanstack/react-query";
import {
  Comment,
  NewCommentBody,
  PostReactionData,
  PostReactionState,
} from "../type";
import axios from "axios";
import { fetchUsersInfo } from "../redux/UserSlice";

function PostPage() {
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("myUserId");
  const dispatch = useDispatch<AppDispatch>();
  const postId = useParams().id;
  const eachPostDetail = useSelector(
    (state: RootState) => state.PostDetail.eachPostDetail
  );
  console.log("eachpostdetail", eachPostDetail);
  const allUsers = useSelector((state: RootState) => state.UserInfo.allUsers);
  console.log("allusers", allUsers);

  const myInfo = allUsers.filter((user) => user._id == myUserId);
  console.log("myinfo", myInfo[0].firstName);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    eachPostDetail?.post?.likes?.length || 0
  );
  // console.log("likescount", likesCount);
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");

  const mutationLikeGet = useMutation<PostReactionState, unknown, string>({
    mutationFn: async (postId) => {
      return axios.get(`${URL}/postAttribute`, {
        params: { postId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (response) => {
      // console.log("Data fetched successfully:", response.data);
      const data: PostReactionData = response.data;
      setIsLiked(data.alreadyLiked ?? false);
      setLikesCount(data.postLikeCount ?? 0);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  const mutationCreateCommentPost = useMutation({
    mutationFn: async (body: NewCommentBody) => {
      return axios.post(`${URL}/newComment`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (response) => {
      console.log("response", response);
      if (postId) {
        dispatch(getPostbyId(postId));
      }
    },
  });

  const mutationLikedPosts = useMutation({
    mutationFn: async (postId: string) => {
      return axios.post(
        `${URL}/likePost`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      console.log(response);
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    },
  });

  // console.log("postid", postId);
  // console.log("eachPostDetail", eachPostDetail);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content") as string;

    const data = new FormData(e.currentTarget);
    console.log("data", data);
    if (postId == undefined) return undefined;
    const body: NewCommentBody = {
      content,
      postId,
    };
    console.log("body", body);
    if (postId) {
      mutationCreateCommentPost.mutate(body);
      dispatch(setComment(""));
    }
  };

  useEffect(() => {
    if (postId) {
      dispatch(getPostbyId(postId));
      dispatch(fetchUsersInfo());
      mutationLikeGet.mutate(postId);
    }
  }, []);
  const theme = useTheme();
  const leftSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.leftSidebarOpen
  );
  const isComputerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const leftSidebar = isComputerScreen || isTabletScreen || leftSidebarOpen;

  return (
    <>
      {eachPostDetail && eachPostDetail.post && eachPostDetail.nameInfo && (
        <div>
          <Header />
          <div style={{ display: "flex" }}>
            {leftSidebar && <Sidebar />}

            <Box
              width={
                isComputerScreen
                  ? "30vw"
                  : isTabletScreen
                  ? "65vw"
                  : isPhoneScreen
                  ? "80vw"
                  : 0
              }
              height="auto"
              margin={isComputerScreen ? "0 150px" : "0 20px"}
              padding="12px 16px 0px 10px"
              boxShadow="2"
              sx={{
                backgroundColor: "#f6f6f6",
              }}
              marginBottom="30px"
              marginTop="20px"
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                {eachPostDetail.nameInfo.profilePhoto.length === 0 ? (
                  <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
                ) : (
                  <img
                    style={{ marginRight: "5px" }}
                    src={eachPostDetail.nameInfo.profilePhoto}
                    width="40px"
                  />
                )}
                <Box mt="5px">
                  <Typography
                    fontWeight="fontWeightBold"
                    onClick={() =>
                      navigate(`/profile/${eachPostDetail.post?.userId}`)
                    }
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        color: "#0043B7",
                      },
                      lineHeight: "0.7",
                    }}
                  >
                    {eachPostDetail.nameInfo.firstName}{" "}
                    {eachPostDetail.nameInfo.lastName}
                  </Typography>
                  <Typography variant="caption">
                    {formatDate(eachPostDetail.post.createdAt)}
                  </Typography>
                </Box>
              </div>
              <Box borderBottom="1px solid #c3c0c0">
                <Typography>{eachPostDetail.post.content}</Typography>
                <Box
                  mt={1}
                  mb={1}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="row">
                    <ThumbUpIcon htmlColor="#0690FD" fontSize="small" />
                    <Typography ml={1} color="#c3c0c0">
                      {likesCount}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <CommentIcon fontSize="small" htmlColor="#0690FD" />
                    <Typography ml={1} color="#c3c0c0">
                      {eachPostDetail.post.comments.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                color="#c3c0c0"
                borderBottom="1px solid #c3c0c0"
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  mt={1}
                  mb={1}
                  onClick={() => {
                    if (postId) {
                      mutationLikedPosts.mutate(postId);
                    }
                    console.log("Liked");
                  }}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: "#0043B7",
                      backgroundColor: "#ededed",
                    },
                  }}
                >
                  <ThumbUpIcon
                    htmlColor={isLiked ? "#0043B7" : "#0690FD"}
                    fontSize="small"
                  />
                  <Typography ml={1} fontWeight="fontWeightBold">
                    Like
                  </Typography>
                </Box>
              </Box>
              <Box
                height="60vh"
                overflow="scroll"
                sx={{
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "&-ms-overflow-style:": {
                    display: "none",
                  },
                }}
              >
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {/* *** */}
                  {/* *** */}
                  {/* *** */}
                  {eachPostDetail.post.comments.map(
                    (eachComment: Comment, index: Key | null | undefined) => {
                      const user = allUsers.find(
                        (user) => user._id === eachComment.userId
                      );
                      return (
                        <Box key={index}>
                          <Box display="flex">
                            {eachComment.userId === user?._id &&
                              (!user?.profilePhoto ? (
                                <FaceIcon
                                  fontSize="large"
                                  sx={{ mr: "10px", mt: "10px" }}
                                />
                              ) : (
                                <img
                                  style={{
                                    marginTop: "10px",
                                    marginRight: "10px",
                                  }}
                                  src={user.profilePhoto}
                                  width="32"
                                  height="32"
                                  alt="User Profile"
                                />
                              ))}

                            <Box
                              display="flex"
                              flexDirection="column"
                              // mt="2px"
                              p={2}
                              borderRadius="20px"
                              sx={{ backgroundColor: "white" }}
                            >
                              <Typography
                                fontWeight="fontWeightBold"
                                onClick={() =>
                                  navigate(`/profile/${user?._id}`)
                                }
                                sx={{
                                  "&:hover": {
                                    cursor: "pointer",
                                    color: "#0043B7",
                                  },
                                  lineHeight: "0.7",
                                }}
                              >
                                {user
                                  ? `${user.firstName} ${user.lastName}`
                                  : "Unknown User"}
                              </Typography>
                              <Typography variant="caption">
                                {formatDate(eachComment.createdAt)}
                              </Typography>
                              <Typography>{eachComment.content}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  )}
                  {/* *** */}
                  {/* *** */}
                  {/* *** */}
                  <Box
                    sx={{
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#f6f6f6",
                      paddingTop: "10px",
                      // paddingBottom: "10px",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                      component="form"
                      onSubmit={handleSubmit}
                    >
                      {myInfo[0].profilePhoto.length === 0 ? (
                        <FaceIcon sx={{ fontSize: "40px" }} />
                      ) : (
                        <img
                          style={{ marginRight: "5px" }}
                          src={myInfo[0].profilePhoto}
                          width="40px"
                        />
                      )}
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
                          backgroundColor: "#c3c0c0",
                          borderRadius: "10px",
                          padding: "5px 0px 0px 10px",
                          height: "80%",
                        }}
                        placeholder={`Answer as, ${myInfo[0].firstName}?`}
                      />
                      <IconButton type="submit">
                        <SendIcon
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: "#ededed",
                            },
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </div>
              </Box>
            </Box>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default PostPage;
