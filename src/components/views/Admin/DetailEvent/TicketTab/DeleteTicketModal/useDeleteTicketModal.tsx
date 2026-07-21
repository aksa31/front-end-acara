import ticketServices from "@/services/ticket.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTicketModal = (onClose: () => void) => {

    const deleteTicket = async (id: string) => {
        const res = await ticketServices.deleteTicket(id);
        return res;
    };

    const { mutate: mutateDeleteTicket, isPending: isPendingDeleteTicket, isSuccess: isSuccessDeleteTicket } = useMutation({
        mutationFn: deleteTicket,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            toast.success("Delete Ticket Success");
            onClose();
        },
    
    })


    return {
        mutateDeleteTicket,
        isPendingDeleteTicket,
        isSuccessDeleteTicket
    }
}

export default useDeleteTicketModal;