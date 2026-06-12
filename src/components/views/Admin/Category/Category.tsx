import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, Pagination } from '@heroui/react';
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";
import Toaster from "@/components/ui/Toaster";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const Category = () => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { push, isReady, query } = useRouter();
    const { 
        currentLimit, 
        currentPage, 
        dataCategory, 
        isLoadingCategory, 
        isRefetchingCategory, 
        refetchCategory,
        setURL, 
        handleChangePage, 
        handleChangeLimit, 
        handleSearch,
        setSelectedId,
        selectedId
    } = useCategory();


    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady])

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];
            switch (columnKey) {
                case "icon":
    const iconUrl = `${cellValue}`;
    const isValidUrl = iconUrl.startsWith("http") || iconUrl.startsWith("/");
    
    return isValidUrl ? (
        <Image
            src={iconUrl}
            alt="icon"
            width={100}
            height={200}
        />
    ) : (
        <span className="text-xs text-gray-400">No Icon</span>
    );
                case "actions":
                    return (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="cursor-pointer p-1">
                                    <CiMenuKebab className="text-default-700" />
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <Dropdown.Menu>
                                    <Dropdown.Item onPress={() => push(`/admin/category/${category._id}`)} >
                                        Detail Category
                                    </Dropdown.Item>
                                    <Dropdown.Item className="text-danger" onPress={()=> {
                                        setSelectedId(`${category._id}`);
                                        setIsOpenDeleteModal(true);
                                    }}>
                                        Delete
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
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
                    columns={COLUMN_LIST_CATEGORY}
                    data={dataCategory?.data || []}
                    buttonTopContentLabel="Create Category"
                    onClickButtonTopContent={() => setIsOpenAddModal(true)}
                    renderCell={renderCell}
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    limit={String(currentLimit)}
                    currentPage={Number(currentPage)}
                    totalPages={3}
                    onChangeLimit={handleChangeLimit}
                    onChangeSearch={handleSearch}
                    onChangePage={handleChangePage}
                />
            )}
            <AddCategoryModal
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
            />
        </section>
    );
};

export default Category;