import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { ICategory } from "@/types/Category";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue, toast, Toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { now, getLocalTimeZone } from "@internationalized/date";


const schema = yup.object().shape({
  name: yup.string().required("Please input Name"),
  slug: yup.string().required("Please input Slug"),
  category: yup.string().required("Please select Category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input Description "),
  isOnline: yup.string().required("Please select onlne or offline "),
  region: yup.string().required("Please select region"),
  latitude: yup.number().required("Please input latitude coordinate"),
  longitude: yup.number().required("Please input longitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please input Icon"),
});

const useAddEventModal = (onClose: () => void) => {
  const router = useRouter();
  const debounce = useDebounce();
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
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  setValue('startDate', now(getLocalTimeZone()))
  setValue('endDate', now(getLocalTimeZone()))

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
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

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      const { data } = await categoryServices.getCategories();
      return data.data;
    },
    enabled: router.isReady,
  });


  const [ searchRegency, setSearchRegency ] = useState("");
  const [regionInput, setRegionInput] = useState("");

  const { data: dataRegion} = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: async () => {
      const { data } = await eventServices.searchLocationByRegency(`${searchRegency}`);
      return data.data;
    },
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    setRegionInput(region);
    debounce(() => setSearchRegency(region), DELAY)
  }

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      toast.danger(error.message);
  
    },
    onSuccess: () => {
      toast.success("Event added successfully");
      reset();
      onClose();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    
    const payload = {
      ...data,
      isFeatured : Boolean(data.isFeatured),
      isPublished : Boolean(data.isPublished),
      isOnline : Boolean(data.isOnline),
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
      location: {
        region: data.region ? data.region : "",
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    isPendingAddEvent,
    isPendingUploadFile,
    isSuccessAddEvent,
    preview,
    handleSubmitForm,
    handleAddEvent,
    handleUploadBanner,
    handleDeleteBanner,
    isPendingDeleteFile,
    handleOnClose,

    handleSearchRegion,
    searchRegency,
    dataRegion,
    regionInput,

    dataCategory,
    setValue
  };
};

export default useAddEventModal;
