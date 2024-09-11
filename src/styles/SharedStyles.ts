import { styled, Typography } from "@mui/material";

export const TypographyButton = styled(Typography)(() => ({
  display: "flex",
  color: "#0D66FF",
  padding: "5% 0 10% 2%",
  marginLeft: "30px",
  "&:hover": {
    cursor: "pointer",
    color: "#0043B7",
    backgroundColor: "#ededed",
  },
}));
