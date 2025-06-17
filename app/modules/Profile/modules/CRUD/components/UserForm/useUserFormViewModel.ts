import { APIError } from "@common/axios";
import { createUser } from "@common/axios/admin/users/users";
import { useState } from "react";
import { UserFormViewModel } from "./types/UserFormViewModel";

const useUserFormViewModel = (): UserFormViewModel => {
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);

  const handlePress = async () => {
    setShowError(false);
    if (!fullName || !email) {
      setShowError(true);
      return;
    }

    await createUser(fullName, email, onError, onSuccess);
  };

  const onError = (e: APIError) => {
    console.error(e.message);
  };

  const onSuccess = () => {
    console.log("Deu bão, ta no banco");
  };

  return {
    fullName,
    setFullName,

    email,
    setEmail,

    showError,
    handlePress,
    onError,
    onSuccess,
  };
};

export { useUserFormViewModel };
