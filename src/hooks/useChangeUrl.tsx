import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { Key } from "react";

const useChangeUrl = () => {
    const router = useRouter();
    const debounce = useDebounce();
    const currentLimit = router.query.limit;
    const currentPage = router.query.page;
    const currentSearch = router.query.search;
    
    const setUrl = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || "",
            },
        });
    }

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
        setUrl,
        currentLimit,
        currentPage,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleSearch,
    };
};

export default useChangeUrl;