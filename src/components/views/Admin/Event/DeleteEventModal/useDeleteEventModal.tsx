import eventServices from "@/services/event.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = (onClose: () => void) => {
    const deleteEvent = async (id: string) => {
        const res = await eventServices.deleteEvent(id);
        return res;
    };

    const { mutate: mutateDeleteEvent, isPending: isPendingDeleteEvent, isSuccess: isSuccessDeleteEvent } = useMutation({
        mutationFn: deleteEvent,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            toast.success("Delete Event Success");
            onClose();
        },
    })


    return {
        mutateDeleteEvent,
        isPendingDeleteEvent,
        isSuccessDeleteEvent
    }
}

export default useDeleteEventModal;