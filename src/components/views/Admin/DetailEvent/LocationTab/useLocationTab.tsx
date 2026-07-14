import useMediaHandling from '@/hooks/useMediaHandling';
import categoryServices from '@/services/category.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateValue } from '@internationalized/date';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useState } from 'react';
import eventServices from '@/services/event.service';
import useDebounce from '@/hooks/useDebounce';
import { DELAY } from '@/constants/list.constants';

const schemaUpdateLocation = yup.object().shape({
    isOnline: yup.string().required("Please select online or offline "),
    address: yup.string().required("Please input address"),
    region: yup.string().required("Please select region"),
    latitude: yup.number().required("Please input latitude coordinate"),
    longitude: yup.number().required("Please input longitude coordinate"),
});


const useLocationTab = () => {
    const router = useRouter();
    const debounce = useDebounce();
    const {
        control: controlUpdateLocation,
        handleSubmit: handleSubmitUpdateLocation,
        formState: { errors: errorsUpdateLocation },
        reset: resetUpdateLocation,
        setValue: setValueUpdateLocation,
    } = useForm({
        resolver: yupResolver(schemaUpdateLocation),
    });

    const [searchRegency, setSearchRegency] = useState("");
    const [regionInput, setRegionInput] = useState("");

    const { data: dataRegion } = useQuery({
        queryKey: ["Region", searchRegency],
        queryFn: async () => {
            const { data } = await eventServices.searchLocationByRegency(
                `${searchRegency}`,
            );
            return data.data;
        },
        enabled: searchRegency !== "",
    });

    const handleSearchRegion = (region: string) => {
        setRegionInput(region);
        debounce(() => setSearchRegency(region), DELAY);
    };

    return {
        controlUpdateLocation,
        errorsUpdateLocation,
        handleSubmitUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation,

        dataRegion,
        handleSearchRegion,
        searchRegency,
        regionInput,
    }
}

export default useLocationTab;