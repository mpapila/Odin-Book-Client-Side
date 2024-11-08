import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import {
  Comment,
  EachPostProps,
  PostReactionData,
  PostReactionState,
} from "../type";
import { formatDate } from "../utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const EachPost = ({ post }: EachPostProps) => {
  console.log("post", post);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const allUsers = useSelector((state: RootState) => state.UserInfo.allUsers);
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  const lastComment: Comment = post.comments[post.comments.length - 1];

  console.log("lastcomment", lastComment);
  console.log("post.comments", post.comments);

  const mutationLikeGet = useMutation<PostReactionState, unknown, string>({
    mutationFn: async (postId) => {
      // one that It works
      return axios.get(`${URL}/postAttribute`, {
        params: { postId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (response) => {
      console.log("Data fetched successfully:", response.data);
      const data: PostReactionData = response.data;
      setIsLiked(data.alreadyLiked ?? false);
      setLikesCount(data.postLikeCount ?? 0);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  const mutationLikedPosts = useMutation({
    mutationFn: async (postId) => {
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
    onSuccess: (_response) => {
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    },
  });

  const handleLikeClick = (postId: any) => {
    mutationLikedPosts.mutate(postId);
  };
  useEffect(() => {
    if (post?._id) {
      mutationLikeGet.mutate(post._id);
    }
  }, []);
  const theme = useTheme();

  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      padding="12px 16px"
      boxShadow="2"
      mr={isPhoneScreen ? 3 : 0}
      sx={{ backgroundColor: "#f6f6f6", className: "eachPost" }}
      marginBottom="30px"
    >
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        {post.profilePhoto.length == 0 ? (
          <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
        ) : (
          <img
            src={post.profilePhoto}
            width="32"
            style={{ marginRight: "10px" }}
          />
        )}
        <Box mt="5px" onClick={() => navigate(`/profile/${post.userId}`)}>
          <Typography
            fontWeight="fontWeightBold"
            sx={{
              "&:hover": {
                cursor: "pointer",
                // color: "#0043B7",
                color: "#0043B7",
                backgroundColor: "#ededed",
              },
              lineHeight: "0.7",
            }}
          >
            {post.firstName} {post.lastName}
          </Typography>
          <Typography variant="caption">
            {formatDate(post.createdAt)}
          </Typography>
        </Box>
      </div>
      <Box borderBottom="1px solid #c3c0c0">
        <Typography>{post.content}</Typography>
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
              {post.comments.length}
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
          onClick={() => handleLikeClick(post._id)}
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={() => {
            navigate(`/posts/${post._id}`);
          }}
          mt={1}
          mb={1}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "#0043B7",
              backgroundColor: "#ededed",
            },
          }}
        >
          <CommentIcon fontSize="small" htmlColor="#0690FD" />
          <Typography ml={1} fontWeight="fontWeightBold">
            Comment
          </Typography>
        </Box>
      </Box>
      {lastComment ? (
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <Typography
            color="#939090"
            fontSize="15px"
            onClick={() => {
              navigate(`/posts/${post._id}`);
            }}
            fontWeight={700}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            View More Comment
          </Typography>
          <Box display="flex">
            {allUsers.length > 0 &&
              (() => {
                const user = allUsers.find(
                  (eachUser) => eachUser._id === lastComment.userId
                );

                return user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                      marginTop: "10px",
                    }}
                  />
                ) : (
                  <FaceIcon fontSize="large" sx={{ mr: "10px", mt: "10px" }} />
                );
              })()}
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
                onClick={() => navigate(`/profile/${lastComment.userId}`)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: "#0043B7",
                  },
                  lineHeight: "0.7",
                }}
              >
                {allUsers.length > 0 &&
                  (() => {
                    const user = allUsers.find(
                      (eachUser) => eachUser._id === lastComment.userId
                    );
                    return user
                      ? `${user.firstName} ${user.lastName}`
                      : "Unknown User";
                  })()}
              </Typography>
              <Typography variant="caption">
                {formatDate(lastComment.createdAt)}
              </Typography>
              <Typography>{lastComment.content}</Typography>
            </Box>
          </Box>
        </div>
      ) : (
        <Typography color="#939090" fontSize="15px" mt={2}>
          No comments
        </Typography>
      )}
    </Box>
  );
};

export default EachPost;
