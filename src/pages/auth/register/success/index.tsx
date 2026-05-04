import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/register";
import RegisterSuccess from "@/components/views/RegisterSuccess/RegisterSuccess";

const RegisterSuccessPage = () => {
    return (
        <AuthLayout title="Acara | Register Success">
            <RegisterSuccess/>
        </AuthLayout>
    )
}

export default RegisterSuccessPage;