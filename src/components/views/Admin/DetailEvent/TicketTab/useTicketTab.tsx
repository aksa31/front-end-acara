import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { toast } from "@heroui/react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from "next/router";

const useTicketTab = () => {
const { query, isReady } = useRouter();

    const getTicketsByEventId = async () => {
        const { data } = await ticketServices.getTicketsByEventId(`${query.id}`);
        return data.data;
    }

    const { 
        data: dataTicket, 
        refetch: refetchTicket, 
        isPending : isPendingTicket,
        isRefetching: isRefetchingTicket,
     } = useQuery({
        queryKey: ["Ticket"],
        queryFn: getTicketsByEventId,
        enabled: isReady
    })


    return {
        dataTicket,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket
    }
}

export default useTicketTab