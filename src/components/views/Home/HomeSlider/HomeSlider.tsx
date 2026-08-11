import { IBanner } from "@/types/Banner";
import { Skeleton } from "@heroui/react";
import test from "node:test";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"
import Image from "next/image";

interface PropTypes {
    banners: IBanner[];
    isLoadingBanners: boolean;
}

const HomeSlider = ({ banners, isLoadingBanners }: PropTypes) => {
    return (
        <div className="mx-6 mb-6 h-[25vw] lg:mb-16">
            {!isLoadingBanners ? (
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    spaceBetween={30}
                    loop={true}
                    modules={[Autoplay, Pagination]}
                    className="h-full w-full"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                >
                    {banners?.map((banner: IBanner) => (
                        <SwiperSlide key={banner._id}>
                            <Image
                                src={`${banner.image}`}
                                alt={`${banner.title}`}
                                className="h-[80%] w-full rounded-2xl object-cover lg:h-[90%]"
                                width={1920}
                                height={800}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div>
                    <Skeleton className="h-[90%] w-full rounded-2xl ">
                    </Skeleton>
                </div>
            )}
        </div>
    )
}

export default HomeSlider;