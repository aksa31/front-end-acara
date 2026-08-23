import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
    const router = useRouter();
    const ready = router.isReady;
    const { mutateUpdateOrderStatus } = usePayment();
    const { status, order_id } = router.query;

    useEffect(() => {
        if(ready) {
            mutateUpdateOrderStatus();
        }
    }, [ready])
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
                    src={router.query.status === 'success' ? "/images/illustrations/success.svg" : "/images/illustrations/pending.svg"}
                    alt="logo"
                    loading="eager"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-red-500 capitalize">
                    {status}
                </h1>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="lg"
                        className="mt-4 w-fit border-red-500 text-red-500 rounded-lg"
                        onPress={() => router.push(`/member/transaction/${order_id}`)}
                    >
                        Check your transaction here
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Payment;