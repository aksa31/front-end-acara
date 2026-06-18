import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from 'yup';



const useDetailCategory = () => {
    const { query, isReady } = useRouter();


    const updateCategory = async (payload: ICategory) => {

        const data = await (categoryServices.updateCategory(
            `${query.id}`,
            payload
        ));
        return data.data;
    };

    const { mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory, isSuccess: isSuccessUpdateCategory } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            refetchCategory();
            toast.success("Success Updated Category successfully");
        },
    })

    const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

    const getCategoryById = async (id: string) => {
        const { data } = await categoryServices.getCategoryById(id);
        return data.data;
    }

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getCategoryById(`${query.id}`),
        enabled: isReady
    })

    return {
        dataCategory,
        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory,
    }
}

export default useDetailCategory;