import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "@/hooks/useChangeUrl"
import orderServices from "@/services/order.service";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const getMemberTransactions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ["MemberTransactions", currentPage, currentLimit, currentSearch],
    queryFn: () => getMemberTransactions(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });


  return {
    dataTransactions,
    refetchTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,

  };
};

export default useTransaction;