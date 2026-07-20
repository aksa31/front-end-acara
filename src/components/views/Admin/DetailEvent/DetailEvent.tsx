import { Tabs } from "@heroui/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";
import useDetailEvent from "./useDetailEvent";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
    const {
        dataEvent,
        handleUpdateEvent,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,
        handleUpdateLocation,
        handleUpdateCover,

        dataDefaultRegion,
        isPendingDefaultRegion
    } = useDetailEvent();
    return (
        <Tabs className="w-full">
            <Tabs.ListContainer>
                <Tabs.List aria-label="Options" className="w-full max-w-sm">
                    <Tabs.Tab id="cover">
                        Cover
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="info">
                        Info
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="location">
                        Location
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="ticket">
                        Ticket
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="cover">
                <CoverTab
                    currentCover={dataEvent?.banner}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                    onUpdate={handleUpdateCover}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="info">
                <InfoTab
                    dataEvent={dataEvent}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                    onUpdate={handleUpdateEvent}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="location">
                <LocationTab
                    dataLocation={dataEvent}
                    isPendingUpdate={isPendingUpdateEvent}
                    isSuccessUpdate={isSuccessUpdateEvent}
                    onUpdate={handleUpdateLocation}
                    dataDefaultRegion={dataDefaultRegion}
                    isPendingDefaultRegion={isPendingDefaultRegion}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="ticket">
                <TicketTab
                />
            </Tabs.Panel>
        </Tabs>
    )
}

export default DetailEvent;