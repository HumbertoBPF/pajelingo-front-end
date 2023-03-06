import PaginationButton from "components/PaginationButton";
import styles from "./Pagination.module.css"

function getPageButtons(index, page, numberPages, callback) {
    // Current page button
    if (index === page) {
        return (<PaginationButton key={index} page={index} active callback={callback}>{index}</PaginationButton>);
    } 
    // First and last page buttons
    if ((index === 1) || (index === numberPages)) {
        return (<PaginationButton key={index} page={index} callback={callback}>{index}</PaginationButton>);
    }
    // Button separating the first page and the current page (if necessary)
    if ((index === 2) && (page > 2)) {
        return (<PaginationButton key={index} callback={callback}>...</PaginationButton>);
    }
    // Button separating the last page and the current page (if necessary)
    if ((index === numberPages-1) && (page < numberPages-1)) {
        return (<PaginationButton key={index} callback={callback}>...</PaginationButton>);
    }
}

export default function Pagination({ previous, next, count, resultsPerPage, page, callback=((page) => {}) }) {
    const numberPages =  Math.ceil(count/resultsPerPage);
    let paginationArray = []

    for (let i=1;i <= numberPages;i++) {
        paginationArray.push(i);
    }

    return (
        <nav className="mt-4" aria-label="Page navigation example">
            <ul className={`pagination ${styles["pagination"]}`}>
                { (previous != null)?<PaginationButton page={page-1} callback={callback}>&laquo;</PaginationButton>:null }
                { paginationArray.map(item => getPageButtons(item, page, numberPages, callback)) }
                { (next != null)?<PaginationButton page={page+1} callback={callback}>&raquo;</PaginationButton>:null }
            </ul>
        </nav>
    )
}