import { Button, Modal, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchTransaction: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}



const DeleteTransactionModal = ({ isOpen, onOpenChange, refetchTransaction, setSelectedId, selectedId }: PropTypes) => {
    const { mutateDeleteTransaction, isPendingDeleteTransaction, isSuccessDeleteTransaction } = useDeleteTransactionModal(() => onOpenChange(false));
    useEffect(() => {
        if (isSuccessDeleteTransaction) {
            refetchTransaction();
        }
    }, [isSuccessDeleteTransaction])
    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger
                        // onPress={() => handleOnClose()}
                        />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Delete Transaction</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <p className="text-md text-black">Are you sure you want to delete this Transaction?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => setSelectedId("")}
                                isDisabled={isPendingDeleteTransaction}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-transaction-form"
                                isDisabled={isPendingDeleteTransaction}
                                onPress={() => mutateDeleteTransaction(selectedId)}
                                className="font-semibold"
                            >
                                {isPendingDeleteTransaction ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Delete Transaction"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
};

export default DeleteTransactionModal;