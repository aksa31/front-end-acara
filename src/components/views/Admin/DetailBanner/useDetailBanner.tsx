import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { toast } from "@heroui/react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";

const useDetailBanner = () => {
    const { query, isReady } = useRouter();


    const updateBanner = async (payload: IBanner) => {

        const data = await (bannerServices.updateBanner(
            `${query.id}`,
            payload
        ));
        return data.data;
    };

    const { mutate: mutateUpdateBanner, isPending: isPendingUpdateBanner, isSuccess: isSuccessUpdateBanner } = useMutation({
        mutationFn: (payload: IBanner) => updateBanner(payload),
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            refetchBanner();
            toast.success("Success Updated Banner successfully");
        },
    })

    const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data);

    const getBannerById = async () => {
        const { data } = await bannerServices.getBannerById(`${query.id}`);
        return data.data;
    }

    const { data: dataBanner, refetch: refetchBanner } = useQuery({
        queryKey: ["Banner"],
        queryFn: getBannerById,
        enabled: isReady
    })

    return {
        dataBanner,
        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner,
    }
}

export default useDetailBanner;