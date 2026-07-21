import categoryServices from "@/services/category.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = (onClose: () => void) => {
    const deleteCategory = async (id: string) => {
        const res = await categoryServices.deleteCategory(id);
        return res;
    };

    const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory, isSuccess: isSuccessDeleteCategory } = useMutation({
        mutationFn: deleteCategory,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            toast.success("Delete Category Success");
            onClose();
        },
        

    })


    return {
        mutateDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory
    }
}

export default useDeleteCategoryModal;