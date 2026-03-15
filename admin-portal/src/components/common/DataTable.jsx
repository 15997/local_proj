import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  TableSortLabel,
  Checkbox,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const DataTable = ({ 
  columns, 
  data, 
  loading, 
  onRowClick, 
  enableSelection, 
  selected = [], 
  onSelectionChange 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(columns[0]?.id || '');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      onSelectionChange(newSelected);
      return;
    }
    onSelectionChange([]);
  };

  const handleClick = (event, id) => {
    event.stopPropagation(); // Prevent row click trigger
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    onSelectionChange(newSelected);
  };

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortData = (array) => {
    const comparator = (a, b) => {
      if (b[orderBy] < a[orderBy]) return order === 'desc' ? -1 : 1;
      if (b[orderBy] > a[orderBy]) return order === 'desc' ? 1 : -1;
      return 0;
    };
    return [...array].sort(comparator);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No records found matching criteria.</Typography>
      </Box>
    );
  }

  const sortedData = sortData(data);
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {enableSelection && (
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell 
                  key={col.id}
                  align={col.align || 'left'}
                  sx={{ width: col.width }}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={() => handleRequestSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isSelected = selected.indexOf(row.id) !== -1;

              return (
                <TableRow
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isSelected}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {enableSelection && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => {
                    const value = col.render ? col.render(row) : row[col.id];
                    return (
                      <TableCell key={col.id} align={col.align || 'left'}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      />
    </Box>
  );
};

export default DataTable;
