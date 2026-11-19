import { Button, Card, Input, Select, Skeleton, Label, TextField, FieldError, TextArea, Spinner, Autocomplete, SearchField, ListBox, useFilter, EmptyState, DatePicker, DateField, Calendar, TimeField } from "@heroui/react"
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
    dataProfile?: IProfile;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = ({ dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        if (dataProfile) {
            setValueUpdateInfo('fullName', `${dataProfile?.fullName}`)
        }
    }, [dataProfile])


    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">User Information</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage information of this account</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        {dataProfile?.fullName ? (
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Label>Username</Label>
                                    <Input
                                        className="focus-visible:border-primary mb-2"
                                        variant="secondary"
                                        disabled
                                        value={dataProfile?.username}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Label>Email</Label>
                                    <Input
                                        className="focus-visible:border-primary mb-2"
                                        variant="secondary"
                                        disabled
                                        value={dataProfile?.email}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Label>Role</Label>
                                    <Input
                                        className="focus-visible:border-primary mb-2"
                                        variant="secondary"
                                        disabled
                                        value={dataProfile?.roles}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="fullName"
                                        control={controlUpdateInfo}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdateInfo.fullName !== undefined}
                                            >
                                                <Label>Fullname</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input your fullname"
                                                />
                                                <FieldError>{errorsUpdateInfo.fullName?.message}</FieldError>
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
                                    <Skeleton className="h-4 w-16 rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-16 rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-16 rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>
                            </div>
                        }
                    </div>
                    <Button
                        variant="danger"
                        className="mt-2 disabled:bg-default-500 w-full"
                        type="submit"
                        isDisabled={isPendingUpdate || !dataProfile?._id}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent" /> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default InfoTab;