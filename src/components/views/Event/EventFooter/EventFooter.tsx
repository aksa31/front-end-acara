import PaginationWithEllipsis from "@/components/ui/DataTable/Pagination";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { ListBox, Select } from "@heroui/react";

interface PropTypes {
    totalPages: number;
}
const EventFooter = ({ totalPages }: PropTypes) => {
    const { currentLimit, currentPage, handleChangePage, handleChangeLimit } = useChangeUrl();
    return (
        <div className="flex flex-col gap-4 items-center justify-center px-2 py-2 lg:flex-row lg:justify-between">
            <Select
                    defaultValue={LIMIT_LISTS[0].value}
                    className="max-w-28"
                    value={Number(currentLimit)}
                    selectionMode="single"
                    onChange={handleChangeLimit}
                >
                    <Select.Trigger>
                        Show :&nbsp;
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {LIMIT_LISTS.map((item) => (
                                <ListBox.Item
                                    id={item.value}
                                    textValue={item.value.toString()}
                                >
                                    {item.label}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            <PaginationWithEllipsis currentPage={Number(currentPage)} total={totalPages} onChangePage={handleChangePage} />
        </div>
    )
}

export default EventFooter;