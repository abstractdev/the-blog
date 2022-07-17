import { ProfileData } from "./ProfileData";

export interface UserInterface extends ProfileData {
  isLoggedIn: boolean;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
}

export type UserType = {
  defaultUser: UserInterface;
};
