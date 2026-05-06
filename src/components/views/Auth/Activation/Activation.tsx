import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";

interface PropTypes {
    status: 'success' | 'failed'
}

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const {status} = props;
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
                    src={status === 'success' ? "/images/illustrations/email-send.svg" : "/images/illustrations/pending.svg"}
                    alt="logo"
                    loading="eager"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-red-500">
                    {status === 'success' ? "Activation Success" : "Activation Failed"}
                </h1>
                <p className="text-xl font-bold text-gray-500">
                    {status === 'success' ? "Thank you for reegister account in Acara" : "Confirmation is invalid"}
                    </p>
                <Link href="/">
                    <Button variant="outline" size="lg" className="mt-4 w-fit border-red-500 text-red-500 rounded-lg" onClick={() => router.push('/')}>
                        Back To Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Activation