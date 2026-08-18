import { DEFAULT_PAGE, LIMIT_EVENT } from "@/components/views/Home/Home.constants";
import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { setServers } from "dns";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [search, setSearch] = useState("");
    const debounce = useDebounce();
    const getProfile = async () => {
        const { data } = await authServices.getProfile();
        return data.data;
    };

    const { data: dataProfile, refetch: refetchProfile } = useQuery({
        queryKey: ['Profile'],
        queryFn: getProfile,
        enabled: router.isReady
    });

    const getEventsSearch = async () => {
        const params = `search=${search}&limit=${LIMIT_EVENT}&page=${DEFAULT_PAGE}&isPublished=true`
        const res = await eventServices.getEvents(params);
        const { data } = res;
        return data;
    };


    const { data: dataEventsSearch, isLoading: isLoadingEventsSearch, isRefetching: isRefetchingEventsSearch } = useQuery({
        queryKey: ["EventsSearch", search],
        queryFn: () => getEventsSearch(),
        enabled: !!search,
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value); 
        debounce(() => setSearch(value), DELAY)
    }

    return {
        dataProfile,
        dataEventsSearch,
        isLoadingEventsSearch,
        isRefetchingEventsSearch,
        handleSearch,
        search: inputValue,   
        setSearch: setInputValue,
    };
}

export default useLandingPageLayoutNavbar;