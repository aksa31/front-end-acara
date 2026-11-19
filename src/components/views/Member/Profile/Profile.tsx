import { Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import PictureTab from "./PictureTab";
import useDetailProfile from "./useProfile";
import SecurityTab from "./SecurityTab";

const Profile = () => {
    const {
        dataProfile,
        handleUpdateProfile,
        isPendingUpdateProfile,
        isSuccessUpdateProfile
    } = useDetailProfile();
    return (
        <Tabs className="w-full">
            <Tabs.ListContainer className="w-full lg:w-1/2">
                <Tabs.List aria-label="Options" >
                    <Tabs.Tab id="picture">
                        Picture
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="info">
                        Info
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="security">
                        Security
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="picture">
                <PictureTab
                    currentPicture={dataProfile?.profilePicture}
                    onUpdate={handleUpdateProfile}
                    isPendingUpdate={isPendingUpdateProfile}
                    isSuccessUpdate={isSuccessUpdateProfile}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="info">
                <InfoTab
                    dataProfile={dataProfile}
                    isPendingUpdate={isPendingUpdateProfile}
                    isSuccessUpdate={isSuccessUpdateProfile}
                    onUpdate={handleUpdateProfile}
                />
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="security">
                <SecurityTab/>
            </Tabs.Panel>
        </Tabs>
    )
}

export default Profile;