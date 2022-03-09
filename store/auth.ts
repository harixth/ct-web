import { atom, AtomEffect, selector } from "recoil";

const localStorageEffect =
  (key: string): AtomEffect<string> =>
  ({ setSelf, onSet }) => {
    if (typeof localStorage !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue && savedValue !== "undefined") {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

const authState = atom({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [localStorageEffect("accessToken")],
});

const isAuthorized = selector({
  key: "isAuthorized",
  get: ({ get }) => {
    const savedValue = get(authState);
    return savedValue;
  },
});

export { authState, isAuthorized };
