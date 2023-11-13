import {IStructureState, StructureAction} from "../@types/reducer";
import {isObject} from "../utils/objectUtil.ts";
import {StructureActionType} from "../constants/structure.ts";

export const initialStructure = {
    folders: [], files: []
} as IStructureState
export const structureReducer = (state: IStructureState, action: StructureAction) => {
    switch (action.type) {
        case StructureActionType.setFolders:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach(element => {
                if (!isObject(element)) {
                    return state;
                }
            })
            return {...state, folders: [...action.payload]} as IStructureState
        case StructureActionType.setFiles:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach(element => {
                if (!isObject(element)) {
                    return state;
                }
            })
            return {...state, files: [...action.payload]} as IStructureState
        default:
            return state;
    }
}