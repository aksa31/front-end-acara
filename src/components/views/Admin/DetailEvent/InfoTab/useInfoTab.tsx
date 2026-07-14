import useMediaHandling from '@/hooks/useMediaHandling';
import categoryServices from '@/services/category.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateValue } from '@internationalized/date';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as yup from 'yup';

const schemaUpdateInfo = yup.object().shape({
    name: yup.string().required("Please input Name Event"),
    slug: yup.string().required("Please input Slug"),
    category: yup.string().required("Please select Category"),
    startDate: yup.mixed<DateValue>().required("Please select start date"),
    endDate: yup.mixed<DateValue>().required("Please select end date"),
    isPublished: yup.string().required("Please select status"),
    isFeatured: yup.string().required("Please select featured"),
    description: yup.string().required("Please input Description "),
    // isOnline: yup.string().required("Please select online or offline "),
    // region: yup.string().required("Please select region"),
    // latitude: yup.number().required("Please input latitude coordinate"),
    // longitude: yup.number().required("Please input longitude coordinate"),
});


const useInfoTab = () => {
    const router = useRouter();
    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: async () => {
            const { data } = await categoryServices.getCategories();
            return data.data;
        },
        enabled: router.isReady,
    });

    return {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        dataCategory,
    }
}

export default useInfoTab;