import { Pagination } from "@heroui/react";
import { useState } from "react";
interface PropTypes {
    currentPage: number;
    total: number;
    onChangePage?: (page: number) => void;
}

const PaginationWithEllipsis = ({ currentPage, total, onChangePage }: PropTypes) => {
    const [page, setPage] = useState(currentPage);
    const totalPages = total;

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
        onChangePage?.(newPage)
    }

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];

        pages.push(1);

        if (page > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="max-w-2xs overflow-x-auto sm:max-w-full">
            <Pagination>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous
                            isDisabled={page === 1}
                            onPress={() => handleChangePage(page - 1)} // ← ganti
                        >
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Pagination.Item>
                    {getPageNumbers().map((p, i) =>
                        p === "ellipsis" ? (
                            <Pagination.Item key={`ellipsis-${i}`}>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        ) : (
                            <Pagination.Item key={p}>
                                <Pagination.Link
                                    isActive={p === page}
                                    onPress={() => handleChangePage(p)} // ← ganti
                                >
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ),
                    )}
                    <Pagination.Item>
                        <Pagination.Next
                            isDisabled={page === totalPages}
                            onPress={() => handleChangePage(page + 1)} // ← ganti
                        >
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
}

export default PaginationWithEllipsis