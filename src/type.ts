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
}

export interface UsersState {
  allUsers: UsersInfo[];
  myFriendsList: myFriendsState[];
  incomingFriendRequestList: IncomingRequests[];
  mergedIncomingRequestsList: mergedIncomingRequests[];
  myPendingFriendsListforRequesterUsers: myPendingFriendsListforRequesterUsersState[];
  status: string;
  error: null;
}

export interface friendPostsType {
  _id: string;
  content: string;
  likes: string[];
  comments: string[];
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface PostFeedState {
  setCreatePost: boolean;
  friendPosts: friendPostsType[];
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
  setNotificationRead: boolean;
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
  __v: number;
}
export interface Post {
  _id: string;
  userId: string;
  content: string;
  likes: string[];
  comments: Comment;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface EachPostDetail {
  post?: Post;
  nameInfo?: NameInfo;
}

export interface Comment {
  map(
    arg0: (
      eachComment: Comment,
      index: import("react").Key | null | undefined
    ) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  userId: string;
  content: string;
  createdAt: string;
}

export interface NewCommentBody {
  content: string;
  postId: string;
}
