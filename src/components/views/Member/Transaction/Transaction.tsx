import DataTable from "@/components/ui/DataTable";
import { Chip } from '@heroui/react';
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useTransaction from "./useTransaction";
import { convertIDR } from "@/utils/currency";

const Transaction = () => {
    // coba ganti setovrlaystate liat dari ticket
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { push, isReady, query } = useRouter();
    const {
        dataTransactions,
        refetchTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
    } = useTransaction();

    const { setUrl } = useChangeUrl();
    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady])
    const renderCell = useCallback(
        (transaction: Record<string, unknown>, columnKey: Key) => {
            const cellValue = transaction[columnKey as keyof typeof transaction];
            switch (columnKey) {
                case "status":
                    return (
                        <Chip color={cellValue === 'completed' ? "success" : "warning"} size="sm" variant="soft">
                            {cellValue as ReactNode}
                        </Chip>
                    )
                case "total":
                    return convertIDR(Number(cellValue));
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => push(`/member/transaction/${transaction._id}`)}
                            hideButtonDelete
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
                    columns={COLUMN_LIST_TRANSACTION}
                    data={dataTransactions?.data || []}
                    emptyNotFound="Transaction is empty"
                    onClickButtonTopContent={() => setIsOpenAddModal(true)}
                    renderCell={renderCell}
                    isLoading={isLoadingTransactions || isRefetchingTransactions}
                    totalPages={dataTransactions?.pagination.totalPages}
                />
            )}

        </section>
    );
};

export default Transaction;