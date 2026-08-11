import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

interface PropTypes {
    event?: IEvent;
    isLoading?: boolean;
    className?: string;
}

const CardEvent = ({ event, className,isLoading }: PropTypes) => {
    return (

        <Card key={event?._id} className={cn(
            className,
            "cursor-pointer shadow-sm flex flex-col"
        )}>
            <Link href={`/event/${event?.slug}`} className="flex flex-col gap-2">
                {!isLoading ? (
                    <>
                        <Card.Content>
                            <Image
                                alt="cover"
                                src={`${event?.banner}`}
                                width={1920}
                                height={1080}
                                className="aspect-video w-full rounded-lg object-cover flex items-center justify-center"
                            
                            />
                        </Card.Content>
                        <Card.Footer className="flex flex-col items-start text-left">
                            <h2 className="line-clamp-1 text-lg font-bold text-danger">
                                {event?.name}
                            </h2>
                            <p className="mb-2 line-clamp-2">{event?.description}</p>
                            <p className="text-gray-500">{convertTime(`${event?.startDate}`)}</p>
                        </Card.Footer>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-2">
                            <Card.Content>
                                <Skeleton className="rounded-lg aspect-video w-full bg-gray-300" />
                            </Card.Content>
                            <Card.Footer className='flex flex-col gap-2 items-start '>
                                <Skeleton className="h-4 w-3/5 rounded-lg bg-gray-200" />
                                <Skeleton className="h-4 w-4/5 rounded-lg bg-gray-200" />
                                <Skeleton className="h-4 w-2/5 rounded-lg bg-gray-200" />
                            </Card.Footer>
                        </div>
                    </>
                )}
            </Link>
        </Card>
    )
}

export default CardEvent;