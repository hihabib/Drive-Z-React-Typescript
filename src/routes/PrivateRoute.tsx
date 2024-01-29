import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../model.ts";
import { structureSignal, userSignal } from "../signals";
import axios from "axios";
import { domain } from "../../server.ts";
import { isError } from "../utils/errorUtils.ts";
import { TStructure } from "../types/structure.ts";

const token = localStorage.getItem(Auth.TOKEN);
const savedUser = localStorage.getItem(Auth.USER);

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (userSignal.value === null) {
    if (savedUser === null || token === null) {
      return <Navigate to={"/signin"} />;
    } else {
      userSignal.value = JSON.parse(savedUser);

      /**
       * Update structure
       */
      const updateStructure = async () => {
        try {
          const { data } = await axios.get(`${domain}/api/v1/tree/getItems`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (isError(data)) {
            return console.error(data.errorMessage);
          }
          structureSignal.value = data as TStructure;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      };
      updateStructure();
    }
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
