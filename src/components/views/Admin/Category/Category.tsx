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

const Category = () => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
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
        handleSearch 
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
                // case "icon":
                //     return (
                //         <Image
                //             src={`${cellValue}`}
                //             alt="icon"
                //             width={100}
                //             height={200}
                //         />
                //     );
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
                                    <Dropdown.Item className="text-danger" >
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
        </section>
    );
};

export default Category;