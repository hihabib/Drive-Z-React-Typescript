import {useContext} from "react";
import {StructureContext} from "../context/StructureContext/StructureContext.ts";

const UseStructure = () => {
    return useContext(StructureContext);
};

export default UseStructure;