import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { toast, Toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  image: yup.mixed<FileList | string>().required("Please input image"),
  isShow: yup.boolean().required("Please select isShow"),
});

const useAddBannerModal = (onClose: () => void) => {
  const {
    isPendingUploadFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = () => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError: (error) => {
      toast.danger(error.message);
    },
    onSuccess: () => {
      toast.success("Banner added successfully");
      reset();
      onClose();
    },
  });

  const handleAddBanner = (data: IBanner) => {
    mutateAddBanner(data);
  };

  return {
    control,
    errors,
    reset,
    isPendingAddBanner,
    isPendingUploadFile,
    isSuccessAddBanner,
    preview,
    handleSubmitForm,
    handleAddBanner,
    handleUploadImage,
    handleDeleteImage,
    isPendingDeleteFile,
    handleOnClose,
  };
};

export default useAddBannerModal;
