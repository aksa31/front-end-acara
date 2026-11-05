import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
    const router = useRouter();

    const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(`${router.query.id}`);
        return data.data;
    };

    const { data: dataTransaction, isPending: isPendingTransaction } = useQuery({
        queryKey: ["Transaction", router.query.id],
        queryFn: getOrderById,
        enabled: router.isReady,
    });

    const getEventById = async () => {
        const { data } = await eventServices.getEventById(`${dataTransaction?.events}`);
        return data.data;
    };

    const { data: dataEvent} = useQuery({
        queryKey: ["EventById", dataTransaction?.events],
        queryFn: getEventById,
        enabled: !!dataTransaction?.events,
    });

    
    const getTicketsById = async () => {
        const { data } = await ticketServices.getTicketsById(`${dataTransaction?.ticket}`);
        return data.data;
    };

    const { data: dataTicket, isPending: isPendingDataTicket } = useQuery({
        queryKey: ["Tickets",  dataTransaction?.ticket],
        queryFn: getTicketsById,
        enabled: !!dataTransaction?.ticket,
    });


    return {
        dataTransaction,
        dataEvent,
        dataTicket
    }
}

export default useDetailTransaction;