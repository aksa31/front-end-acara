import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";
import orderServices from "@/services/order.service";
import { toast } from "@heroui/react";

const useDetailEvent = () => {
    const router = useRouter();

    const getEventBySlug = async () => {
        const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
        return data.data;
    };

    const { data: dataEvent, isPending: isPendingEvent } = useQuery({
        queryKey: ["Event", router.query.slug],
        queryFn: getEventBySlug,
        enabled: router.isReady,
    });

    const getTicketsByEventId = async () => {
        const { data } = await ticketServices.getTicketsByEventId(`${dataEvent?._id}`);
        return data.data;
    };

    const { data: dataTicket, isPending: isPendingDataTicket } = useQuery({
        queryKey: ["Tickets", dataEvent?._id],
        queryFn: getTicketsByEventId,
        enabled: !!dataEvent?._id,
    });

    const [cart, setCart] = useState<ICart>(defaultCart);

    const dataTicketInCart = useMemo(() => {
        if (dataTicket) {
            return dataTicket.find((ticket: ITicket) => ticket._id === cart?.ticket);
        }
        return null;
    }, [dataTicket, cart]);

    const handleAddToCart = (ticket: string) => {
        setCart({
            events: dataEvent._id as string,
            ticket,
            quantity: 1,
        });
    };

    const handleChangeQuantity = (type: "increment" | "decrement") => {
        if (type === "increment") {
            if (cart?.quantity < dataTicketInCart?.quantity) {
                setCart((prev: ICart) => ({
                    ...prev,
                    quantity: prev.quantity + 1,
                }));
            }
        } else if (type === "decrement") {
            if (cart?.quantity <= 1) {
                setCart(defaultCart);
            } else {
                setCart((prev: ICart) => ({
                    ...prev,
                    quantity: prev.quantity - 1,
                }));
            }
        }
    };

    const createOrder = async () => {
        const { data } = await orderServices.createOrder(cart);
        return data.data;
    }

    const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: (result) => {
            const transactionToken = result.payment.token;
            (window as any).snap.pay(transactionToken);
            toast.success("Banner added successfully");

        },
    })

    return {
        dataEvent,
        isPendingEvent,
        dataTicket,
        isPendingDataTicket,
        dataTicketInCart,
        cart,
        handleAddToCart,
        handleChangeQuantity,
        mutateCreateOrder,
        isPendingCreateOrder,
    };
};

export default useDetailEvent;
