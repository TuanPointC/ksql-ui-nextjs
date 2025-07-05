
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';



export default function SearchStream(props) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    props.setSearchValue(searchValue);
    var newData = props.streams.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchValue.toLowerCase())
    );
    props.setdataTable(newData);
    props.setPage(0); 
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={e => { e.preventDefault(); handleSearchClick(); }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Streams"
        value={searchValue}
        onChange={handleInputChange}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
