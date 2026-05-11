import { Button, Card, CardContent, CardHeader, FieldError, Input, InputGroup, InputGroupInput, InputGroupSuffix, Spinner, TextField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
    const { visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors } = useRegister();

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
                    <h2 className="text-2xl font-bold text-red-500">Create Account</h2>
                    <p className="text-sm mt-2 mb-4">
                        Have an account?&nbsp;
                        <Link href='/auth/login' className="font-semibold text-red-400">Login here</Link>
                    </p>
                    {errors.root &&
                        <p className="mb-2 font-medium text-danger">
                            {errors?.root?.message}
                        </p>
                    }
                </CardHeader>
                <CardContent>
                    <form className={cn("flex w-80 flex-col gap-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleRegister)}>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.fullName !== undefined}
                                    aria-label="Fullname"
                                    autoComplete="off"
                                    type="text"
                                >
                                    <Input
                                        className="w-full p-4"
                                        placeholder="Fullname"
                                    />
                                    <FieldError>
                                        {errors.fullName?.message}
                                    </FieldError>
                                </TextField>
                            )}
                        />
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.username !== undefined}
                                    aria-label="Username"
                                    autoComplete="off"
                                    type="text"
                                >
                                    <Input
                                        className="w-full p-4"
                                        placeholder="Username"
                                    />
                                    <FieldError>
                                        {errors.username?.message}
                                    </FieldError>
                                </TextField>
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.email !== undefined}
                                    aria-label="Email"
                                    autoComplete="off"
                                    type="text"
                                >
                                    <Input
                                        className="w-full p-4"
                                        placeholder="Email"
                                    />
                                    <FieldError>
                                        {errors.email?.message}
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
                                    type={visiblePassword.password ? "text" : "password"}
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
                                                onClick={() => handleVisiblePassword("password")}
                                            >
                                                {visiblePassword.password ? (
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
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    isInvalid={errors.confirmPassword !== undefined}
                                    autoComplete="off"
                                    aria-label="Password Confirmation"
                                    type={visiblePassword.confirmPassword ? "text" : "password"}
                                >
                                    <InputGroup>
                                        <InputGroupInput
                                            className="w-full p-4"
                                            placeholder="Password Confirmation"
                                        />
                                        <InputGroupSuffix>
                                            <Button
                                                className="focus:outline-none bg-black w-8 h-8 "
                                                type="button"
                                                onClick={() => handleVisiblePassword("confirmPassword")}
                                            >
                                                {visiblePassword.confirmPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEyeSlash />
                                                )}
                                            </Button>
                                        </InputGroupSuffix>
                                    </InputGroup>
                                    <FieldError>
                                        {errors.confirmPassword?.message}
                                    </FieldError>
                                </TextField>
                            )}
                        />

                        <Button variant="danger" size="lg" type="submit" className="w-full rounded-lg ">
                            {isPendingRegister ? (
                                <Spinner color="current" />
                            ) : "Register"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register;