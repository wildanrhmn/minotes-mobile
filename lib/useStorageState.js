import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

function useAsyncState(initialValue) {
  return React.useReducer((state, action) => action, initialValue);
}

export async function setStorageItemAsync(key, value) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key) {
  // Public
  const [state, setState] = useAsyncState(null);
  const [isLoading, setLoading] = React.useState(true); // Add loading state

  // Get
  React.useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
    setLoading(false); // Set loading to false after fetching data
  }, [key]);

  // Set
  const setValue = React.useCallback(
    async (value) => {
      setLoading(true); // Set loading to true before setting data
      await setStorageItemAsync(key, value); // Wait for storage to be updated
      setState(value);
      setLoading(false); // Set loading to false after setting data
    },
    [key]
  );

  return { session: state, setSession: setValue, isLoading };
}
