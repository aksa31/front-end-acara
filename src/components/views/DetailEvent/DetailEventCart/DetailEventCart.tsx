import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, Link, Separator, Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface PropTypes {
    cart: ICart;
    dataTicketInCart: ITicket;
    onChangeQuantity: (type: "increment" | "decrement") => void;
    onCreateOrder: () => void;
    isPending: boolean;
}

const DetailEventCart = ({ cart, dataTicketInCart, onChangeQuantity, onCreateOrder, isPending }: PropTypes) => {
    const session = useSession();
    const router = useRouter();
    return (
        <Card className="rounded-lg lg:sticky lg:top-[80px] border-none">
            {session.status === 'authenticated' ? (
                <>
                    <Card.Header>
                        <Card.Title>
                            <p className="text-xl font-semibold text-gray-700">Cart</p>
                        </Card.Title>
                        <Card.Description />
                    </Card.Header>
                    <Card.Content>
                        {cart?.ticket === "" ? (
                            <p className="text-gray-500">Your cart is empty</p>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold">{dataTicketInCart?.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="md"
                                            variant="primary"
                                            className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold bg-white border text-gray-500 "
                                            onPress={() => onChangeQuantity("decrement")}
                                        >
                                            -
                                        </Button>
                                        <span className="text-lg font-bold">{cart?.quantity}</span>
                                        <Button
                                            size="md"
                                            variant="primary"
                                            className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold bg-white border text-gray-500 "
                                            onPress={() => onChangeQuantity("increment")}
                                        >
                                            +
                                        </Button>

                                    </div>
                                </div>
                                <p className="font-bold">{convertIDR(Number(dataTicketInCart?.price) * cart.quantity)}</p>
                            </div>
                        )}
                        <Separator className="my-2" />
                        <Button
                            variant="danger"
                            size="lg"
                            isDisabled={cart?.quantity === 0 || isPending}
                            className="disabled:bg-red-200 w-full"
                            onPress={onCreateOrder}
                        >
                            {isPending ? <Spinner color="current" /> : "Checkout"}
                        </Button>
                    </Card.Content>
                </>
            ) : (
                <Card.Content>
                    <Button
                        variant="danger"
                        size="lg"
                        className="w-full"
                        onPress={() => router.push(`/auth/login?callbackUrl=/event/${router.query.slug}`)}
                    >
                        Login to book ticket
                    </Button>
                </Card.Content>
            )}
        </Card>
    )
}

export default DetailEventCart;