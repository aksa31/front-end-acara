import DataTable from "@/components/ui/DataTable";
import { Button, Chip, Dropdown, Pagination } from '@heroui/react';
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_EVENT } from "./Event.constant";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useEvent from "./useEvent"
import InputFile from "@/components/ui/InputFile";
import Toaster from "@/components/ui/Toaster";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { push, isReady, query } = useRouter();
    const {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,
        setSelectedId,
        selectedId
    } = useEvent();

    const { setUrl } = useChangeUrl();
    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady])
    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];
            switch (columnKey) {
                case "banner":
                    const iconUrl = `${cellValue}`;
                    const isValidUrl = iconUrl.startsWith("http") || iconUrl.startsWith("/");

                    return isValidUrl ? (
                        <Image
                            src={iconUrl}
                            alt="icon"
                            width={200}
                            height={100}
                            className="w-36 aspect-video object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">No Icon</span>
                    );
                case "isPublish":
                    return (
                        <Chip color={cellValue === true ? "success" :"warning"} size="sm" variant="soft">
                            {cellValue === true ? "published" : "Not Published"}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction 
                        onPressButtonDetail={() => push(`/admin/event/${event._id}`)} 
                            onPressButtonDelete={() => { 
                            setSelectedId(`${event._id}`); 
                            setIsOpenDeleteModal(true);
                            }} 
                        />
                    );
                default:
                    return cellValue as ReactNode;
            }
        }, [push]
    )
    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    columns={COLUMN_LIST_EVENT}
                    data={dataEvents?.data || []}
                    buttonTopContentLabel="Create Event"
                    emptyNotFound="No Event Found"
                    onClickButtonTopContent={() => setIsOpenAddModal(true)}
                    renderCell={renderCell}
                    isLoading={isLoadingEvents || isRefetchingEvents}
                    totalPages={3}
                />
            )}
            {/* <AddEvents
                isOpen={isOpenAddModal}
                onOpenChange={setIsOpenAddModal}
                refetchCategory={refetchCategory}
            />
            <DeleteCategoryModal
                isOpen={isOpenDeleteModal}
                onOpenChange={setIsOpenDeleteModal}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchCategory}
            /> */}
        </section>
    );
};

export default Event;