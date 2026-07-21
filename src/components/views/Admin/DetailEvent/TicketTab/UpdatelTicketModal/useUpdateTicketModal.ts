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

const useUpdateTicketModal = (id:string, onClose: () => void) => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateTicket
  } = useForm({
    resolver: yupResolver(schema),
  });


  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingUpdateTicket,
    isSuccess: isSuccessUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      toast.danger(error.message);
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      reset();
      onClose();
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    reset,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,
    handleSubmitForm,
    handleUpdateTicket,
    setValueUpdateTicket
  };
};

export default useUpdateTicketModal;
