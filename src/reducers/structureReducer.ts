export enum StructureActionType {
    setFolders = 'SET_FOLDERS',
    setFiles = 'SET_FILES'
}

export interface StructureAction {
    type: StructureActionType,
    payload: string | string[] | ({ type: string[], values: string[] })[]
}

export interface IStructureState {
    folders: string[],
    files: string[]
}

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
                if ('string' !== typeof element) {
                    return state;
                }
            })
            return {...state, folders: [...action.payload]} as IStructureState
        case StructureActionType.setFiles:
            if (!Array.isArray(action.payload)) {
                return state;
            }
            action.payload.forEach(element => {
                if ('string' !== typeof element) {
                    return state;
                }
            })
            return {...state, files: [...action.payload]} as IStructureState
        default:
            return state;
    }
}