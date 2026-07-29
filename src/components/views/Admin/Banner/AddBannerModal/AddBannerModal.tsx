import { Button, Label, Modal, TextField, Input, FieldError, TextArea, Spinner, Select, ListBox } from "@heroui/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchBanner: () => void;
}

const AddBannerModal = ({ isOpen, onOpenChange, refetchBanner }: PropTypes) => {
    const {
        control,
        errors,
        isPendingAddBanner,
        isPendingUploadFile,
        preview,
        isSuccessAddBanner,
        handleUploadImage,
        handleAddBanner,
        handleSubmitForm,
        handleDeleteImage,
        isPendingDeleteFile,
        handleOnClose
    } = useAddBannerModal(() => onOpenChange(false));

    const disabledSubmit =
        isPendingAddBanner ||
        isPendingUploadFile ||
        isPendingDeleteFile

    useEffect(() => {
        if (isSuccessAddBanner) {
            refetchBanner();
        }
    }, [isSuccessAddBanner])

    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger onPress={() => handleOnClose()} />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Add Banner</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <form id="add-banner-form" onSubmit={handleSubmitForm(handleAddBanner)}>
                                <div className="flex flex-col gap-4 m-2">
                                    <p className="text-sm font-bold text-black">Information</p>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errors.title !== undefined}
                                            >
                                                <Label>Title</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input title"
                                                    type="text"
                                                    autoFocus
                                                />
                                                <FieldError>{errors.title?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="isShow"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isShow"
                                                isInvalid={errors.isShow !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isShow"
                                                    isInvalid={errors.isShow !== undefined}
                                                    >
                                                    <Label>Status</Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="true" textValue="true">
                                                                Showing
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="false" textValue="false">
                                                                Not Showing
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                                <FieldError>{errors.isShow?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <p className="text-sm font-bold">Image</p>
                                    <Controller
                                        name="image"
                                        control={control}
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <InputFile
                                                isDropable
                                                {...field}
                                                onDelete={() => handleDeleteImage(onChange)}
                                                onUpload={(files) => handleUploadImage(files, onChange)}
                                                isUploading={isPendingUploadFile}
                                                isDeleting={isPendingDeleteFile}
                                                isInvalid={errors.image !== undefined}
                                                errorMessage={errors.image?.message}
                                                preview={typeof preview === 'string' ? preview : ""}
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
                                form="add-banner-form"
                                isDisabled={disabledSubmit}
                                className="font-semibold"
                            >
                                {isPendingAddBanner ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Create Banner"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default AddBannerModal;