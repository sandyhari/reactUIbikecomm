import { atom } from "recoil";

export const loggedinUserState = atom({
  key: "loggedinUserState", //key should be unique
  default: {}
});


export const jwtState = atom({
  key: "jwtState", //key should be unique
  default: ""
});