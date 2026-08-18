import { cn } from "@/utils/cn";
import { Avatar, Button, CloseButton, Dropdown, EmptyState, Input, Label, Link, ListBox, Spinner } from "@heroui/react"
import Image from "next/image"
import { useState, useEffect, ReactNode } from "react";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { GiEarbuds } from "react-icons/gi";
import { BsPersonSlash } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { IEvent } from "@/types/Event";


interface NavbarItem {
    label: string;
    href: string;
    isActive?: boolean;
}

interface NavbarProps {
    brand?: ReactNode;
    items?: NavbarItem[];
    rightContent?: ReactNode;
    className?: string;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    position?: "static" | "sticky" | "fixed";
}

const maxWidthClasses = {
    sm: "max-w-[640px]",
    md: "max-w-[768px]",
    lg: "max-w-[1024px]",
    xl: "max-w-[1280px]",
    "2xl": "max-w-[1536px]",
    full: "max-w-full",
};

function useScrollDirection() {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsHidden(currentScrollY > lastScrollY && currentScrollY > 64);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return isHidden;
}

const LandingPageLayoutNavbar = ({
    brand,
    items,
    rightContent,
    className,
    maxWidth = "lg",
    position = "sticky",
}: NavbarProps) => {
    const session = useSession();
    const router = useRouter();
    const isHidden = useScrollDirection();
    const [open, setOpen] = useState(false);
    const {
        dataProfile,
        dataEventsSearch,
        isLoadingEventsSearch,
        isRefetchingEventsSearch,
        handleSearch,
        search,
        setSearch
    } = useLandingPageLayoutNavbar();


    return (
        <>
            <nav className={cn(
                " border border-solid flex justify-between px-6",
                isHidden && "-translate-y-full"
            )}>
                <header className="flex h-16 items-center">
                    <div className="flex items-center gap-8 mr-6">
                        <Link href="/">
                            <Image
                                src="/images/general/logo.svg"
                                alt="logo"
                                width={100}
                                height={50}
                                className="cursor-pointer" />
                        </Link>
                    </div>
                    <ul className="flex items-center gap-4 hidden lg:flex">
                        {NAV_ITEMS.map((item, index) => (
                            <li
                                key={`${item.label}-${index}`}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "font-medium text-default-700 hover:text-red-600 no-underline",
                                        {
                                            "font-bold text-red-500": router.pathname === item.href,
                                        }
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </header>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex items-center gap-2 hidden lg:flex ">
                            <Input
                                value={search}
                                onChange={handleSearch}
                                className="w-[300px]"
                                placeholder="Search Event"
                            />
                            {search && (
                                <CloseButton
                                    aria-label="Clear"
                                    onPress={() => setSearch("")}
                                />
                            )}
                        </div>
                        {search !== "" && (
                            <ListBox
                                items={(dataEventsSearch?.data ?? []).map((item: IEvent) => ({
                                    ...item,
                                    id: item._id,
                                }))}
                                renderEmptyState={() => <EmptyState>No Items</EmptyState>}
                                className="hidden lg:flex absolute right-0 top-12 z-50 rounded-xl border bg-white   "
                            >
                                {!isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                                    (item: IEvent) => (
                                        <ListBox.Item
                                            key={item._id}
                                            href={`/event/${item.slug}`}
                                            className="flex items-center gap-2"
                                        >
                                            <Image src={`${item.banner}`} alt={`${item.name}`} className="h-[60px] w-2/5 rounded-md object-cover" height={100} width={40} />
                                            <p className="line-clamp-2 w-3/5 text-wrap">{item.name}</p>
                                        </ListBox.Item>
                                    )
                                ) : (
                                    <ListBox.Item className="flex items-center" key="Loading">
                                        <Spinner color="danger" size="sm" />
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        )}
                    </div>
                    <button
                        aria-label={open ? "Close Menu" : "Open Menu"}
                        onClick={() => {
                            setOpen(!open)
                        }}
                        className="lg:hidden"
                    >
                        {open ? <RxCross1 className="h-8 w-8" /> : <CiMenuBurger className="h-8 w-8" />}

                    </button>
                    {session.status === 'authenticated' ? (
                        <nav className="hidden lg:flex">
                            <Dropdown>
                                <Dropdown.Trigger className="rounded-full">
                                    <Avatar>
                                        <Avatar.Image
                                            alt={dataProfile?.fullName}
                                            src={dataProfile?.profilePicture}
                                        />
                                        <Avatar.Fallback delayMs={600}>{dataProfile?.fullName.substring(0, 2)}</Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu>
                                        <Dropdown.Item id="admin" textValue="Admin" href="/admin/dashboard" className={cn({
                                            hidden: dataProfile?.role === "ADMIN",
                                        })}>
                                            <Label>Admin</Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="profile" textValue="Profile" href="/member/profile">
                                            <Label>Profile</Label>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="sign-out" textValue="SignOut" onClick={() => signOut()} variant="danger">
                                            <div className="flex w-full items-center justify-between gap-2">
                                                <Label>Sign Out</Label>
                                                <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
                                            </div>/
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </nav>
                    ) : (
                        <div className="hidden lg:gap-4 lg:flex">
                            {BUTTON_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "font-medium hover:text-red-600 no-underline px-4 py-2 rounded-lg",
                                        {
                                            'border  border-red-600 text-red-600': item.variant === 'dashed',
                                            'bg-red-500 text-white': item.variant === 'solid',
                                        },
                                        {
                                            "font-bold text-red-500": router.pathname === item.href,
                                        }
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )
                    }
                </div>
            </nav>
            {open && (
                <div className=" lg:hidden">
                    <ul className="flex flex-col gap-2 px-6">
                        
                        {NAV_ITEMS.map((item) => (
                            <li key={`nav-${item.label}`}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "font-medium text-default-700 hover:text-red-600 no-underline",
                                        {
                                            "font-bold text-red-500": router.pathname === item.href,
                                        }
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {session.status === "authenticated" ? (
                            <>
                                <li>
                                    <Link
                                        href={"/admin/dashboard"}
                                        className={cn(
                                            "font-medium text-default-700 hover:text-red-600 no-underline",
                                            {
                                                "hidden": dataProfile?.role !== 'admin',
                                            }
                                        )}
                                    >
                                        Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/member/profile"}
                                        className={cn(
                                            "font-medium text-default-700 hover:text-red-600 no-underline",
                                        )}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Button variant="danger" onPress={() => signOut()} className="mt-2 w-full" size="md">
                                        Sign Out
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <>
                                {BUTTON_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "font-medium hover:text-red-600 no-underline px-4 py-2 rounded-lg text-center w-full flex justify-center",
                                            {
                                                'border  border-red-600 text-red-600': item.variant === 'dashed',
                                                'bg-red-500 text-white': item.variant === 'solid',
                                            },
                                            {
                                                "font-bold text-red-500": router.pathname === item.href,
                                            }
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

export default LandingPageLayoutNavbar;