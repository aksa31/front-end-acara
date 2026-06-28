import InputFile from "@/components/ui/InputFile";
import { Card, Skeleton, Spinner } from "@heroui/react"
import { Button } from "@heroui/react"
import Image from "next/image";
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface PropTypes {
    currentCover: string;
    onUpdate: (data: IEvent) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const CoverTab = ({ currentCover, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        handleDeleteCover,
        handleUploadCover,
        isPendingDeleteFile,
        isPendingUploadFile,
        controlUpdateCover,
        handleSubmitUpdateCover,
        errorsUpdateCover,
        preview,
        resetUpdateCover,
    } = useCoverTab();

    useEffect(() => {
        if(isSuccessUpdate){
            resetUpdateCover();
        }
    },[isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2 border" >
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Event Cover</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage cover of this event</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateCover(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Cover</p>
                        {currentCover ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={currentCover}
                                    alt="cover"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>

                        ) :
                            <Skeleton
                                className="aspect-video rounded-lg"
                            >
                            </Skeleton>
                        }
                    </div>
                    <Controller
                        name="banner"
                        control={controlUpdateCover}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                isDropable
                                {...field}
                                onDelete={() => handleDeleteCover(onChange)}
                                onUpload={(files) => handleUploadCover(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateCover.banner !== undefined}
                                errorMessage={errorsUpdateCover.banner?.message}
                                label={<p className="text-sm font-medium text-default-700">Upload New Cover</p>}
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
                        {isPendingUpdate ? <Spinner size="sm" color="accent"/> : "Save Changes"}
                    </Button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default CoverTab;