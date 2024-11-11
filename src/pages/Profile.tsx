import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EachPost from "../components/EachPost";
import CakeIcon from "@mui/icons-material/Cake";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriend,
  editProfile,
  fetchProfileById,
  setClearError,
  setEditProfile,
  setPosts,
  setProfileInformation,
} from "../redux/UserProfileSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { formatDate } from "../utils";
import { fetchFriendShips, myFriendsList } from "../redux/UserSlice";
import Loading from "../components/LoadingSpinner";
import {
  removePhotoOnDB,
  sendPhotoToDB,
  setOpenPhotoModal,
  uploadPhoto,
} from "../redux/PhotoSlice";

function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const myUserId = localStorage.getItem("myUserId");
  const { id: profileId } = useParams<{ id: string }>();
  if (!profileId) throw new Error("missing profile ID");

  const friendsList = useSelector(
    (state: RootState) => state.UserInfo.myFriendsList
  );
  const friendship = useSelector(
    (state: RootState) => state.UserInfo.friendships
  );

  const isPendingFriendship = friendship.some(
    (friend) =>
      (friend.requesterId === profileId || friend.receiverId === profileId) &&
      friend.status === "pending" &&
      myUserId !== profileId
  );
  const isMyFriend = friendsList.some((friend) => friend._id === profileId);
  useEffect(() => {
    dispatch(fetchFriendShips());
  }, []);

  const editProfileButton = useSelector(
    (state: RootState) => state.UserProfile.editProfileButton
  );

  const handleProfileEditClose = () => {
    dispatch(setEditProfile());
    dispatch(fetchProfileById(profileId));
    dispatch(setClearError());
  };

  const userProfile = useSelector(
    (state: RootState) => state.UserProfile.userProfile
  );
  const errorFromPhoto = useSelector((state: RootState) => state.Photo.error);

  const loadingFromUserProfile = useSelector(
    (state: RootState) => state.UserProfile.loading
  );
  const loadingFromPhoto = useSelector(
    (state: RootState) => state.Photo.pending
  );
  const loading = loadingFromPhoto || loadingFromUserProfile;
  const errorFromUserProfile = useSelector(
    (state: RootState) => state.UserProfile.error
  );
  const successFromUserProfile = useSelector(
    (state: RootState) => state.UserProfile.success
  );
  const successFromPhoto = useSelector(
    (state: RootState) => state.Photo.success
  );
  const success = successFromPhoto || successFromUserProfile;
  const profileInformation = useSelector(
    (state: RootState) => state.UserProfile.profileInformation
  );

  const error = errorFromPhoto || errorFromUserProfile;
  const posts =
    useSelector((state: RootState) => state.UserProfile.posts) || [];
  const openPhotoModal = useSelector(
    (state: RootState) => state.Photo.openPhotoModal
  );
  const photo = useSelector((state: RootState) => state.Photo.photo);

  const openUploadModal = () => {
    dispatch(setOpenPhotoModal());
  };

  const handlePhotoUploadClose = () => {
    dispatch(setOpenPhotoModal());
  };

  const handleOpenPhotoUpdate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadPhoto(file));
    }
  };

  // console.log("photo", photo.length);
  useEffect(() => {
    dispatch(setProfileInformation(userProfile.userProfileById)); // check this logic and change it to the profileInformation = userID
    dispatch(setPosts(userProfile.userPostById));
  }, [userProfile]);
  useEffect(() => {
    dispatch(myFriendsList());
  }, []);
  useEffect(() => {
    if (profileId) {
      dispatch(fetchProfileById(profileId));
    }
  }, [profileId]);
  const newPosts = posts.map((post) => {
    // console.log("posts", post);
    return {
      ...post,
      firstName: profileInformation.firstName,
      lastName: profileInformation.lastName,
      profilePhoto: profileInformation.profilePhoto,
    };
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      dateOfBirth: data.get("dateOfBirth") as string,
    };
    console.log("body", body);
    if (!profileId) throw new Error("missing profile ID");
    dispatch(editProfile({ body, profileId }));
  };
  // console.log("success", success);
  const leftSidebarOpen = useSelector(
    (state: RootState) => state.PostFeed.leftSidebarOpen
  );
  const isComputerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isTabletScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const leftSidebar = isComputerScreen || isTabletScreen || leftSidebarOpen;

  return (
    <>
      {profileInformation && (
        <Dialog open={openPhotoModal} onClose={handlePhotoUploadClose}>
          <DialogTitle sx={{ paddingBottom: 0 }}>Photo Upload</DialogTitle>
          <Typography pt={1} pl={3} pr={3} variant="subtitle1" color="error">
            {error}
          </Typography>
          <Typography pt={1} pl={3} pr={3} variant="subtitle1" color="success">
            {success}
          </Typography>
          <Box p={3}>
            <Input type="file" onChange={handleOpenPhotoUpdate}></Input>
          </Box>

          <Button
            onClick={() => {
              dispatch(sendPhotoToDB({ photo, profileId }));
            }}
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              dispatch(setOpenPhotoModal());
              window.location.reload();
            }}
            color="primary"
          >
            Close
          </Button>
          <Typography sx={{ alignSelf: "center" }} color="red" fontSize="8px">
            {" "}
            (After uploading the photo, don't forget to click save!)
          </Typography>
          {profileInformation.profilePhoto.length > 1 && (
            <Button onClick={() => dispatch(removePhotoOnDB())}>
              Remove Photo
            </Button>
          )}
        </Dialog>
      )}
      {loading && <Loading />}
      {profileInformation && (
        <Dialog open={editProfileButton} onClose={handleProfileEditClose}>
          <DialogTitle
            sx={{
              paddingBottom: 0,
            }}
          >
            Edit Profile
          </DialogTitle>
          {error && error?.length > 0 && (
            <Typography pl={3} variant="subtitle1" color="error">
              {error}
            </Typography>
          )}
          {success && success.length > 0 && (
            <Typography pl={3} variant="subtitle1" color="success">
              {success}
            </Typography>
          )}
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                defaultValue={profileInformation.firstName}
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                defaultValue={profileInformation.lastName}
              />
              <TextField
                className="custom-textfield"
                margin="normal"
                required
                fullWidth
                id="dateOfBirth"
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={
                  profileInformation.dateOfBirth
                    ? new Date(profileInformation.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
              />

              <DialogActions>
                <Button type="submit" color="primary">
                  Save
                </Button>
                <Button onClick={handleProfileEditClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {profileInformation && (
        <div>
          <Header />
          <div style={{ display: "flex" }}>
            {leftSidebar && <Sidebar />}
            <Box
              p="20px"
              sx={{
                height: "80vh",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&-ms-overflow-style:": {
                  display: "none",
                },
              }}
            >
              <Box
                sx={{ backgroundColor: "#F6F6F6" }}
                borderRadius="5px"
                // width="70vw"
                width={isPhoneScreen ? "90vw" : "70vw"}
                display="flex"
                justifyContent="space-between"
                boxShadow="2"
              >
                <Box display="flex">
                  {myUserId == profileId ? (
                    <Box
                      onClick={() => openUploadModal()}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                        position: "relative",
                        "&:hover::after": {
                          content: '"Click to add photo"',
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "#fff",
                          fontSize: "16px",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          zIndex: 1,
                        },
                      }}
                    >
                      {profileInformation.profilePhoto.length == 0 ? (
                        <FaceIcon
                          sx={{
                            fontSize: isPhoneScreen ? "100px" : "170px",
                            "&:hover": {
                              filter: "blur(1px)",
                            },
                          }}
                        />
                      ) : (
                        <img
                          src={profileInformation.profilePhoto}
                          // width="150"
                          width={isPhoneScreen ? "100" : 150}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {profileInformation.profilePhoto.length == 0 ? (
                        <FaceIcon
                          sx={{
                            fontSize: "170px",
                          }}
                        />
                      ) : (
                        <img
                          src={profileInformation.profilePhoto}
                          width={
                            isPhoneScreen
                              ? "100"
                              : isTabletScreen
                              ? "120"
                              : "150"
                          }
                        />
                      )}
                    </Box>
                  )}
                  <Typography
                    fontWeight="bold"
                    fontSize={
                      isPhoneScreen ? "15px" : isTabletScreen ? "20px" : "28px"
                    }
                    mb={4}
                    ml={1}
                    alignSelf="self-end"
                  >
                    {profileInformation.firstName} {profileInformation.lastName}
                  </Typography>
                </Box>
                <Box display="flex">
                  {profileId == myUserId ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => dispatch(setEditProfile())}
                      sx={{
                        backgroundColor: "#d3cfcf",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#a5a3a3",
                        },
                      }}
                      color="black"
                      p={1}
                      borderRadius="5px"
                      alignSelf="self-end"
                      mb={4}
                      mr={2}
                    >
                      <EditIcon sx={{ mb: "2px" }} />
                      {!isPhoneScreen && <Typography>Edit Profile</Typography>}
                    </Box>
                  ) : isPendingFriendship ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{
                        backgroundColor: "#FFA500",
                        "&:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                      color="white"
                      p={1}
                      borderRadius="5px"
                      alignSelf="self-end"
                      mb={4}
                      mr={2}
                    >
                      <Typography>Pending</Typography>
                    </Box>
                  ) : !isMyFriend ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{
                        backgroundColor: "#0B60F2",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#094ec5",
                        },
                      }}
                      color="white"
                      p={1}
                      borderRadius="5px"
                      alignSelf="self-end"
                      mb={4}
                      mr={2}
                    >
                      <PersonAddIcon sx={{ mb: "2px" }} />
                      <Typography
                        onClick={() => dispatch(addFriend(profileId))}
                      >
                        Add Friend
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{
                        backgroundColor: "#d3cfcf",
                        // "&:hover": {
                        //   cursor: "pointer",
                        //   backgroundColor: "#a5a3a3",
                        // },
                      }}
                      color="black"
                      p={1}
                      borderRadius="5px"
                      alignSelf="self-end"
                      mb={4}
                      mr={2}
                    >
                      <Typography>Friend</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                p={2}
                mt={2}
                boxShadow={2}
                borderRadius="5px"
                sx={{ backgroundColor: "#F6F6F6" }}
              >
                <Typography fontSize="17px" fontWeight="bold">
                  INFO
                </Typography>
                <Box mt={2} display="flex" gap={1}>
                  <AccessTimeIcon />
                  <Typography>
                    Joined {formatDate(profileInformation.createdAt)}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" gap={1}>
                  <CakeIcon />
                  <Box mt="3px">
                    <Typography color="black" sx={{ lineHeight: "0.7" }}>
                      {formatDate(profileInformation.dateOfBirth)}
                    </Typography>
                    <Typography color="#373737" variant="caption">
                      Birth Date
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                p={2}
                mt={2}
                boxShadow={2}
                borderRadius="5px"
                sx={{ backgroundColor: "#F6F6F6" }}
              >
                <Typography fontSize="17px" fontWeight="bold">
                  POSTS
                </Typography>
              </Box>
              {newPosts &&
                newPosts.map((post) => (
                  <Box
                    key={post._id}
                    mt={3}
                    width={isPhoneScreen ? "89vw" : "70vw"}
                  >
                    <EachPost post={post} />
                  </Box>
                ))}
            </Box>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Profile;
