import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { ICategory } from "@/types/Category";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
const useDetailEvent = () => {
    const { query, isReady } = useRouter();

    const getEventById = async (id: string) => {
        const { data } = await eventServices.getEventById(id);
        return data.data;
    }

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["Event"],
        queryFn: () => getEventById(`${query.id}`),
        enabled: isReady
    })

    const updateEvent = async (payload: IEvent) => {

        const data = await (eventServices.updateEvent(
            `${query.id}`,
            payload
        ));
        return data.data;
    };

    const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent, isSuccess: isSuccessUpdateEvent } = useMutation({
        mutationFn: (payload: ICategory) => updateEvent(payload),
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            refetchEvent();
            toast.success("Success Updated Category successfully");
        },
    })

    const handleUpdateEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: data.isFeatured === "true",
            isPublished: data.isPublished === "true",
            isOnline: data.isOnline === "true",
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
            location: {
                region: data.region ? data.region : "",
                coordinates: [Number(data.latitude), Number(data.longitude)],
            },
            banner: data.banner
        };
        mutateUpdateEvent(payload);
    };


    return {
        dataEvent,
        handleUpdateEvent,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,
    }
}

export default useDetailEvent;