import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { IProfile } from "@/types/Auth";
import { toDateStandard } from "@/utils/date";
import { DateValue, toast } from "@heroui/react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";

const useDetailProfile = () => {
    const { isReady } = useRouter();

    const getProfile = async () => {
        const { data } = await authServices.getProfile();
        return data.data;
    }

    const { data: dataProfile, refetch: refetchProfile } = useQuery({
        queryKey: ["Profile"],
        queryFn: getProfile,
        enabled: isReady
    })
    const updateProfile = async (payload: IProfile) => {

        const data = await authServices.updateProfile(payload);
        return data.data;
    };

    const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile, isSuccess: isSuccessUpdateProfile } = useMutation({
        mutationFn: (payload: IProfile) => updateProfile(payload),
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            refetchProfile();
            toast.success("Success Updated Profile");
        },
    })

    const handleUpdateProfile = (data: IProfile) => {
        mutateUpdateProfile(data);
    };

    return {
        dataProfile,
        handleUpdateProfile,
        isPendingUpdateProfile,
        isSuccessUpdateProfile,
    }
}

export default useDetailProfile;