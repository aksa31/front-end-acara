import { Tabs } from "@heroui/react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailBanner";

const DetailCategory = () => {
    const {
        dataBanner,
        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner,
    } = useDetailCategory();
    return (
        <Tabs className="w-full">
            <Tabs.ListContainer>
                <Tabs.List aria-label="Options" className="w-full max-w-sm">
                    <Tabs.Tab id="image">
                        Image
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="info">
                        Info
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="image">
                <ImageTab
                    currentImage={dataBanner?.image}
                    isPendingUpdate={isPendingUpdateBanner}
                    isSuccessUpdate={isSuccessUpdateBanner}
                    onUpdate={handleUpdateBanner}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="info">
                <InfoTab
                    dataBanner={dataBanner}
                    isPendingUpdate={isPendingUpdateBanner}
                    isSuccessUpdate={isSuccessUpdateBanner}
                    onUpdate={handleUpdateBanner}
                />
            </Tabs.Panel>
        </Tabs>
    )
}

export default DetailCategory;