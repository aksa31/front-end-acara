import { Button, Modal, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchBanner: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}



const DeleteBannerModal = ({ isOpen, onOpenChange, refetchBanner, setSelectedId, selectedId }: PropTypes) => {
    const { mutateDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } = useDeleteBannerModal(() => onOpenChange(false));
    useEffect(() => {
        if (isSuccessDeleteBanner) {
            refetchBanner();
        }
    }, [isSuccessDeleteBanner])
    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger
                        // onPress={() => handleOnClose()}
                        />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Delete Banner</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <p className="text-md text-black">Are you sure you want to delete this banner?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => setSelectedId("")}
                                isDisabled={isPendingDeleteBanner}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-banner-form"
                                isDisabled={isPendingDeleteBanner}
                                onPress={() => mutateDeleteBanner(selectedId)}
                                className="font-semibold"
                            >
                                {isPendingDeleteBanner ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Delete Banner"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
};

export default DeleteBannerModal;