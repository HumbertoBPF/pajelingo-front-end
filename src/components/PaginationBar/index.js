import { Pagination } from "react-bootstrap";
import styles from "./PaginationBar.module.css";
import PropTypes from "prop-types";

function getPageButtons(index, page, numberPages, callback) {
  // Current page button
  if (index === page) {
    return (
      <Pagination.Item
        key={index}
        active
        onClick={() => {
          callback(index);
        }}>
        {index}
      </Pagination.Item>
    );
  }
  // First and last page buttons
  if (index === 1 || index === numberPages) {
    return (
      <Pagination.Item key={index} onClick={() => callback(index)}>
        {index}
      </Pagination.Item>
    );
  }
  // Button separating the first page and the current page (if necessary)
  if (index === 2 && page > 2) {
    return <Pagination.Ellipsis key={index} />;
  }
  // Button separating the last page and the current page (if necessary)
  if (index === numberPages - 1 && page < numberPages - 1) {
    return <Pagination.Ellipsis key={index} />;
  }
}

export default function PaginationBar({
  previous,
  next,
  count,
  resultsPerPage,
  page,
  callback = () => {}
}) {
  const numberPages = Math.ceil(count / resultsPerPage);
  const paginationArray = [];

  for (let i = 1; i <= numberPages; i++) {
    paginationArray.push(i);
  }

  return (
    <Pagination className={`mt-4 pagination ${styles["pagination"]}`}>
      {previous !== null ? (
        <Pagination.Prev onClick={() => callback(page - 1)} />
      ) : null}
      {paginationArray.map((item) =>
        getPageButtons(item, page, numberPages, callback)
      )}
      {next !== null ? (
        <Pagination.Next onClick={() => callback(page + 1)} />
      ) : null}
    </Pagination>
  );
}

PaginationBar.propTypes = {
  previous: PropTypes.string,
  next: PropTypes.string,
  count: PropTypes.number,
  resultsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number,
  callback: PropTypes.func
};
