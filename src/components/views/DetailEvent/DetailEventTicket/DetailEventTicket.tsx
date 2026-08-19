import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Accordion, Button, Card, Chip } from "@heroui/react";
import { useSession } from "next-auth/react";
import { BiChevronDown } from "react-icons/bi";

interface PropTypes {
    key?: string;
    ticket: ITicket;
    cart: ICart;
    handleAddToCart: () => void;

}

const DetailEventTicket = ({ key, ticket, cart, handleAddToCart }: PropTypes) => {
    const session = useSession();
    return (
        <Card className="px-4 pb-4 " key={key}>
            <Accordion>
                <Accordion.Item
                    key={ticket?._id}
                    className="border-b-2 border-dashed"
                >
                    <Accordion.Heading>
                        <Accordion.Trigger>
                            <div className="flex items-center gap-2 pb-0">
                                <h2 className="text-2xl font-bold text-gray-700">
                                    {ticket?.name}
                                </h2>
                                {Number(ticket?.quantity) > 0 ? (
                                    <Chip size="sm" color="success" variant="soft">Available</Chip>
                                ) : (
                                    <Chip size="sm" color="danger" variant="soft">Sold Out</Chip>
                                )}
                            </div>
                            <Accordion.Indicator>
                                <BiChevronDown />
                            </Accordion.Indicator>
                        </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                        <Accordion.Body><p>{ticket?.description}</p></Accordion.Body>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <div className="mt-2 flex items-center justify-between px-4">
                <h2 className="text-lg font-semibold text-gray-700">{convertIDR(Number(ticket?.price))}</h2>
                {session?.status === 'authenticated' && Number(ticket?.quantity) > 0 && (
                    <Button
                        size="md"
                        variant="primary"
                        className="font-bold text-warning bg-white border border-warning disabled:opacity-20 "
                        isDisabled={cart?.ticket === ticket?._id}
                        onPress={handleAddToCart}
                    >
                        Add To Cart
                    </Button>
                )}
            </div>
        </Card>
    )
}

export default DetailEventTicket;