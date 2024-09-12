import { Box, TextField, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";

function PostPage() {
  return (
    <Box
      height="75vh"
      overflow="scroll"
      margin="0 150px"
      padding="12px 16px 0px 10px"
      boxShadow="2"
      sx={{
        backgroundColor: "#f6f6f6",
        className: "eachPost",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&-ms-overflow-style:": {
          display: "none",
        },
      }}
      marginBottom="30px"
    >
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
        <Box mt="5px">
          <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
            Mehmet Papila
          </Typography>
          <Typography variant="caption">2 minutes ago</Typography>
        </Box>
      </div>
      <Box borderBottom="1px solid #c3c0c0">
        <Typography>
          It's official guys. Sony has lost their damn minds 😂 Meet the
          #PS5Pro, the First Ever $700/€800 Digital Console. It aims to achieve
          fidelity mode level of graphics, with the framerate target of
          performance mode, via 3 solutions: ⚬ Larger GPU ⚬ Advanced ray tracing
          ⚬ PlayStation Spectral Super Resolution This expensive digital pro
          console will be available starting November 7th for $700. And yeah the
          Vertical Stand is sold separately 😂
        </Typography>
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
              2
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <CommentIcon fontSize="small" htmlColor="#0690FD" />
            <Typography ml={1} color="#c3c0c0">
              2
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
          <ThumbUpIcon htmlColor="#0690FD" fontSize="small" />
          <Typography ml={1} fontWeight="fontWeightBold">
            Like
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          //   marginBottom: "10px",
          marginTop: "10px",
          //   paddingBottom: "10px",
        }}
      >
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
            <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
              Bengi Turer
            </Typography>
            <Typography variant="caption">2 minutes ago</Typography>
            <Typography>Interested if I can see sample photos.</Typography>
          </Box>
        </Box>
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
          >
            <FaceIcon sx={{ fontSize: "40px" }} />
            <TextField
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
              placeholder={`Answer as name?`}
              onClick={() => {
                console.log("post");
              }}
            />
            <SendIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#ededed",
                },
              }}
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default PostPage;
