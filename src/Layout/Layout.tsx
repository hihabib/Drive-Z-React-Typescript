import { FloatingLabel, Form, FormControl } from "react-bootstrap";
import { IoSettingsOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";
import { effect, signal } from "@preact/signals-react";
import { useEffect, useState } from "react";
import Details from "../components/Details/Details.tsx";

const detailsSignal = signal(false);
export const showDetails = (status: boolean) => {
  detailsSignal.value = status;
};
const Layout = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(detailsSignal.value);
  useEffect(() => {
    effect(() => {
      setIsDetailsVisible(detailsSignal.value);
    });
  }, []);
  return (
    <>
      <header className={"d-flex align-items-center gap-4 px-3 pt-3"}>
        <div className={`d-flex align-items-center ${classes.headerLeft}`}>
          <div className={`${classes.logo} d-flex align-items-center gap-2`}>
            <img
              src="http://placehold.co/104x44"
              style={{ height: "40px", width: "40px" }}
              alt="drive-z"
            />
            <span>Drive-Z</span>
          </div>
        </div>
        <div
          className={`d-flex justify-content-between align-items-center ${classes.headerRight}`}
        >
          <Form className={`w-75`}>
            <FloatingLabel className={classes.topSearch} label={"Search..."}>
              <FormControl
                className={"rounded-5 ps-4"}
                placeholder={"Search..."}
              />
            </FloatingLabel>
          </Form>
          <div className={`${classes.options} d-flex gap-3`}>
            <div className={`d-flex align-items-center`}>
              <IoSettingsOutline />
            </div>
            <div className={`d-flex align-items-center`}>
              <BiUserCircle />
            </div>
          </div>
        </div>
      </header>
      <main className={`d-flex gap-4 px-3 my-2 h-100`}>
        <aside className={`${classes.sidebar}`}>
          <Sidebar />
        </aside>
        <div
          style={{
            width: isDetailsVisible ? "60%" : "80%",
          }}
          className={`${classes.mainContent}  shadow-sm p-4 rounded-4`}
        >
          <Outlet />
        </div>
        {isDetailsVisible ? (
          <div
            style={{
              width: "20%",
            }}
            className={`${classes.mainContent}  shadow-sm p-4 rounded-4`}
          >
            <Details />
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Layout;
