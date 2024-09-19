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
}

export interface UsersState {
  setUsersInfo: UsersInfo[];
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
