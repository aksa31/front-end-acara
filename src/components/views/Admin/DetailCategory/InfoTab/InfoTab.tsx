import { ICategory } from "@/types/Category";
import { Button, Card, Input, Skeleton, Label, TextField, FieldError, TextArea, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import Image from "next/image";
import useInfoTab from "./useInfoTab"

interface PropTypes {
    dataCategory?: ICategory;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = ({ dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        setValueUpdateInfo('name', `${dataCategory?.name}`)
        setValueUpdateInfo('description', `${dataCategory?.description}`)
    },[dataCategory])

    useEffect(() => {
        if(isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])
    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Category Information</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage information of this category</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        {dataCategory?.name ? (
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="name"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdateInfo.name !== undefined}
                                            >
                                                <Label>Name</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input Name Category"
                                                    type="text"
                                                />
                                                <FieldError>{errorsUpdateInfo.name?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="description"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full mb-2"
                                                name="description"
                                                isInvalid={errorsUpdateInfo.description !== undefined}
                                            >
                                                <Label>Description</Label>
                                                <TextArea
                                                    {...field}
                                                    className="focus-visible:border-primary"
                                                    placeholder="Input Description"
                                                />
                                                <FieldError>{errorsUpdateInfo.description?.message}</FieldError>
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
                        isDisabled={isPendingUpdate || !dataCategory?._id}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent"/> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default InfoTab;