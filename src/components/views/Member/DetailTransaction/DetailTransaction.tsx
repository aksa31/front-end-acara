import { Button, Card, Chip, Skeleton } from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";
import { convertIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environment";

const DetailTransaction = () => {
    const { dataTransaction, dataEvent, dataTicket } = useDetailTransaction();
    return (
        <Card className="px-5 py-4">
            <Card.Header>
                <Card.Title>Detail Transaksi</Card.Title>
            </Card.Header>
            <Card.Content className="gap-8">
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Order:</h4>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                            <p className="text-sm font-semibold">Order ID:</p>
                            {dataTransaction?.orderId ? (
                                <p className="text-sm">{dataTransaction?.orderId}</p>
                            ) : (
                                <Skeleton className="h-4 w-2/5 rounded-lg bg-gray-200" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Ticket:</p>
                            {dataTicket?.name ? (
                                <p className="text-sm">{`${dataTicket?.name} (${convertIDR(dataTicket?.price)}) x ${dataTransaction?.quantity}`}</p>
                            ) : (
                                <Skeleton className="h-4 w-2/5 rounded-lg bg-gray-200" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Total:</p>
                            {dataTicket?.name ? (
                                <p className="text-sm">{`${convertIDR(dataTransaction?.total)}`}</p>
                            ) : (
                                <Skeleton className="h-4 w-2/5 rounded-lg bg-gray-200" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Status:</p>
                            {dataTicket?.name ? (
                                <Chip
                                    className="capitalize"
                                    variant="soft"
                                    color={dataTransaction?.status === 'completed' ? "success" : "warning"}
                                >{dataTransaction?.status}
                                </Chip>
                            ) : (
                                <Skeleton className="h-4 w-2/5 rounded-lg bg-gray-200" />
                            )}
                        </div>
                    </div>
                </div>
                {dataTransaction?.status === 'completed' && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold">Ticket:</h4>
                        <div className="mt-2 flex flex-col gap-4">
                            {dataTransaction?.vouchers?.map((voucher: { voucherId: string }) => (
                                <Card key={`voucher-${voucher.voucherId}`} className="p-4 pt-6 lg:p-2">
                                    <Card.Content className="gap-8 lg:flex-row">
                                        <div className="mx-auto mb-4 w-2/3 lg:m-0 lg:w-1/5 ">
                                            <QRCodeSVG value={voucher.voucherId} size={128} className="!h-full !w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-red-500">
                                                {dataEvent?.name}
                                            </h2>
                                            <div className="font-bold">
                                                <p className="text-gray-500 ">Date</p>
                                                <p className="text-red-500">
                                                    {`${convertTime(dataEvent?.startDate)} - ${convertTime(dataEvent?.endDate)}`}
                                                </p>
                                            </div>
                                            <div className="font-bold">
                                                <p className="text-gray-500 ">Location</p>
                                                <p className="text-red-500">
                                                    {dataEvent?.isOnline ? "Online" : "Offline"}
                                                </p>
                                            </div>
                                            {dataEvent?.isOnline && (
                                                <Link
                                                    href={`${dataEvent?.location?.address}`}
                                                    className="px-4 py-2 rounded-lg font-semibold text-gray-600 border border-red-600 text-red-600 dashed"

                                                >
                                                    Join Now
                                                </Link>
                                            )}
                                        </div>
                                    </Card.Content>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                {dataTransaction?.status === 'pending' && (
                    <Button
                        className="w-fit bg-red-500 text-white solid  px-4 py-2 rounded-lg"
                        onPress={() => (window as any).snap.pay(dataTransaction?.payment?.token)}>
                        Pay Now
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}

export default DetailTransaction;