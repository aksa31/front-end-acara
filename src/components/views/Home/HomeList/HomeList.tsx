import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import { Skeleton } from "@heroui/react";
import Link from "next/link";

interface PropTypes {
    title: string;
    events: IEvent[];
    isLoading: boolean;
}

const HomeList = ({ title, events, isLoading }: PropTypes) => {
    return (
        <section className="mb-16">
            <div className="mb-1 flex items-center justify-between px-6 ">
                <h2 className="text-2xl font-bold text-danger">{title}</h2>
                <Link href="/event" className="font-semibold text-gray-600">
                    See More
                </Link>
            </div>
            <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
                {!isLoading ? events?.map((event: IEvent) => (
                    <CardEvent
                        event={event}
                        key={`card-event-${event._id}`}
                        className="first:ml-6 last:mr-6 lg:first:ml-2 lg:last:mr-2"
                        isLoading={isLoading}
                    />
                )) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <CardEvent
                            key={`card-event-${index}`}
                            className="first:ml-6 last:mr-6 lg:first:ml-2 lg:last:mr-2"
                            isLoading={isLoading}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default HomeList;