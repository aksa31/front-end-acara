import CardEvent from "@/components/ui/CardEvent";
import useEvent from "./useEvent";
import { IEvent } from "@/types/Event";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";

const Event = () => {
    const router = useRouter();
    const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();
    const { setUrlExplore } = useChangeUrl();

    useEffect(() => {
        if (router.isReady) {
            setUrlExplore();
        }
    }, [router.isReady])
    return (
        <div className="flex flex-col w-full justify-center gap-6 px-4 lg:flex-row ">
            <div className="w-full lg:w-80 ">
                <EventFilter />
            </div>
            <div className="min-h-[70vh] w-fit flex-1">
                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!isLoadingEvents && !isRefetchingEvents ? dataEvents?.data?.map((event: IEvent) => (
                        <CardEvent
                            event={event}
                            key={`card-event-${event._id}`}
                            isLoading={isLoadingEvents}
                        />
                    )) : (
                        Array.from({ length: 4 }).map((_, index) => (
                            <CardEvent
                                key={`card-event-${index}`}
                                isLoading={true}
                            />
                        ))
                    )}
                </div>
                <div>
                    {!isLoadingEvents && dataEvents?.data?.length > 0 && (
                        <EventFooter totalPages={dataEvents?.pagination?.totalPages} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Event;