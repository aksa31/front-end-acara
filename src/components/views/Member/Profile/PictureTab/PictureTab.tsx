import InputFile from "@/components/ui/InputFile";
import { Avatar, Card, Skeleton, Spinner } from "@heroui/react"
import { Button } from "@heroui/react"
import Image from "next/image";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
    currentPicture: string;
    onUpdate: (data: IProfile) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const PictureTab = ({ currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        handleDeletePicture,
        handleUploadPicture,
        isPendingDeleteFile,
        isPendingUploadFile,
        controlUpdatePicture,
        handleSubmitUpdatePicture,
        errorsUpdatePicture,
        preview,
        resetUpdatePicture,
    } = usePictureTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdatePicture();
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/4 border" >
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Profile Picture</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage Picture for your profile</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdatePicture(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Picture</p>
                        <div className="flex justify-center py-2">
                            {currentPicture ? (
                                <Avatar color="default" className="size-40 rounded-full">
                                    <Avatar.Image
                                        src={currentPicture}
                                        alt="Picture"
                                        className="aspect-cover h-full w-full"
                                    />
                                    <Avatar.Fallback className="text-3xl">PP</Avatar.Fallback>
                                </Avatar>


                            ) :
                                <Skeleton
                                    className="size-40 rounded-full object-cover"
                                >
                                </Skeleton>
                            }
                        </div>
                    </div>
                    <Controller
                        name="profilePicture"
                        control={controlUpdatePicture}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                isDropable
                                {...field}
                                onDelete={() => handleDeletePicture(onChange)}
                                onUpload={(files) => handleUploadPicture(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                                errorMessage={errorsUpdatePicture.profilePicture?.message}
                                label={<p className="text-sm font-medium text-default-700">Upload New Picture</p>}
                                preview={typeof preview === 'string' ? preview : ""}

                            />
                        )}
                    />
                    <Button
                        variant="danger"
                        className="mt-2 disabled:bg-default-500 w-full"
                        type="submit"
                        isDisabled={isPendingUploadFile || isPendingDeleteFile || isPendingUpdate || !preview}
                    >
                        {isPendingUpdate ? <Spinner size="sm" color="accent" /> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default PictureTab;