import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { toast, Toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input Name Category"),
  description: yup.string().required("Please input Description Category"),
  icon: yup.mixed<FileList | string>().required("Please input Icon"),
});

const useAddCategoryModal = (onClose: () => void) => {
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

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  const handleDeleteIcon = (
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

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      toast.danger(error.message);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      reset();
      onClose();
    },
  });

  const handleAddCategory = (data: ICategory) => {
    mutateAddCategory(data);
  };

  return {
    control,
    errors,
    reset,
    isPendingAddCategory,
    isPendingUploadFile,
    isSuccessAddCategory,
    preview,
    handleSubmitForm,
    handleAddCategory,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingDeleteFile,
    handleOnClose,
  };
};

export default useAddCategoryModal;
