import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Auth } from "../model.ts";
import { structureSignal, userSignal } from "../signals";
import axios, { AxiosError } from "axios";
import { domain } from "../../server.ts";
import { isError } from "../utils/errorUtils.ts";
import { TStructure } from "../types/structure.ts";
import { TError } from "../types/error.ts";

const token = localStorage.getItem(Auth.TOKEN);
const savedUser = localStorage.getItem(Auth.USER);

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  if (userSignal.value === null) {
    if (savedUser === null || token === null) {
      return <Navigate to={"/signin"} />;
    } else {
      userSignal.value = JSON.parse(savedUser);
    }
  }

  useEffect(() => {
    /**
     * Update structure
     */
    const updateStructure = async () => {
      try {
        const { data } = await axios.get(
          `${domain}/api/v1/tree/getItems${location.pathname}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (isError(data)) {
          return console.error(data.errorMessage);
        }
        structureSignal.value = data as TStructure;
      } catch (error) {
        if (error instanceof AxiosError) {
          structureSignal.value = error.response?.data as TError;
          throw new Error(error.message);
        }
      }
    };
    updateStructure();
  }, [location.pathname]);

  return <div>{children}</div>;
};

export default PrivateRoute;
