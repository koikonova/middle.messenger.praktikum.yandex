export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  data?: unknown
}

export interface ChangePassword {
  oldPassword: string
  newPassword: string
}

export interface State {
  user: User
  chats: ChatInfo[]
  // messages: Record<number, Message[]>
  selectedChat?: number
}

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

export interface CorrespondenceProps{
  last_message: number;
  title: string;
  unread_count: number;
  events: {
    click: () => void;
  }
}
