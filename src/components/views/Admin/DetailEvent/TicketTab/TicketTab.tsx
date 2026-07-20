import DropdownAction from "@/components/commons/DropdownAction";
import { Button, Card, Chip, useOverlayState } from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
    const {
        dataTicket,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket
    } = useTicketTab();
    const addTicketModal = useOverlayState();
    const deleteTicketModal = useOverlayState();
    const updateTicketModal = useOverlayState();
    const { push } = useRouter();

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket];
            switch (columnKey) {
                case "price":
                    return `${convertIDR(cellValue as number)}`
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => {
                                updateTicketModal.open()
                            }}
                            onPressButtonDelete={() => {
                                deleteTicketModal.open()
                            }}
                        />
                    );
                default:
                    return cellValue as ReactNode;
            }
        }, []
    )

    return (
        <Card className="w-full p-4 border">
            <Card.Header className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <Card.Title className="w-full text-xl font-bold">Event Ticket</Card.Title>
                    <Card.Description className="w-full text-sm text-default-400">Manage ticket of this event</Card.Description>
                </div>
                <Button
                    variant="danger">
                    Add New Ticket
                </Button>
            </Card.Header>
            <Card.Content className="pt-0">
                <DataTable
                    columns={COLUMN_LIST_TICKET}
                    data={dataTicket || []}
                    emptyNotFound="Ticket is empty"
                    renderCell={renderCell}
                    isLoading={isPendingTicket || isRefetchingTicket}
                    showSearch={false}
                    showLimit={false}
                    totalPages={1}
                />
            </Card.Content>

        </Card>
    )
}

export default TicketTab;