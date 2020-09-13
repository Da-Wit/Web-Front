import React from "react";
export { default as Home } from "./Home";
export { default as School } from "./School";
export { default as Club } from "./aboutClub/Club";
export { default as Community } from "./aboutClub/Community";
export { default as Write } from "./aboutClub/Write";
export { default as Login } from "./aboutUser/Login";
export { default as Join } from "./aboutUser/Join";
export { default as Article } from "./aboutClub/Article";
const AuthContext = React.createContext(null);
export { AuthContext };
