import orderServices from "@/services/order.service";
import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTransactionModal = (onClose: () => void) => {
    const deleteTransaction = async (id: string) => {
        const res = await orderServices.deleteOrder(id);
        return res;
    };

    const { mutate: mutateDeleteTransaction, isPending: isPendingDeleteTransaction, isSuccess: isSuccessDeleteTransaction } = useMutation({
        mutationFn: deleteTransaction,
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            toast.success("Delete Transaction Success");
            onClose();
        },
        

    })


    return {
        mutateDeleteTransaction,
        isPendingDeleteTransaction,
        isSuccessDeleteTransaction
    }
}

export default useDeleteTransactionModal;