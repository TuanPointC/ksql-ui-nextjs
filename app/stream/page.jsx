"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MUI components
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, TablePagination, TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Local imports
import SearchStream from './SearchStream';
import Loader from '../../components/Loader/Loader';
import './Stream.scss';



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

function createData(name, topic, keyFormat, valueFormat, isWindowed) {
  return { name, topic, keyFormat, valueFormat, isWindowed };
}

const page = () => {
  const [streams, setStreams] = useState([]);
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
          query: "SHOW STREAMS;"
        });
        const rawData = JSON.parse(responses?.data?.result)[0]?.streams;
        const data = rawData?.map(e => createData(e.name, e.topic, e.keyFormat, e.valueFormat, e.isWindowed));
        setStreams(data);
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
      const filteredData = streams.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchValue.toLowerCase())
      );
      return filteredData.length;
    } else
      return streams.length;
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  useEffect(() => {
    if (searchValue) {
      const filteredData = streams.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchValue.toLowerCase())
      );
      setdataTable(filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    } else
      setdataTable(streams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  }, [rowsPerPage, page]);

  return (
    <div className="stream-container">
      <Loader loading={loading} className="loader" color='#351C57' />

      <div className='search-container'>
        <SearchStream
          dataTable={dataTable}
          setdataTable={setdataTable}
          setPage={setPage}
          streams={streams}
          setSearchValue={setSearchValue} />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: '85vh', position: 'relative' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Topic</StyledTableCell>
              <StyledTableCell align="left">Key Format</StyledTableCell>
              <StyledTableCell align="left">Value Format</StyledTableCell>
              <StyledTableCell align="left">Is Windowed</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(dataTable ?? [])?.map((stream) => (
              <StyledTableRow key={stream.name}>
                <StyledTableCell align="left">
                  <a href={`/stream/${stream.name}`} className="stream-link">
                    {stream.name}
                  </a>
                </StyledTableCell>
                <StyledTableCell align="left">{stream.topic}</StyledTableCell>
                <StyledTableCell align="left">{stream.keyFormat}</StyledTableCell>
                <StyledTableCell align="left">{stream.valueFormat}</StyledTableCell>
                <StyledTableCell align="left">{stream.isWindowed?.toString()}</StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    style={{ color: 'red' }}
                    onClick={(e) => {
                      e.stopPropagation();

                    }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
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