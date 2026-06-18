import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "@/hooks/useChangeUrl"
import eventServices from "@/services/event.service";

const useEvent = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();


  const getEvent = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents
  } = useQuery({
    queryKey: ["Events", currentPage, currentLimit, currentSearch],
    queryFn: () => getEvent(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

 
  return {
    dataEvents,
    refetchEvents,
    isLoadingEvents,
    isRefetchingEvents,
    setSelectedId,
    selectedId,
  };
};

export default useEvent;