import { ReactNode } from "react";
import classes from "./PageTitle.module.css";
interface PageTitleProps {
    children: ReactNode;
}
const PageTitle = ({ children }: PageTitleProps) => {
    return <h2 className={`${classes.title} w-100`}>{children}</h2>;
};

export default PageTitle;
