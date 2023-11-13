import {IStructureState, StructureAction} from "../@types/reducer";
import {isObject} from "../utils/objectUtil.ts";
import {StructureActionType} from "../constants/structure.ts";

export const initialStructure = {
    folders: [],
    files: [],
    selectedIds: {
        ids: {}
    },
    isEmpty: {files: false, folders: false}
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
        case StructureActionType.setSelectionId:
            if(!Array.isArray(action.payload) && 'ids' in action.payload){
                return {
                    ...state,
                    selectedIds: {
                            ids: {
                                ...state.selectedIds.ids,
                                ...action.payload.ids,
                            }
                    }
                };
            }
            return state;
        case StructureActionType.setFileEmptyStatus:
            if('files' in action.payload ){
                return {...state, isEmpty: {...state.isEmpty, files: action.payload.files}}
            }
            return state;
        case StructureActionType.setFolderEmptyStatus:
            if('folders' in action.payload){
                return {...state, isEmpty: {...state.isEmpty, folders: action.payload.folders}}
            }
            return state;
        default:
            return state;
    }
}