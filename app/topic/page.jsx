"use client";

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Topics.scss';
import TablePagination from '@mui/material/TablePagination';
import Search from './Search';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, replicaInfo) {
  return { name, replicaInfo };
}

const page = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const [dataTable, setdataTable] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const responses = await axios.post(`/api/query`, {
          query: "SHOW TOPICS;"
        });
        const rawData = JSON.parse(responses?.data?.result)[0]?.topics;
        const data = rawData?.map(e => createData(e.name, e.replicaInfo));
        setTopics(data);
        setdataTable(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getCount = () => {
    if (searchValue && searchValue.length > 0) {
      const filteredData = topics.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      return filteredData.length;
    } else
      return topics.length;
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && !topics) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  useEffect(() => {
    if (searchValue) {
      const filteredData = topics.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setdataTable(filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    } else
      setdataTable(topics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  }, [rowsPerPage, page]);

  return (
    <div className="stream-container">
      <Loader loading={loading} className="loader" color='#351C57' />

      <div className='search-container'>
        <Search
          dataTable={dataTable}
          setdataTable={setdataTable}
          setPage={setPage}
          topics={topics}
          setSearchValue={setSearchValue} />
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: '85vh', position: 'relative' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Replicate Info</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(dataTable ?? [])?.map((topics) => (
              <StyledTableRow key={topics.name}>
                <StyledTableCell align="left">{topics.name}</StyledTableCell>
                <StyledTableCell align="left">{topics.replicaInfo}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='pagination-container' >
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={getCount()}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default page;