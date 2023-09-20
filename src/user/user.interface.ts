export interface IUserData {
  wallet: string;
}

export interface IUserRO {
  user: IUserData;
}

export interface IUserDataSimple {
  id: number;
  wallet: string;
  plan_code: string;
}

export interface IUserROSimple {
  user: IUserDataSimple;
}
