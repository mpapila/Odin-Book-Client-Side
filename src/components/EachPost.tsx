import { Box, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

export const EachPost = () => {
  return (
    <Box
      padding="12px 16px"
      boxShadow="2"
      sx={{ backgroundColor: "#f6f6f6", className: "eachPost" }}
      marginBottom="10px"
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={() => {
            console.log("Commented");
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
          display: "flex",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
        <Box mt="5px">
          <Typography fontWeight="fontWeightBold" sx={{ lineHeight: "0.7" }}>
            Bengi Turer
          </Typography>
          <Typography variant="caption">2 minutes ago</Typography>
          <Typography>Interested if I can see sample photos.</Typography>
        </Box>
      </div>
    </Box>
  );
};

export default EachPost;

{
  /* <Box
            padding="12px 16px"
            boxShadow="2"
            sx={{ backgroundColor: "#f6f6f6", className: "eachPost" }}
            marginBottom="10px"
          >
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
              <Box mt="5px">
                <Typography
                  fontWeight="fontWeightBold"
                  sx={{ lineHeight: "0.7" }}
                >
                  Mehmet Papila
                </Typography>
                <Typography variant="caption">2 minutes ago</Typography>
              </Box>
            </div>
            <Box borderBottom="1px solid #c3c0c0">
              <Typography>
                It's official guys. Sony has lost their damn minds 😂 Meet the
                #PS5Pro, the First Ever $700/€800 Digital Console. It aims to
                achieve fidelity mode level of graphics, with the framerate
                target of performance mode, via 3 solutions: ⚬ Larger GPU ⚬
                Advanced ray tracing ⚬ PlayStation Spectral Super Resolution
                This expensive digital pro console will be available starting
                November 7th for $700. And yeah the Vertical Stand is sold
                separately 😂
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
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                onClick={() => {
                  console.log("Commented");
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
                display: "flex",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
              <Box mt="5px">
                <Typography
                  fontWeight="fontWeightBold"
                  sx={{ lineHeight: "0.7" }}
                >
                  Bengi Turer
                </Typography>
                <Typography variant="caption">2 minutes ago</Typography>
                <Typography>Interested if I can see sample photos.</Typography>
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <FaceIcon fontSize="large" sx={{ mr: "10px" }} />
              <Box mt="5px">
                <Typography
                  fontWeight="fontWeightBold"
                  sx={{ lineHeight: "0.7" }}
                >
                  Bengi Turer
                </Typography>
                <Typography variant="caption">2 minutes ago</Typography>
                <Typography>Interested if I can see sample photos.</Typography>
              </Box>
            </div>
          </Box> */
}
