import { LIMIT_LISTS } from "@/constants/list.constants";
import { Button, Input, Label, ListBox, Pagination, SearchField, Select, Spinner, Table } from "@heroui/react"
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import PaginationWithEllipsis from "./Pagination";
import { cn } from "@/utils/cn";

interface PropTypes {
    buttonTopContentLabel?: string;
    columns: Record<string, unknown>[];
    limit: number;
    currentPage: number;
    totalPages: number;
    data: Record<string, unknown>[];
    isLoading?: boolean;
    onChangeSearch: (value: string) => void;
    onChangeLimit: (value: number) => void;
    onChangePage: (page: number) => void;
    onClickButtonTopContent?: () => void;
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}
const DataTable = (props: PropTypes) => {
    const { buttonTopContentLabel, onClickButtonTopContent, isLoading, limit, onChangeLimit, columns, data, renderCell, totalPages, onChangePage, onChangeSearch, currentPage } = props;
    const topContent = useMemo(() => {
        return (
            <div className="flex items-start gap-y-4 justify-between py-2 lg:flex-row lg:items-center">
                <SearchField className="w-full sm:max-w-[24%]" onChange={onChangeSearch}>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input placeholder="Sarch by name" />
                        <SearchField.ClearButton />
                    </SearchField.Group>
                </SearchField>
                {buttonTopContentLabel &&
                    <Button variant="danger" onPress={onClickButtonTopContent}>
                        {buttonTopContentLabel}
                    </Button>
                }
            </div>
        )
    }, [buttonTopContentLabel, onClickButtonTopContent])

    const BottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
                <Select
                    // defaultValue={LIMIT_LISTS[0].value}
                    className="hidden max-w-36 h-10 lg:block"
                    value={limit}
                    selectionMode="single"
                    onChange={(value) => {
                        if (value !== null) {
                            onChangeLimit(Number(value));
                        }
                    }}
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
                <PaginationWithEllipsis currentPage={currentPage} total={totalPages} onChangePage={onChangePage} />
            </div>
        )
    }, [limit, currentPage, totalPages, onChangeLimit, onChangePage])

    return (
        <>
            {topContent}
            <Table className={cn("max-w-full", { "overflow-x-hidden": isLoading })}>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Data table">
                        <Table.Header>
                            {columns.map((column, index) => (
                                <Table.Column
                                    isRowHeader={index === 0}>
                                    {column.name as string}
                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <p className="text-center py-4">No Category Found.</p>
                            )}>
                            {data.map((item) => (
                                <Table.Row key={item.key as Key}>
                                    {columns.map((column) => (
                                        <Table.Cell key={column.uid as Key}>
                                            {renderCell(item, column.uid as Key)}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table.Content>
                            {isLoading && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground-700/30 backdrop-blur-sm rounded-lg">
                                    <Spinner color="danger" />
                                </div>
                            )}
                </Table.ScrollContainer>
            </Table>
            {BottomContent}
        </>
    )
}

export default DataTable