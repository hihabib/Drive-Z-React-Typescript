import { IStructureState, StructureAction } from "../@types/reducer";
import { isObject } from "../utils/objectUtil.ts";
import { StructureActionType } from "../constants/structure.ts";

export const initialStructure = {
    directories: [],
    files: [],
    isEmpty: { files: false, directories: false },
    isDirNotFound: false,
    currentDirectoryId: "",
} as IStructureState;
export const structureReducer = (
    state: IStructureState,
    action: StructureAction,
) => {
    switch (action.type) {
        case StructureActionType.addDirectories:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach((element) => {
                if (!isObject(element)) {
                    return state;
                }
            });
            return {
                ...state,
                directories: [...state.directories, ...action.payload],
            } as IStructureState;
        case StructureActionType.removeDirectories:
            if ("ids" in action.payload && Array.isArray(action.payload.ids)) {
                const directories = [...state.directories];
                action.payload.ids.forEach((id: string) => {
                    const index = state.directories.findIndex((directory) => {
                        return directory.id === id;
                    });
                    if (index !== -1) {
                        directories.splice(index, 1);
                    }
                });
                return { ...state, directories: [...directories] };
            }
            return state;
        case StructureActionType.setDirectories:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach((element) => {
                if (!isObject(element)) {
                    return state;
                }
            });
            return {
                ...state,
                directories: [...action.payload],
            } as IStructureState;
        case StructureActionType.setFiles:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach((element) => {
                if (!isObject(element)) {
                    return state;
                }
            });
            return { ...state, files: [...action.payload] } as IStructureState;
        case StructureActionType.setFileEmptyStatus:
            if ("files" in action.payload) {
                return {
                    ...state,
                    isEmpty: { ...state.isEmpty, files: action.payload.files },
                };
            }
            return state;
        case StructureActionType.setDirectoryEmptyStatus:
            if ("directories" in action.payload) {
                return {
                    ...state,
                    isEmpty: {
                        ...state.isEmpty,
                        directories: action.payload.directories,
                    },
                };
            }
            return state;
        case StructureActionType.dirNotFound:
            if ("isDirNotFound" in action.payload) {
                return {
                    ...state,
                    isDirNotFound: action.payload.isDirNotFound,
                };
            }
            return state;
        case StructureActionType.setCurrentDirectoryId:
            if ("currentDirectoryId" in action.payload) {
                return {
                    ...state,
                    currentDirectoryId: action.payload.currentDirectoryId,
                };
            }
            return state;
        default:
            return state;
    }
};
