import { CRUDScreenData } from "@common/types/CRUDScreenData";
import {
  BooleanSetter,
  StringOrUndefinedSetter,
} from "@common/types/SetStateType";
import { User } from "@common/types/User";

export interface ProfileViewModel {
  user: User | undefined;

  isModalVisible: boolean;
  setIsModalVisible: BooleanSetter;
  imageBase64: string | undefined;
  setImageBase64: StringOrUndefinedSetter;

  isAdmin: boolean | undefined;

  logOut: () => void;
  navigateTo: (params: CRUDScreenData) => void;
  navigateToResetPassword: () => void;
}
