import InputFile from "@/components/ui/InputFile";
import { Card, Skeleton, Spinner } from "@heroui/react"
import { Button } from "@heroui/react"
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const ImageTab = ({ currentImage, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        handleDeleteImage,
        handleUploadImage,
        isPendingDeleteFile,
        isPendingUploadFile,
        controlUpdateImage,
        handleSubmitUpdateImage,
        errorsUpdateImage,
        preview,
        resetUpdateImage,
    } = useImageTab();

    useEffect(() => {
        if(isSuccessUpdate){
            resetUpdateImage();
        }
    },[isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2 border" >
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Banner Image</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage Image of this banner</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateImage(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Image</p>
                        {currentImage ? (
                            <div className="relative h-32 rounded-lg w-full rounded-lg overflow-hidden">
                                <Image
                                    src={currentImage}
                                    alt="image"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>

                        ) :
                            <Skeleton
                                className="aspect-square rounded-lg w-full"
                            >
                            </Skeleton>
                        }
                    </div>
                    <Controller
                        name="image"
                        control={controlUpdateImage}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                isDropable
                                {...field}
                                onDelete={() => handleDeleteImage(onChange)}
                                onUpload={(files) => handleUploadImage(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateImage.image !== undefined}
                                errorMessage={errorsUpdateImage.image?.message}
                                label={<p className="text-sm font-medium text-default-700">Upload New Image</p>}
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

export default ImageTab;