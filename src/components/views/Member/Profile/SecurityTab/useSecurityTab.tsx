import authServices from '@/services/auth.service';
import { IUpdatePassword } from '@/types/Auth';
import { toast } from '@heroui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaUpdatePassword = yup.object().shape({
    oldPassword: yup.string().required("Please insert your old password"),
    password: yup.string().required("Please insert your new password"),
    confirmPassword: yup.string().required("Please insert your confirm password"),
});


const useSecurityTab = () => {
    const {
        control: controlUpdatePassword,
        handleSubmit: handleSubmitUpdatePassword,
        formState: { errors: errorsUpdatePassword },
        reset: resetUpdatePassword,
        setValue: setValueUpdatePassword,
    } = useForm({
        resolver: yupResolver(schemaUpdatePassword),
    });

    const updatePassword = async (payload: IUpdatePassword) => {
        const { data } = await authServices.updatePassword(payload);
        return data;
    }

    const {
        mutate: mutateUpdatePassword,
        isPending: isPendingMutateUpdatePassword
    } = useMutation({
        mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
        onError: (error) => {
            toast.danger(error.message);
        },
        onSuccess: () => {
            resetUpdatePassword();
            setValueUpdatePassword("oldPassword","");
            setValueUpdatePassword("password","");
            setValueUpdatePassword("confirmPassword","");
            toast.success("Success Update Password");

        },
    })

    const handleUpdatePassword= (data: IUpdatePassword) => mutateUpdatePassword(data);

    return {
        controlUpdatePassword,
        errorsUpdatePassword,
        handleSubmitUpdatePassword,
        resetUpdatePassword,
        setValueUpdatePassword,
        handleUpdatePassword,
        isPendingMutateUpdatePassword
    }
}

export default useSecurityTab;