import { Button, Card, CardContent, CardHeader, FieldError, Input, InputGroup, InputGroupInput, InputGroupSuffix, Spinner, TextField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
    const { isVisible, toggleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors } = useLogin();

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="logo"
                    loading="eager"
                    width={180}
                    height={180}
                />
                <Image
                    src="/images/illustrations/login.svg"
                    alt="login"
                    loading="eager"
                    className="w-2/3 lg:w-full"
                    width={1024}
                    height={1024}
                />
            </div>
            <Card className="p-8">
                <CardHeader>
                    <h2 className="text-xl font-bold text-red-500">Login Account</h2>
                    <p className="text-sm mb-4">
                        Don{"'"}t have an account?&nbsp;
                        <Link href='/auth/register' className="font-semibold text-red-400">Register here</Link>
                    </p>
                    {errors.root &&
                        <p className="mb-2 font-medium text-danger">
                            {errors?.root?.message}
                        </p>
                    }
                </CardHeader>
                <CardContent>
                    <form className={cn("flex w-80 flex-col gap-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
                        <Controller
                            name="identifier"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.identifier !== undefined}
                                    aria-label="Email / Username"
                                    autoComplete="off"
                                    type="text"
                                >
                                    <Input
                                        className="w-full p-4"
                                        placeholder="Email / Username"
                                    />
                                    <FieldError>
                                        {errors.identifier?.message}
                                    </FieldError>
                                </TextField>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.password !== undefined}
                                    autoComplete="off"
                                    aria-label="Password"
                                    type={isVisible ? "text" : "password"}
                                >
                                    <InputGroup>
                                        <InputGroupInput
                                            className="w-full p-4"
                                            placeholder="Password"
                                        />
                                        <InputGroupSuffix>
                                            <Button
                                                className="focus:outline-none bg-black w-8 h-8 "
                                                type="button"
                                                onPress={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEyeSlash />
                                                )}
                                            </Button>
                                        </InputGroupSuffix>
                                    </InputGroup>
                                    <FieldError>
                                        {errors.password?.message}
                                    </FieldError>
                                </TextField>
                            )}
                        />
                        <Button variant="danger" size="lg" type="submit" className="w-full rounded-lg ">
                            {isPendingLogin ? (
                                <Spinner color="current" />
                            ) : "Login"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;