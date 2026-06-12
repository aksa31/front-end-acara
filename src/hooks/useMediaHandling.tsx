import uploadServices from "@/services/upload.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
    const uploadIcon = async (
        file: File,
        callback: (fileUrl: string) => void
    ) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadServices.uploadFile(formData);
        const icon = response.data.data.secure_url;
        callback(icon);
    };

    const { mutate: mutateUploadFile, isPending: isPendingUploadFile } = useMutation({
        mutationFn: (variables: {
            file: File;
            callback: (fileUrl: string) => void
        }) => uploadIcon(variables.file, variables.callback),
        onError: (error) => {
            toast.danger(error.message);
        },
    });

    const deleteIcon = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({ fileUrl });
        if (res.data.meta.status === 200) {
            callback();
        }
    };

    const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } = useMutation({
        mutationFn: (variables: {
            fileUrl: string;
            callback: () => void
        }) => deleteIcon(variables.fileUrl, variables.callback),
        onError: (error) => {
            toast.danger(error.message);
        },
    });

    return {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile
    }
}

export default useMediaHandling