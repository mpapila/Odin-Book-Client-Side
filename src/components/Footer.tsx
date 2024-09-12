import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#202C33",
          color: "#fff",
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography variant="body2">Mehmet Papila &copy; 2024</Typography>
      </Box>
    </>
  );
}

export default Footer;
