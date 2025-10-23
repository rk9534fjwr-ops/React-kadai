// 型定義
export interface UserData {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
}

export interface SearchCriteria {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  filterUnsentOnly: boolean;
}

export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data: UserData[];
}