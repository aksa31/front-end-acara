import { Skeleton } from "@heroui/react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
    const { dataBanners, isLoadingBanners, dataFeaturedEvents, isLoadingFeaturedEvents, dataLatestEvents, isLoadingLatestEvents, dataCategories, isLoadingCategories } = useHome();
    return (
        <div>
            <HomeSlider banners={dataBanners?.data} isLoadingBanners={isLoadingBanners} />
            <HomeEventList title="Featured Events" events={dataFeaturedEvents?.data} isLoading={isLoadingFeaturedEvents} urlMore="/event?isFeatured=true"/>
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
            <HomeEventList title="Latest Events" events={dataLatestEvents?.data} isLoading={isLoadingLatestEvents}  />
            <HomeCategoryList categories={dataCategories?.data} isLoading={isLoadingCategories} />
        </div>
    )
}

export default Home;