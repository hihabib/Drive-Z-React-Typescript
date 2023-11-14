import {MutableRefObject, useCallback, useEffect, useState} from "react";
import {SelectedItems} from "../@types/selection";

interface useSelectionParams {
    type: 'file' | 'directory',
    id: string,
    ref: MutableRefObject<HTMLDivElement>
}

const useSelection = ({type, id, ref}: useSelectionParams) => {
    const [selection, setSelection] = useState({
        files: {}, directories: {}
    } as SelectedItems);
    const isSelected = useCallback((): boolean => {
        const items = 'file' === type ? selection.files : selection.directories;
        return Boolean(items[id] ?? false);
    }, [id, selection.directories, selection.files, type])
    const selectedItemAction = useCallback((action: 'ADD' | 'REMOVE'): void => {
        const items = 'file' === type ? selection.files : selection.directories;
        switch (action) {
            case "ADD":
                items[id] = true;
                break;
            case "REMOVE":
                delete items[id];
                break;
        }
        setSelection(prevSelections => {
            const newSelectedItems: SelectedItems = {
                ...prevSelections, ['file' === type ? 'files' : 'directories']: {...items}
            }
            return newSelectedItems;
        })
    }, [id, selection.directories, selection.files, type])

    useEffect(() => {
        const removeHandler = (e: Event) => {
            if (!ref.current.contains(e.target) && isSelected()) {
                selectedItemAction('REMOVE')
            }
        }
        window.addEventListener('mousedown', removeHandler);
        return () => {
            window.removeEventListener('mousedown', removeHandler);
        }
    }, [selectedItemAction, ref, isSelected])


    return {files: selection.files, directories: selection.directories, isSelected, selectedItemAction}
}

export default useSelection;