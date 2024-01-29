import {FormEvent, RefObject, useEffect, useRef, useState} from "react";
import {FieldInputProps, useFormik} from "formik";
import axios from "axios";
import {Auth} from "../model.ts";
import {domain} from "../../server.ts";

const token = localStorage.getItem(Auth.TOKEN) as string;

interface useUserParam {
    initialItemName: string;
    id: string;
}

export interface UseRename {
    currentItemName: string;
    isRenameActive: boolean;
    handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
    getFieldProps: (nameOrOptions: string) => FieldInputProps<any>;
    renameRef: RefObject<HTMLInputElement>;
    renameItem: () => void;
}

const useRename = ({initialItemName, id}: useUserParam): UseRename => {
    const [currentItemName, setItemName] = useState(initialItemName);
    const [isRenameActive, setIsRenameActive] = useState(false);
    const renameRef = useRef<HTMLInputElement>(null);
    const renameItem = () => {
        setIsRenameActive(true);
    };
    // auto focus input
    useEffect(() => {
        let deactivateRenameHandler: (e: Event) => void;
        const renameInput = renameRef.current;
        if (isRenameActive) {
            renameInput?.focus();
            deactivateRenameHandler = (e: Event) => {
                if ("key" in e) {
                    if ("Escape" === e.key) {
                        setIsRenameActive(false);
                    }
                    return;
                }
                setIsRenameActive(false);
            };
            renameInput?.addEventListener("focusout", deactivateRenameHandler);
            renameInput?.addEventListener("keydown", deactivateRenameHandler);

            return () => {
                renameInput?.removeEventListener(
                    "focusout",
                    deactivateRenameHandler,
                );

                renameInput?.removeEventListener(
                    "keydown",
                    deactivateRenameHandler,
                );
            };
        }
    }, [isRenameActive]);
    const {handleSubmit, getFieldProps} = useFormik({
        initialValues: {
            [id]: currentItemName,
        },
        onSubmit: async (values) => {
            setIsRenameActive(false);

            setItemName("Loading...");
            const response = await axios.post(
                `${domain}/api/v1/options/rename/${id}`,
                {
                    newName: values[id],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (200 === response.status) {
                setItemName(values[id]);
            }
        },
    });
    return {
        currentItemName,
        isRenameActive,
        handleSubmit,
        getFieldProps,
        renameRef,
        renameItem,
    };
};

export default useRename;
