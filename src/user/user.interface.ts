export interface IUserData {
  wallet: string;
}

export interface IUserRO {
  user: IUserData;
}

export interface ICanCreateUserRO {
  result: boolean;
}

export interface IUserDataSimple {
  id: number;
  wallet: string;
  plan_code: string;
  was_trial: boolean;
}

export interface IUserROSimple {
  user: IUserDataSimple;
}
