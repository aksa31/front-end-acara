import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    category: yup.string().required("Please select Category"),
    isPublished: yup.string().required("Please select status"),
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

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: async () => {
            const { data } = await categoryServices.getCategories();
            return data.data;
        },
    });

    return {
        control,
        dataCategory
    };
}

export default useEventFilter;