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
        mutationFn: (payload: IEvent) => updateEvent(payload),
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
            name: data.name,
            slug: data.slug,
            category: data.category,
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
            isPublished: data.isPublished === "true",
            isFeatured: data.isFeatured === "true",
            description: data.description,
        };
        mutateUpdateEvent(payload);
    };

    const handleUpdateCover = (data: IEventForm) => {
    const payload = {
        banner: data.banner,
    };
    mutateUpdateEvent(payload);
};

    const handleUpdateLocation = (data: IEventForm) => {
        const payload = {
            isOnline: data.isOnline === "true",
            location: {
                region: data.region ? data.region : "",
                coordinates: [Number(data.latitude), Number(data.longitude)],
            },
            // banner: data.banner,
        };
        mutateUpdateEvent(payload);
    };


    const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } = useQuery({
        queryKey: ["defaultRegion", dataEvent?.location?.region],
        queryFn: async () => {
            const { data } = await eventServices.getRegencyById(`${dataEvent?.location?.region}`);
            return data?.data?.[0]?.name;
        },
        enabled: !!dataEvent?.location?.region,
    })

    return {
        dataEvent,
        handleUpdateEvent,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,
        handleUpdateLocation,
        handleUpdateCover,

        dataDefaultRegion,
        isPendingDefaultRegion,
    }
}

export default useDetailEvent;