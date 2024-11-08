import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "/book.png";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setLeftSidebarOpen,
  setRightSideBarOpen,
} from "../redux/PostFeedSlice";
import { fetchUsersInfo } from "../redux/UserSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const theme = useTheme();
  const isComputerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const logoDisplay = isComputerScreen || isTabletScreen;

  const rightSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.rightSidebarOpen
  );
  const leftSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.leftSidebarOpen
  );
  console.log("leftSidebarOpen", leftSidebarOpen);
  const openSidebarButton = () => {
    dispatch(setRightSideBarOpen(!rightSidebarOpen));
    if (leftSidebarOpen) {
      dispatch(setLeftSidebarOpen(false));
    }
  };
  const openLeftSidebarButton = () => {
    dispatch(setLeftSidebarOpen(!leftSidebarOpen));
    if (rightSidebarOpen) {
      dispatch(setRightSideBarOpen(false));
    }
  };
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  console.log("inputvalue", inputValue);
  const allUsers = useSelector((state: RootState) => state.UserInfo.allUsers);
  const users = allUsers.map((user) => {
    return { name: `${user.firstName} ${user.lastName}`, id: user._id };
  });

  useEffect(() => {
    dispatch(fetchUsersInfo());
  }, []);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          minHeight: "5vh",
          maxHeight: "7vh",
          backgroundColor: "#F6F6F6",
        }}
      >
        <Box display="flex">
          <MenuIcon
            onClick={openLeftSidebarButton}
            fontSize="large"
            sx={{
              alignSelf: "center",
              justifySelf: "end",
              visibility: isPhoneScreen ? "visible" : "hidden",
            }}
          />
          <Box
            component="img"
            src={BookIcon}
            alt="Book Icon"
            onClick={() => {
              navigate("/");
              dispatch(setLeftSidebarOpen(false));
              dispatch(setRightSideBarOpen(false));
            }}
            sx={{
              minHeight: "5vh",
              maxHeight: "7vh",
              marginRight: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#ededed",
                color: "#0043B7",
              },
            }}
          />
          {logoDisplay && (
            <Typography color="#0D66FF" variant="h5" marginTop="7px">
              odinbook
            </Typography>
          )}
        </Box>
        <Box>
          <Autocomplete
            forcePopupIcon={false}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log("event", event);
              console.log("newInputValue", newInputValue);
              if (!event || event.type === "click") return;
              setInputValue(newInputValue);
            }}
            onChange={(_event, selectedUser) => {
              if (selectedUser) {
                setInputValue(""); //
                navigate(`/profile/${selectedUser.id}`);
              }
            }}
            id="search"
            options={users}
            getOptionLabel={(option) => option.name}
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
                  width: "50vw",
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
        {location.pathname === "/" ? (
          <MenuIcon
            fontSize="large"
            onClick={openSidebarButton}
            sx={{
              alignSelf: "center",
              justifySelf: "end",
              mr: isTabletScreen ? "20px" : "",
              visibility: isComputerScreen ? "hidden" : "visible",
            }}
          />
        ) : (
          <Box></Box>
        )}
      </Box>
    </>
  );
}

export default Header;
