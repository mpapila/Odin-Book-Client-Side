import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <>
      <Box
        sx={{
          height: "94px",
          minWidth: "75%",
          borderBottom: "1px solid black",
        }}
      >
        <Typography>Hello Header</Typography>
      </Box>
    </>
  );
}

export default Header;
