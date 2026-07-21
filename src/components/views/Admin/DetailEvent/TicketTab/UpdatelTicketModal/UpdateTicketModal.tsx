import { Button, Label, Modal, TextField, Input, FieldError, TextArea, Spinner } from "@heroui/react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchTicket: () => void;
    selectedDataTicket: ITicket | null;
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>
}

const UpdateTicketModal = ({ isOpen, onOpenChange, refetchTicket, selectedDataTicket, setSelectedDataTicket }: PropTypes) => {
    const {
        control,
        errors,
        reset,
        isPendingUpdateTicket,
        isSuccessUpdateTicket,
        handleSubmitForm,
        handleUpdateTicket,
        setValueUpdateTicket
    } = useUpdateTicketModal(`${selectedDataTicket?._id}`, () => onOpenChange(false));

    useEffect(() => {
        if (isSuccessUpdateTicket) {
            onOpenChange(false);
            refetchTicket();
            setSelectedDataTicket(null);
        }
    }, [isSuccessUpdateTicket])

    useEffect(() => {
        if (selectedDataTicket) {
            setValueUpdateTicket("name", `${selectedDataTicket.name}`)
            setValueUpdateTicket("price", `${selectedDataTicket.price}`)
            setValueUpdateTicket("quantity", `${selectedDataTicket.quantity}`)
            setValueUpdateTicket("description", `${selectedDataTicket.description}`)
        }
    }, [selectedDataTicket])

    const handleOnClose = () => {
        reset();
        onOpenChange(false);
        setSelectedDataTicket(null);
    }

    return (
        <Modal >
            <Modal.Backdrop className="bg-black/80" isOpen={isOpen} onOpenChange={onOpenChange} >
                <Modal.Container placement="center" scroll="inside" >
                    <Modal.Dialog >
                        <Modal.CloseTrigger onPress={handleOnClose} />
                        <Modal.Header>
                            <Modal.Heading className="m-2 font-bold">Update Ticket </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                            <form id="update-ticket-form" onSubmit={handleSubmitForm(handleUpdateTicket)}>
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
                                                    placeholder="Input Name Ticket"
                                                    type="text"
                                                    autoFocus
                                                />
                                                <FieldError>{errors.name?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="price"
                                                isInvalid={errors.price !== undefined}
                                            >
                                                <Label>Price</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Price"
                                                    type="text"

                                                />
                                                <FieldError>{errors.price?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                    <Controller
                                        name="quantity"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="quantity"
                                                isInvalid={errors.quantity !== undefined}
                                            >
                                                <Label>Quantity</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Quantity"
                                                    type="text"

                                                />
                                                <FieldError>{errors.quantity?.message}</FieldError>
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
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="bg-red-200 text-red-700 font-semibold"
                                onPress={handleOnClose}
                                isDisabled={isPendingUpdateTicket}
                                slot="close"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                form="update-ticket-form"
                                isDisabled={isPendingUpdateTicket}
                                className="font-semibold"
                            >
                                {isPendingUpdateTicket ? (
                                    <Spinner size="sm" color="current" />
                                ) : (
                                    "Update Ticket "
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export default UpdateTicketModal;