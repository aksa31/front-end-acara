import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { ICategory } from "@/types/Category";
import { IEvent } from "@/types/Event";
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

    const handleUpdateEvent = (data: ICategory) => mutateUpdateEvent(data);

    return {
        dataEvent,
        handleUpdateEvent,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,
    }
}

export default useDetailEvent;