import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentCategory, currentIsFeatured, currentIsOnline } = useChangeUrl();

  const getEvent = async () => {
    const params =
      `limit=${currentLimit || ""}` +
      `&page=${currentPage || ""}` +
      `&category=${currentCategory || ""}` +
      `&isFeatured=${currentIsFeatured || ""}` +
      `&isOnline=${currentIsOnline || ""}` +
      `&isPublished=true`;
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
    queryKey: ["Events", currentPage, currentLimit, currentCategory, currentIsFeatured, currentIsOnline],
    queryFn: () => getEvent(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents
  }
}

export default useEvent;