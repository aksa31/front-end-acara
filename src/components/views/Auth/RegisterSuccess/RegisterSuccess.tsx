import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="logo"
                    loading="eager"
                    width={180}
                    height={180}
                />
                <Image
                    src="/images/illustrations/email-send.svg"
                    alt="logo"
                    loading="eager"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-red-500">Create Account Success</h1>
                <p className="text-xl font-bold text-gray-500">Check your email for account activation</p>
                <Link href="/">
                    <Button variant="outline" size="lg" className="mt-4 w-fit border-red-500 text-red-500 rounded-lg" onClick={() => router.push('/')}>
                        Back To Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterSuccess