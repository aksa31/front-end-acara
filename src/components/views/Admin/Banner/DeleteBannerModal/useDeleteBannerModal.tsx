import bannerServices from "@/services/banner.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = (onClose: () => void) => {
    const deleteBanner = async (id: string) => {
        const res = await bannerServices.deleteBanner(id);
        return res;
    };

    const { mutate: mutateDeleteBanner, isPending: isPendingDeleteBanner, isSuccess: isSuccessDeleteBanner } = useMutation({
        mutationFn: deleteBanner,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            toast.success("Delete Banner Success");
            onClose();
        },
    })


    return {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    }
}

export default useDeleteBannerModal;