import { Box, Typography } from "@mui/material";
import BookIcon from "/book.png";

function Header() {
  return (
    <>
      <Box
        display="flex"
        sx={{
          minHeight: "5vh",
          maxHeight: "7vh",
          backgroundColor: "#F6F6F6",
        }}
      >
        <Box display="flex" minWidth="25%" sx={{}}>
          <img
            style={{
              minHeight: "5vh",
              maxHeight: "7vh",
              marginLeft: "30px",
              marginRight: "10px",
            }}
            src={BookIcon}
          ></img>
          <Typography color="#0D66FF" variant="h5" marginTop="7px">
            odinbook
          </Typography>
        </Box>
        <Typography padding="20px 0 0 20px">Hello Header</Typography>
      </Box>
    </>
  );
}

export default Header;
