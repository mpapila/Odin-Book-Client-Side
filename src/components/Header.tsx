import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BookIcon from "/book.png";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const values = [
    "Mehmet Papila",
    "Bora Papila",
    "Bengi Turer",
    "Turgut Papila",
    "Cigdem Papila",
    "David Stephenson",
  ];

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
        <Box>
          <Autocomplete
            forcePopupIcon={false}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) =>
              setInputValue(newInputValue)
            }
            id="search"
            options={values}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  margin: "5px 5px 5px 0px",
                  width: "30vw",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "5px 0px 0px 10px",
                }}
                placeholder={`Search odinbook`}
              />
            )}
            open={inputValue.length > 1}
          />
        </Box>
      </Box>
    </>
  );
}

export default Header;
