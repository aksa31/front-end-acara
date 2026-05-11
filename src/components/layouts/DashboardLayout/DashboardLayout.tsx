import PageHead from "@/components/commons/PageHead";
import DashboardLayoutSidebar from "./DashboardLayotSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

interface PropTypes {
    children: React.ReactNode;
    title?: string;
    description?: string;
    type?: string;
}

const DashboardLayout = ({ children, title, description, type = 'admin' }: PropTypes) => {
    const [open, setOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <PageHead title={title} />
            <div className="max-w-screen-xl xl:container flex">
                <DashboardLayoutSidebar
                    sidebarItems={type === 'admin' ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                    isOpen={open}
                />
                <div className="h-screen w-full overflow-y-auto p-8">
                    <nav className="flex justify-between bg-transparent px-0">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <button
                            aria-label={open ? "Close Menu" : "Open Menu"}
                            onClick={() => setOpen(!open)}
                            className="lg:hidden"
                        >
                            {open ? <RxCross1 className="h-8 w-8" /> : <CiMenuBurger className="h-8 w-8" />}

                        </button>
                    </nav>
                    <p className="mb-4 text-sm">{description}</p>
                    {children}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;