import { cn } from "@/utils/cn";
import { Button, ListBox } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
    const router = useRouter();
    return (
        <div className={cn(
            "fixed flex z-50 h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
            { "translate-x-0": isOpen }
        )}
        >
            <div>
                <div className="flex justify-center w-full">
                    <Image
                        src="/images/general/logo.svg"
                        alt="logo"
                        loading="eager"
                        width={180}
                        height={60}
                        className="mb-6 w-32"
                        onClick={() => router.push('/')}
                    >
                    </Image>
                </div>
                <ListBox
                    items={sidebarItems}
                    variant="default"
                    aria-label="Dashboard Menu"
                >
                    {(item) => (
                        <ListBox.Item
                            id={item.key}
                            className={cn("my-1 h-12 text-2xl", {
                                "bg-red-500 text-white": router.pathname.startsWith(item.href)
                            })}
                            textValue={item.label}
                            aria-labelledby={item.label}
                            href={item.href}
                        >
                            {item.icon}
                            <p className="text-sm">{item.label}</p>
                        </ListBox.Item>
                    )}

                </ListBox>
            </div>
            <div className="flex items-center p-1">
                <Button
                    size="lg"
                    fullWidth
                    variant="ghost"
                    className="flex justify-start rounded-lg px-2 py-1.5 text-red-500"
                    onPress={() => signOut()}
                >
                    <CiLogout />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default DashboardLayoutSidebar;