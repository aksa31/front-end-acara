import DataTable from "@/components/ui/DataTable";
import { Button, Chip, Dropdown, Pagination } from '@heroui/react';
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_BANNER } from "./Banner.constant";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useCategory from "./useBanner";
import InputFile from "@/components/ui/InputFile";
import Toaster from "@/components/ui/Toaster";
import AddCategoryModal from "./AddBannerModal";
import DeleteCategoryModal from "./DeleteBannerModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";

const Banner = () => {
    // coba ganti setovrlaystate liat dari ticket
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { push, isReady, query } = useRouter();
    const {
        dataBanner,
        refetchBanner,
        isLoadingBanner,
        isRefetchingBanner,
        setSelectedId,
        selectedId,
    } = useBanner();

    const { setUrl } = useChangeUrl();
    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady])
    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner];
            switch (columnKey) {
                case "image":
                    const imageUrl = `${cellValue}`;
                    const isValidUrl = imageUrl.startsWith("http") || imageUrl.startsWith("/");

                    return isValidUrl ? (
                        <Image
                            src={imageUrl}
                            alt="image"
                            width={100}
                            height={200}
                        />
                    ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                    );
                case "isShow":
                    return (
                        <Chip color={cellValue === true ? "success" : "warning"} size="sm" variant="soft">
                            {cellValue === true ? "Showing" : "Not Showing"}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${banner._id}`);
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
                    columns={COLUMN_LIST_BANNER}
                    data={dataBanner?.data || []}
                    buttonTopContentLabel="Create Banner"
                    emptyNotFound="No Banner Found"
                    onClickButtonTopContent={() => setIsOpenAddModal(true)}
                    renderCell={renderCell}
                    isLoading={isLoadingBanner || isRefetchingBanner}
                    totalPages={dataBanner?.pagination.totalPages}
                />
            )}
            {/* <AddCategoryModal
                isOpen={isOpenAddModal}
                onOpenChange={setIsOpenAddModal}
                refetchCategory={refetchBanner}
            />
            <DeleteCategoryModal
                isOpen={isOpenDeleteModal}
                onOpenChange={setIsOpenDeleteModal}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchBanner}
            /> */}
        </section>
    );
};

export default Banner;