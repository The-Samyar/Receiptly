import { useEffect, useState } from 'react'
import styles from './Pagination.module.css'
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

export const Pagination = ({ numberOfItemsPerPage = 0, numberOfItems = 0 }) => {

    const [activePage, setActivePage] = useState(4);
    const numberOfPages = Math.ceil(numberOfItems / numberOfItemsPerPage);
    const numberOfVisiblePages = 7

    if (numberOfPages <= 1) return null; // No need to show pagination if only 1 page exists

    const goToPage = (page) => {
        if (page >= 1 && page <= numberOfPages) setActivePage(page);
    };

    const generatePages = () => {
        let pages = [];

        if (numberOfPages < 6) {
            for (let i = 1; i <= numberOfPages; i++) pages.push(i);
        } else {

            const needBackDots = (activePage) >= 5;
            const needForwardDots = (numberOfPages - activePage) >= 4;
            pages.push(1);

            if (needBackDots) {
                pages.push("...");
            } else {
                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
            }

            if (needBackDots && needForwardDots) {
                pages.push(activePage - 1)
                pages.push(activePage)
                pages.push(activePage + 1)
            }


            if (needForwardDots) {
                pages.push("...");
            } else {
                const min = numberOfPages - 4;
                for (let i = min; i < numberOfPages; i++) {
                    pages.push(i);
                }
            }

            pages.push(numberOfPages)
        }

        return pages;
    };

    return (
        <div className={styles.PaginationContainer}>
            <div className={styles.PaginationItemsContainer}>
                <div>
                    <MdSkipPrevious className={styles.icons} onClick={() => goToPage(Number(activePage) - 1)} />
                </div>
                {
                    generatePages().map(page => {
                        return (
                            <div className={Number(activePage) === page ? styles.activeItem : styles.PaginationItem}
                                onClick={page !== "..." ? () => goToPage(page) : null}
                            >
                                {page}
                            </div>
                        )
                    })
                }
                <div>
                    <MdSkipNext className={styles.icons} onClick={() => goToPage(Number(activePage) + 1)} />
                </div>
            </div>
        </div>
    )
}
