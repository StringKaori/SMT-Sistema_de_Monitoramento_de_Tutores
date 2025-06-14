import * as SecureStore from "expo-secure-store";

// MARK: - Auth Token
export async function saveToken(token: string) {
  await SecureStore.setItemAsync("authToken", token);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("authToken");
}

export async function removeToken() {
  await SecureStore.deleteItemAsync("authToken");
}

// MARK: - User ID
export async function saveUserID(userID: string) {
  await SecureStore.setItemAsync("userID", userID);
}

export async function getUserID(): Promise<string | null> {
  return await SecureStore.getItemAsync("userID");
}

export async function removeUserID() {
  await SecureStore.deleteItemAsync("userID");
}
