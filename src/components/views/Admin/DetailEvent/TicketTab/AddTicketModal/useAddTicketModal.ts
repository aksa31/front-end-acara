import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { toast, Toast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input Name Category"),
  price: yup.string().required("Please input Price"),
  quantity: yup.string().required("Please input Quantity"),
  description: yup.string().required("Please input Description Category"),

});

const useAddTicketModal = (onClose: () => void) => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError: (error) => {
      toast.danger(error.message);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      reset();
      onClose();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    isPendingAddTicket,
    isSuccessAddTicket,
    handleSubmitForm,
    handleAddTicket,
  };
};

export default useAddTicketModal;
