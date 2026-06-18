import InputFile from "@/components/ui/InputFile";
import { Card, Skeleton, Spinner } from "@heroui/react"
import { Button } from "@heroui/react"
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category"

interface PropTypes {
    currentIcon: string;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const IconTab = ({ currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate }: PropTypes) => {
    const {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingDeleteFile,
        isPendingUploadFile,
        controlUpdateIcon,
        handleSubmitUpdateIcon,
        errorsUpdateIcon,
        preview,
        resetUpdateIcon,
    } = useIconTab();

    useEffect(() => {
        if(isSuccessUpdate){
            resetUpdateIcon();
        }
    },[isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2 border" >
            <Card.Header className="flex items-center">
                <Card.Title className="w-full text-xl font-bold">Category Icon</Card.Title>
                <Card.Description className="w-full text-sm text-default-400">Manage icon of this category</Card.Description>
            </Card.Header>
            <Card.Content>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        {currentIcon ? (
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                                <Image
                                    src={currentIcon}
                                    alt="icon"
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
                        name="icon"
                        control={controlUpdateIcon}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                isDropable
                                {...field}
                                onDelete={() => handleDeleteIcon(onChange)}
                                onUpload={(files) => handleUploadIcon(files, onChange)}
                                isUploading={isPendingUploadFile}
                                isDeleting={isPendingDeleteFile}
                                isInvalid={errorsUpdateIcon.icon !== undefined}
                                errorMessage={errorsUpdateIcon.icon?.message}
                                label={<p className="text-sm font-medium text-default-700">Upload New Icon</p>}
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

export default IconTab;