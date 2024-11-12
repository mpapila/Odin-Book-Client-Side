export interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface PostForm {
  content: string;
}

export interface ErrorDetail {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface SidebarState {
  setNotificationBar: boolean;
  setActiveButton: string | null;
}

export interface UsersInfo {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  createdAt: string;
  status: string;
  error: null;
  profilePhoto: string;
}

export interface IncomingRequests {
  requestId: string;
  requesterId: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface mergedIncomingRequests {
  requestId: string;
  requesterId: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface myPendingFriendsListforRequesterUsersState {
  receiverId: string;
}

export interface myFriendsState {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  profilePhoto: string;
}
interface Friend {
  requesterId: string;
  receiverId: string;
  status: string;
  createdAt: string;
}
export interface UsersState {
  allUsers: UsersInfo[];
  myFriendsList: myFriendsState[];
  incomingFriendRequestList: IncomingRequests[];
  mergedIncomingRequestsList: mergedIncomingRequests[];
  myPendingFriendsListforRequesterUsers: myPendingFriendsListforRequesterUsersState[];
  status: string;
  error: null;
  friendships: Friend[];
}

export interface friendPostsType {
  _id: string;
  userId?: string;
  content: string;
  likes: string[];
  comments: Comment[];
  firstName: string;
  lastName: string;
  createdAt: string;
  profilePhoto: string;
}

export interface PostFeedState {
  isServerOkay: boolean;
  setCreatePost: boolean;
  rightSidebarOpen: boolean;
  friendPosts: friendPostsType[];
  leftSidebarOpen: boolean;
}

export interface PostReactionState {
  data: PostReactionData;
  likesCount: number;
  isLiked: boolean;
}
export interface PostReactionData {
  alreadyLiked?: boolean;
  postLikeCount?: number;
}

export interface NotificationState {
  setNotificationRead: boolean | null;
  allNotifications: {
    birthdaysToday: Birthdaystoday[];
    notifications: Notification[];
  };
}
export interface UserErrorState {
  setErrorMessage?: string | null;
}

export interface EachPostProps {
  post: friendPostsType;
}

export interface NameInfo {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  profilePhoto: string;
  __v: number;
}
export interface Post {
  _id: string;
  userId: string;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface EachPostDetail {
  post?: Post;
  nameInfo?: NameInfo;
}

export interface Comment {
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NewCommentBody {
  content: string;
  postId: string;
}

export interface Notification {
  createdAt: string;
  message: string;
  type: string;
  userId: string;
  _id: string;
  postId?: string;
}

export interface Birthdaystoday {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
}

export interface AllNotifications {
  birthdaysToday: Birthdaystoday[];
  notifications: Notification[];
}

export interface ProfileInformation {
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePhoto: string;
}
export interface UserProfilePost {
  content: string;
  userId: string;
}
export interface UserProfileOne {
  userProfileById: ProfileInformation;
  userPostById: friendPostsType[];
}

export interface UserProfile {
  // userProfileById: ProfileInformation;
  // userPostById: string;
  userProfile: UserProfileOne;
  posts: friendPostsType[];
  profileInformation: ProfileInformation;
  editProfileButton: boolean;
  myName: string;
  loading: boolean;
  error: string | null;
  success: string | null;

  // openPhotoModal: boolean;
}
