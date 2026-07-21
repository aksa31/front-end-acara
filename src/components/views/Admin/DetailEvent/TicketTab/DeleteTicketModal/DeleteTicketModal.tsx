import { Button, Modal, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchTicket: () => void;
    selectedDataTicket: ITicket | null;
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}



const DeleteTicketModal = ({ isOpen, onOpenChange, refetchTicket, setSelectedDataTicket, selectedDataTicket }: PropTypes) => {
    const { mutateDeleteTicket, isPendingDeleteTicket, isSuccessDeleteTicket } = useDeleteTicketModal(() => onOpenChange(false));
    useEffect(() => {
        if (isSuccessDeleteTicket) {
            refetchTicket();
            onOpenChange(false);
            setSelectedDataTicket(null);
        }
    }, [isSuccessDeleteTicket])
    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger
                        // onPress={() => handleOnClose()}
                        />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Delete Ticket</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <p className="text-md text-black">Are you sure you want to delete this ticket?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => {
                                    onOpenChange(false);
                                    setSelectedDataTicket(null)
                                }}
                                isDisabled={isPendingDeleteTicket}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-ticket-form"
                                isDisabled={isPendingDeleteTicket}
                                onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
                                className="font-semibold"
                            >
                                {isPendingDeleteTicket ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Delete Ticket"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
};

export default DeleteTicketModal;