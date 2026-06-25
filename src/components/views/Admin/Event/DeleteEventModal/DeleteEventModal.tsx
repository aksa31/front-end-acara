import { Button, Modal, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchEvents: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}



const DeleteEventModal = ({ isOpen, onOpenChange, refetchEvents, setSelectedId, selectedId }: PropTypes) => {
    const { mutateDeleteEvent, isPendingDeleteEvent, isSuccessDeleteEvent } = useDeleteEventModal(() => onOpenChange(false));
    useEffect(() => {
        if (isSuccessDeleteEvent) {
            refetchEvents();
        }
    }, [isSuccessDeleteEvent])
    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger
                        // onPress={() => handleOnClose()}
                        />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Delete Event</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <p className="text-md text-black">Are you sure you want to delete this event?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => setSelectedId("")}
                                isDisabled={isPendingDeleteEvent}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-event-form"
                                isDisabled={isPendingDeleteEvent}
                                onPress={() => mutateDeleteEvent(selectedId)}
                                className="font-semibold"
                            >
                                {isPendingDeleteEvent ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Delete Event"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
};

export default DeleteEventModal;