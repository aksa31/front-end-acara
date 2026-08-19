import { Breadcrumbs, BreadcrumbsItem, Card, Skeleton, Tabs } from "@heroui/react";
import useDetailEvent from "./useDetailEvent"
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";

const DetailEvent = () => {
    const {
        dataEvent,
        isPendingEvent,
        dataTicket,
        cart,
        dataTicketInCart,
        handleAddToCart,
        handleChangeQuantity,
        mutateCreateOrder,
        isPendingCreateOrder,
    } = useDetailEvent();
    return (
        <div className="px-8 md-px-0">
            <Script
                src={environment.MIDTRANS_SNAP_URL}
                data-client-key={environment.MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
            {!isPendingEvent ? (
                <Breadcrumbs>
                    <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
                    <BreadcrumbsItem href="/event">Event</BreadcrumbsItem>
                    <BreadcrumbsItem href="/event">{dataEvent?.name}</BreadcrumbsItem>
                </Breadcrumbs>
            ) : (
                <div className="flex flex gap-3">
                    <Skeleton className="h-8 w-1/4 rounded-md" />
                </div>
            )}

            <section className="mt-4 flex flex-col gap-10 lg:flex-row">
                <div className="w-full lg:w-4/6">
                    {!isPendingEvent ?
                        <>
                            <h1 className="text-2xl font-semibold text-danger">
                                {dataEvent?.name}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 ">
                                <FaClock width={16} />
                                <p>{convertTime(dataEvent?.startDate)} - {convertTime(dataEvent?.endDate)}</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <FaLocationDot width={16} />
                                <p>{dataEvent?.isOnline ? "Online" : "Offline"} {dataEvent?.isOnline ? "" : ` - ${dataEvent?.location?.address}`}</p>
                            </div>
                            <div className="mb-2">
                                <Image src={`${dataEvent?.banner}`} alt="Cover" width={1920} height={1080} className="aspect-video w-full rounded-lg object-cover" />
                            </div>

                        </> : (
                            <div className="flex flex-col gap-1">
                                <Skeleton className="h-8 w-full rounded-md" />
                                <Skeleton className="h-6 w-1/2 rounded-md" />
                                <Skeleton className="h-6 w-1/2 rounded-md" />
                                <Skeleton className="aspect-video w-full rounded-lg object-cover mb-2" />
                            </div>
                        )

                    }
                    <div>
                        <Tabs className="w-full">
                            <Tabs.ListContainer>
                                <Tabs.List aria-label="Options">
                                    <Tabs.Tab id="description">
                                        Description
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                    <Tabs.Tab id="ticket">
                                        Ticket
                                        <Tabs.Indicator />
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs.ListContainer>
                            <Tabs.Panel className="pt-2" id="description">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold text-gray-700">About Event</h2>
                                    {dataEvent?.description ?
                                        <p className="text-gray-500 mt-2">{dataEvent?.description}</p>
                                        : (
                                            <Skeleton className="h-32 w-full rounded-lg mt-2" />
                                        )
                                    }
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel className="pt-2" id="ticket">
                                <h2 className="text-xl font-semibold text-gray-700">Ticket</h2>
                                <div className="mt-2 flex flex-col gap-8">
                                    {dataTicket?.map((ticket: ITicket) => (
                                        <DetailEventTicket
                                            key={`ticket-${ticket._id}`}
                                            ticket={ticket}
                                            cart={cart}
                                            handleAddToCart={() => handleAddToCart(`${ticket?._id}`)}
                                        />
                                    ))}
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </div>
                <div className="w-full lg:w-2/6">
                    <DetailEventCart
                        cart={cart}
                        dataTicketInCart={dataTicketInCart}
                        onChangeQuantity={handleChangeQuantity}
                        onCreateOrder={mutateCreateOrder}
                        isPending={isPendingCreateOrder}
                    />
                </div>
            </section>
        </div>
    )
}

export default DetailEvent;