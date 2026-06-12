import { Button, Modal, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchCategory: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}



const DeleteCategoryModal = ({ isOpen, onOpenChange, refetchCategory, setSelectedId, selectedId }: PropTypes) => {
    const { mutateDeleteCategory, isPendingDeleteCategory, isSuccessDeleteCategory } = useDeleteCategoryModal(() => onOpenChange(false));
    useEffect(() => {
        if (isSuccessDeleteCategory) {
            refetchCategory();
        }
    }, [isSuccessDeleteCategory])
    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger
                        // onPress={() => handleOnClose()}
                        />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Delete Category</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <p className="text-md text-black">Are you sure you want to delete this category?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => setSelectedId("")}
                                isDisabled={isPendingDeleteCategory}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-category-form"
                                isDisabled={isPendingDeleteCategory}
                                onPress={() => mutateDeleteCategory(selectedId)}
                                className="font-semibold"
                            >
                                {isPendingDeleteCategory ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Delete Category"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
};

export default DeleteCategoryModal;