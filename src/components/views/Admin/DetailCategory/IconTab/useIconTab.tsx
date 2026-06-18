import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schemaUpdateIcon = yup.object().shape({
    icon: yup
        .mixed<FileList | string>()
        .required("Please input icon of category")
})

const useIconTab = () => {

    const {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile,
    } = useMediaHandling();

    const {
        control: controlUpdateIcon,
        handleSubmit: handleSubmitUpdateIcon,
        formState: { errors: errorsUpdateIcon },
        reset: resetUpdateIcon,
        watch: watchUpdateIcon,
        getValues: getValuesUpdateIcon,
        setValue: setValueUpdateIcon,
    } = useForm({
        resolver: yupResolver(schemaUpdateIcon),
    });

    const preview = watchUpdateIcon("icon");

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl) => {
                    setValueUpdateIcon("icon", fileUrl);
                },
            });
        }
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        const fileUrl = getValuesUpdateIcon("icon");
        if (typeof fileUrl === "string") {
            mutateDeleteFile({
                fileUrl,
                callback: () => onChange(undefined),
            });
        }
    };

    return {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingDeleteFile,
        isPendingUploadFile,
        controlUpdateIcon,
        handleSubmitUpdateIcon,
        resetUpdateIcon,
        errorsUpdateIcon,
        preview,
    };
}

export default useIconTab;