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

export interface UsersState {
  setUsersInfo: UsersInfo[];
  incomingFriendRequestList: IncomingRequests[];
  mergedIncomingRequestsList: mergedIncomingRequests[];
  status: string;
  error: null;
}

export interface PostFeedState {
  setCreatePost: boolean;
}
export interface NotificationState {
  setNotificationRead: boolean;
}
export interface UserErrorState {
  setErrorMessage?: string | null;
}
