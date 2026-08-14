import { ICategory } from "@/types/Category";
import { Card, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
    categories: ICategory[],
    isLoading: boolean,
}

const HomeCategoryList = ({ categories, isLoading }: PropTypes) => {
    return (
        <Card className="mx-6 mb-8 p-8 lg:mx-0">
            <Card.Header className="p-0">
                <h1 className="text-2xl font-bold text-danger">Event By Category</h1>
            </Card.Header>
            <Card.Content className="mt-4 p-0">
                <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8 lg:overflow-visible">
                    {!isLoading && categories ? (
                        categories?.map((category) => (
                            <Link href={`/event?category=${category._id}`} key={`category-${category._id}`} className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4">
                                <Image
                                    src={`${category.icon}`}
                                    alt={`${category.name}`}
                                    className="h-1/2"
                                    width={100}
                                    height={100}
                                />
                                <p className="text-md font-bold">
                                    {category?.name}
                                </p>
                            </Link>
                        ))
                    ) : (
                        Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={`list-category-skeleton-${i}`} className="aspect-square rounded-xl" />
                        ))
                    )}
                </div>
            </Card.Content>
        </Card>
    )
}

export default HomeCategoryList;