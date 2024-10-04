import { Box, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { EachPostProps, PostReactionData, PostReactionState } from "../type";
import { formatDate } from "../utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { getLikeAttribution } from "../redux/PostReactionSlice";

export const EachPost = ({ post }: EachPostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLiked, setIsLiked] = useState(false);
  // const isLiked = useSelector((state: RootState) => state.PostReaction.isLiked);
  console.log("isLiked", isLiked);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const apiUrl = import.meta.env.VITE_API_URL;
  const URL = `${apiUrl}`;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    onSuccess: (response) => {
      console.log(response);
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
      // dispatch(getLikeAttribution(post._id));
    }
  }, []);
  console.log("post", post);
  return (
    <Box
      padding="12px 16px"
      boxShadow="2"
      sx={{ backgroundColor: "#f6f6f6", className: "eachPost" }}
      marginBottom="30px"
    >
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
        <Box
          mt="5px"
          // onClick={() => navigate(`profile/${friend._id}`)}
        >
          <Typography
            fontWeight="fontWeightBold"
            sx={{
              "&:hover": {
                cursor: "pointer",
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
              {/* {postReaction.likesCount} */}
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
            navigate(`posts/${post._id}`);
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
            navigate(`posts/${post._id}`);
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
          <FaceIcon fontSize="large" sx={{ mr: "10px", mt: "10px" }} />
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
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "#0043B7",
                  // backgroundColor: "#ededed",
                },
                lineHeight: "0.7",
              }}
            >
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default EachPost;
