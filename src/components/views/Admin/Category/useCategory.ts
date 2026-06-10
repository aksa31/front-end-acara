import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, Key } from "react";

const useCategory = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

  const setURL = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const getCategories = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      }
    })
  }

 const handleChangeLimit = (value: Key | Key[] | null) => {
   if (!value) return;
   const selected = Array.isArray(value) ? value[0] : value;
   router.push({
     query: {
       ...router.query,
       limit: selected.toString(),
       page: PAGE_DEFAULT,
     },
   });
 };

 const handleSearch = (value: string) => {
  debounce(() => {
    router.push({
      query: {
        ...router.query,
        search: value,
        page: PAGE_DEFAULT,
      },
    });
  }, DELAY);
 }


 
  return {
    setURL,
    currentPage,
    currentLimit,
    currentSearch,
    dataCategory,
    refetchCategory,
    isLoadingCategory,
    isRefetchingCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
  };
};

export default useCategory;
