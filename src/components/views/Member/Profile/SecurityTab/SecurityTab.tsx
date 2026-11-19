import { Button, Card, Input, Select, Skeleton, Label, TextField, FieldError, TextArea, Spinner, Autocomplete, SearchField, ListBox, useFilter, EmptyState, DatePicker, DateField, Calendar, TimeField } from "@heroui/react"
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useInfoTab from "./useSecurityTab";
import { IProfile } from "@/types/Auth";
import useSecurityTab from "./useSecurityTab";


const SecurityTab = () => {
    const {
        controlUpdatePassword,
        errorsUpdatePassword,
        handleSubmitUpdatePassword,
        resetUpdatePassword,
        setValueUpdatePassword,
        handleUpdatePassword,
        isPendingMutateUpdatePassword
    } = useSecurityTab();

    return (
        <Card className="w-full p-4 lg:w-1/2 border">
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Security</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Update your account security</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}>
                    <div className="flex flex-col gap-2">
                            <div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="oldPassword"
                                        control={controlUpdatePassword}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="name"
                                                isInvalid={errorsUpdatePassword?.oldPassword !== undefined}
                                            >
                                                <Label>Old Password</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input your old password"
                                                    type="password"
                                                />
                                                <FieldError>{errorsUpdatePassword?.oldPassword?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="password"
                                        control={controlUpdatePassword}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="New Password"
                                                isInvalid={errorsUpdatePassword?.oldPassword !== undefined}
                                            >
                                                <Label>New Password</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input your new password"
                                                    type="password"
                                                />
                                                <FieldError>{errorsUpdatePassword?.password?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                    <Controller
                                        name="confirmPassword"
                                        control={controlUpdatePassword}
                                        render={({ field }) => (
                                            <TextField
                                                className="w-full"
                                                name="Confirm Password"
                                                isInvalid={errorsUpdatePassword?.oldPassword !== undefined}
                                            >
                                                <Label>Confirm Password</Label>
                                                <Input
                                                    {...field}
                                                    className="focus-visible:border-primary mb-2"
                                                    placeholder="Input your confirm new password"
                                                    type="password"
                                                />
                                                <FieldError>{errorsUpdatePassword?.password?.message}</FieldError>
                                            </TextField>
                                        )}
                                    />
                                </div>
                            </div>
                    </div>
                    <Button
                        variant="danger"
                        className="mt-2 disabled:bg-default-500 w-full"
                        type="submit"
                        isDisabled={isPendingMutateUpdatePassword}
                    >
                        {isPendingMutateUpdatePassword ? <Spinner size="sm" color="accent" /> : "Update Password"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default SecurityTab;