import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Category = () => {
    const { push } = useRouter()
    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];
            switch (columnKey) {
                case "icon":
                    return (
                        <Image
                            src={`${cellValue}`}
                            alt="icon"
                            width={100}
                            height={200}
                        />
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
            <DataTable
                onClickButtonTopContent={() => { }}
                columns={COLUMN_LIST_CATEGORY}
                data={[
                    {
                        key: 123,
                        _id: "123",
                        name: "Category 1",
                        description: "Dscription 1",
                        icon: "/images/general/logo.png"
                    }
                ]}
                buttonTopContentLabel="Create Category"
                renderCell={renderCell}
                limit={LIMIT_LISTS[0].value}
                currentPage={1}
                totalPages={2}
                onChangeLimit={() => { }}
                onChangeSearch={() => { }}
                onChangePage={() => { }}
                isLoading={false}
            />
        </section>
    );
};

export default Category;