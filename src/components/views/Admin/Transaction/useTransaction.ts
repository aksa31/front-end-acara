import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "@/hooks/useChangeUrl"
import orderServices from "@/services/order.service";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const [selectedId, setSelectedId] = useState('');
  const getAdminTransactions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getOrders(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransaction
  } = useQuery({
    queryKey: ["AdminTransactions", currentPage, currentLimit, currentSearch],
    queryFn: () => getAdminTransactions(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });


  return {
    dataTransactions,
    refetchTransaction,
    isLoadingTransactions,
    isRefetchingTransactions,
    selectedId,
    setSelectedId,
  };
};

export default useTransaction;