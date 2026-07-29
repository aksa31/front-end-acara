import { Button, Card, Input, Skeleton, Label, TextField, FieldError, TextArea, Spinner, Select, ListBox } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import Image from "next/image";
import useInfoTab from "./useInfoTab"
import { IBanner } from "@/types/Banner";

interface PropTypes {
    dataBanner?: IBanner;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = ({ dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        setValueUpdateInfo('title', `${dataBanner?.title}`)
        setValueUpdateInfo('isShow', `${dataBanner?.isShow}`)
    }, [dataBanner])

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])
    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Banner Information</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage information of this banner</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        {dataBanner?.title ? (
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="title"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="title"
                                                isInvalid={errorsUpdateInfo.title !== undefined}
                                            >
                                                <Label>Name</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Banner Title"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateInfo.title?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="isShow"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="isShow"
                                                isInvalid={errorsUpdateInfo.isShow !== undefined}
                                            >
                                                <Select
                                                    {...field}
                                                    placeholder="Select one"
                                                    name="isShow"
                                                    isInvalid={errorsUpdateInfo.isShow !== undefined}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    <Label>Status</Label>
                                                    <Select.Trigger>
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="true" textValue="true">
                                                                Show
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item id="false" textValue="false">
                                                                Hide
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                                <FieldError>{errorsUpdateInfo.isShow?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                            </div>
                        ) :
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-16 rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-24 rounded-md" />
                                    <Skeleton className="h-20 w-full rounded-md" />
                                </div>
                            </div>
                        }
                    </div>
                    <Button
                        variant="danger"
                        className="mt-2 disabled:bg-default-500 w-full"
                        type="submit"
                        isDisabled={isPendingUpdate || !dataBanner?._id}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent" /> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default InfoTab;