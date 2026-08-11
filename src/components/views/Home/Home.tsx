import { Skeleton } from "@heroui/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
    const { dataBanners, isLoadingBanners, dataFeaturedEvents, isLoadingFeaturedEvents, dataLatestEvents, isLoadingLatestEvents, } = useHome();
    return (
        <div>
            <HomeSlider banners={dataBanners?.data} isLoadingBanners={isLoadingBanners} />
            <HomeList title="Featured Events" events={dataFeaturedEvents?.data} isLoading={isLoadingFeaturedEvents} />
            {!isLoadingBanners ? (
                <div className="mx-6">
                    <Image
                        src={dataBanners && dataBanners?.data[0]?.image}
                        alt="Banner"
                        className=" h-[20vw] w-full rounded-2xl object-cover object-center"
                        width={1920}
                        height={800}
                    />
                </div>

            ) : (
                <div className="mx-6">
                    <Skeleton className="mb-16 h-[20vw] w-full rounded-2xl">
                    </Skeleton>
                </div>
            )}
            <HomeList title="Latest Events" events={dataLatestEvents?.data} isLoading={isLoadingLatestEvents} />
        </div>
    )
}

export default Home;