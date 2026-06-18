import { Button, Label, Modal, TextField, Input, FieldError, TextArea, Spinner } from "@heroui/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchCategory: () => void;
}

const AddCategoryModal = ({ isOpen, onOpenChange, refetchCategory }: PropTypes) => {
    const {
        control,
        errors,
        isPendingAddCategory,
        isPendingUploadFile,
        preview,
        isSuccessAddCategory,
        handleUploadIcon,
        handleAddCategory,
        handleSubmitForm,
        handleDeleteIcon,
        isPendingDeleteFile,
        handleOnClose
    } = useAddCategoryModal(() => onOpenChange(false));

    const disabledSubmit = 
        isPendingAddCategory ||
        isPendingUploadFile ||
        isPendingDeleteFile

    useEffect(() => {
        if (isSuccessAddCategory) {
            refetchCategory();
        }
    }, [isSuccessAddCategory])

    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger onPress={() => handleOnClose()} />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Add Category</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <form id="add-category-form" onSubmit={handleSubmitForm(handleAddCategory)}>
                                <div className="flex flex-col gap-4 m-2">
                                    <p className="text-sm font-bold text-black">Information</p>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errors.name !== undefined}
                                            >
                                                <Label>Name</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Name Category"
                                                    type="text"
                                                    autoFocus
                                                />
                                                <FieldError>{errors.name?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full mb-2"
                                                name="description"
                                                isInvalid={errors.description !== undefined}
                                            >
                                                <Label>Description</Label>
                                                <TextArea
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Description"
                                                />
                                                <FieldError>{errors.description?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <p className="text-sm font-bold">Icon</p>
                                    <Controller
                                        name="icon"
                                        control={control}
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <InputFile
                                                isDropable
                                                {...field}
                                                onDelete={() => handleDeleteIcon(onChange)}
                                                onUpload={(files) => handleUploadIcon(files, onChange)}
                                                isUploading={isPendingUploadFile}
                                                isDeleting={isPendingDeleteFile}
                                                isInvalid={errors.icon !== undefined}
                                                errorMessage={errors.icon?.message}
                                                preview={typeof preview === 'string'? preview : ""}
                                                
                                            />
                                        )}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={() => handleOnClose()}
                                isDisabled={disabledSubmit}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="add-category-form"
                                isDisabled={disabledSubmit}
                                className="font-semibold"
                            >
                                {isPendingAddCategory ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Create Category"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default AddCategoryModal;