import {useContext} from "react";
import {StructureContext} from "../context/StructureContext/StructureContext.ts";

const UseStructureContext = () => {
    return useContext(StructureContext);
};

export default UseStructureContext;