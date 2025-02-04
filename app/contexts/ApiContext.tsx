import {createContext, useContext} from "react";
import {Api} from "@/app/contexts/Api";

export const ApiContextRef = createContext<Api>(new Api());

const useApis = () => {
  return useContext(ApiContextRef);
}

export default useApis;