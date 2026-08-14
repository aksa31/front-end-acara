import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    category: yup.string(),
    isOnline: yup.string(),
    isFeatured: yup.string().required("Please select featured"),
});

const useEventFilter = () => {
    const router = useRouter();
    const {
        control,
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const { data: dataCategory, isSuccess: isSuccessGetCategory, isLoading: isLoadingCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: async () => {
            const { data } = await categoryServices.getCategories();
            return data.data;
        },
    });

    return {
        control,
        dataCategory,
        isSuccessGetCategory,
        isLoadingCategory,
        setValue
    };
}

export default useEventFilter;