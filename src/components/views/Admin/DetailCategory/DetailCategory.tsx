import { Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
    const {
        dataCategory,
        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory,
    } = useDetailCategory();
    return (
        <Tabs className="w-full">
            <Tabs.ListContainer>
                <Tabs.List aria-label="Options" className="w-full max-w-sm">
                    <Tabs.Tab id="icon">
                        Icon
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="info">
                        Info
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="icon">
                <IconTab
                    currentIcon={dataCategory?.icon}
                    isPendingUpdate={isPendingUpdateCategory}
                    isSuccessUpdate={isSuccessUpdateCategory}
                    onUpdate={handleUpdateCategory}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="info">
                <InfoTab
                    dataCategory={dataCategory}
                    isPendingUpdate={isPendingUpdateCategory}
                    isSuccessUpdate={isSuccessUpdateCategory}
                    onUpdate={handleUpdateCategory}
                />
            </Tabs.Panel>
        </Tabs>
    )
}

export default DetailCategory;