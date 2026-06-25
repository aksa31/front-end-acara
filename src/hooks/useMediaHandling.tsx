import uploadServices from "@/services/upload.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
    const uploadFile = async (
        file: File,
        callback: (fileUrl: string) => void
    ) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadServices.uploadFile(formData);
        const fileUrl = response.data.data.secure_url;
        callback(fileUrl);
    };

    const { mutate: mutateUploadFile, isPending: isPendingUploadFile } = useMutation({
        mutationFn: (variables: {
            file: File;
            callback: (fileUrl: string) => void
        }) => uploadFile(variables.file, variables.callback),
        onError: (error) => {
            toast.danger(error.message);
        },
    });

    const deleteFile = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({ fileUrl });
        if (res.data.meta.status === 200) {
            callback();
        }
    };

    const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } = useMutation({
        mutationFn: (variables: {
            fileUrl: string;
            callback: () => void
        }) => deleteFile(variables.fileUrl, variables.callback),
        onError: (error) => {
            toast.danger(error.message);
        },
    });

    const handleUploadFile = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
        callback: (fileUrl? : string) => void,
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback,
            });
        }
    };

    const handleDeleteFile = (
        fileUrl: FileList | string | undefined,
        callback: () => void,
    ) => {
        if (typeof fileUrl === "string") {
            mutateDeleteFile({
                fileUrl,
                callback,
            });
        } else {
            callback()
        }
    };

    return {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    }
}

export default useMediaHandling