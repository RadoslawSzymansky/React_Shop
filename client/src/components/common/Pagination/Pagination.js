import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MyPagination = ({ setPage, pages, page }) => (
  <Pagination aria-label="Page navigation example">

    {page !== 1 ? (
      <PaginationItem>
        <PaginationLink previous href="#" onClick={() => setPage(page - 1)} />
      </PaginationItem>
    ) : null}


    {[...Array(pages)].map((e, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <PaginationItem key={i} active={i + 1 === page}>
        <PaginationLink onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
      </PaginationItem>
    ))}

    {page !== pages && pages > 1 ? (
      <PaginationItem>
        <PaginationLink next href="#" onClick={() => setPage(page + 1)} />
      </PaginationItem>
    ) : null}

  </Pagination>
);

MyPagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default MyPagination;
