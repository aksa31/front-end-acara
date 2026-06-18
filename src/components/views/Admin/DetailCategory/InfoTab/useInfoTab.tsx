import useMediaHandling from '@/hooks/useMediaHandling';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaUpdateInfo = yup.object().shape({
    name: yup.string().required("Please input Name Category"),
    description: yup.string().required("Please input Description Category"),
});


const useInfoTab = ( )=> {
    const {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile,
    } = useMediaHandling();

    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });

    return {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    }
}

export default useInfoTab;