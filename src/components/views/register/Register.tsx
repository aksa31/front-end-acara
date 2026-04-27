import { Button, Card, CardContent, CardHeader, Input, InputGroup, InputGroupInput, InputGroupSuffix } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
    const { visiblePassword, handleVisiblePassword } = useRegister();
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
                    <h2 className="text-xl font-bold text-red-500">Create Account</h2>
                    <p className="text-sm mb-4">
                        Have an account?&nbsp;
                        <Link href='/login' className="font-semibold text-red-400">Login here</Link>
                    </p>
                </CardHeader>
                <CardContent>
                    <form className="flex w-80 flex-col gap-4">
                        <Input aria-label="Fullname" className="w-full p-4" type="text" placeholder="Fullname" />
                        <Input aria-label="Username" className="w-full p-4" type="text" placeholder="Username" />
                        <Input aria-label="Email" className="w-full p-4" type="text" placeholder="Email" />
                        <InputGroup>
                            <InputGroupInput
                                aria-label="Password"
                                className="w-full p-4"
                                type={visiblePassword.password ? "text" : "password"}
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
                        <InputGroup>
                            <InputGroupInput
                                aria-label="Password Confirmation"
                                className="w-full p-4"
                                type={visiblePassword.passwordConfirmation ? "text" : "password"}
                                placeholder="Password Confirmation"
                            />
                            <InputGroupSuffix>
                                <Button
                                    className="focus:outline-none bg-black w-8 h-8 "
                                    type="button"
                                    onClick={() => handleVisiblePassword("passwordConfirmation")}
                                >
                                    {visiblePassword.passwordConfirmation ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )}
                                </Button>
                            </InputGroupSuffix>
                        </InputGroup>
                        <Button variant="danger" size="lg" type="submit" className="w-full">
                            Register
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register;