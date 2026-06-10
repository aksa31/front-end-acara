import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import { toast, Toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input Name Category"),
  description: yup.string().required("Please input Description Category"),
  icon: yup.mixed<FileList>().required("Please input Icon"),
});

const useAddCategoryModal = (onClose: () => void) => {
  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();
    formData.append("file", data.icon[0]);
    const response = await uploadServices.uploadFile(formData);
    const icon = response.data.data.secure_url;
    // const {
    //   data: { secure_url: icon },
    // } = await uploadServices.uploadFile(formData);
    return {
      name: data.name,
      description: data.description,
      icon,
    };
  };

  const { mutate: mutateAddCategory, isPending: isPendingAddCategory, isSuccess: isSuccessAddCategory } = useMutation({
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

  const { mutate: mutateAddFile, isPending: isPendingAddFile } = useMutation({
    mutationFn: uploadIcon,
    onError: (error) => {
      toast.danger(error.message);
    },
    onSuccess: (payload) => {
      mutateAddCategory(payload);
    },
  });

  const handleAddCategory = (data: ICategoryForm) => {
    mutateAddFile(data);
  };

  return {
    control,
    errors,
    isPendingAddCategory,
    isPendingAddFile,
    isSuccessAddCategory,
    handleSubmitForm,
    handleAddCategory,
  }
};

export default useAddCategoryModal;