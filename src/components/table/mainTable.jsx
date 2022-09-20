import { useSelector, useDispatch } from 'react-redux';

import {
    setData,
    setDataBy,
    setPage,
    setRowsPerPage,
} from '../../redux/reducer/reducers';
import { HeadTable } from '../../layout/table/headTable';

import { format } from 'date-fns';
import { ru } from 'date-fns/esm/locale';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MainTable({ archiveData }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bitcoin.data);
    const dataBy = useSelector((state) => state.bitcoin.dataBy);
    const page = useSelector((state) => state.bitcoin.page);
    const rowsPerPage = useSelector((state) => state.bitcoin.rowsPerPage);

    function Sort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingDirection(a, b, dataBy) {
        if (b[dataBy] < a[dataBy]) {
            return -1;
        }
        if (b[dataBy] > a[dataBy]) {
            return 1;
        }
        return 0;
    }

    function getDirection(data, dataBy) {
        return data === 'desc'
            ? (a, b) => descendingDirection(a, b, dataBy)
            : (a, b) => -descendingDirection(a, b, dataBy);
    }

    const handleSort = (event, property) => {
        const direction = dataBy === property && data === 'asc';
        dispatch(setData(direction ? 'desc' : 'asc'));
        dispatch(setDataBy(property));
    };

    const handleChangePage = (event, newPage) => {
        dispatch(setPage(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

    return (
        <>
            <HeadTable data={data} dataBy={dataBy} handleSort={handleSort} />
            <Paper sx={{ border: '1px solid #000', boxShadow: 'none' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 400 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <TableBody>
                            {Sort(archiveData, getDirection(data, dataBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow key={labelId}>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {format(
                                                    new Date(row.date),
                                                    'dd MMMM uuuu, HH:mm:ss',
                                                    { locale: ru }
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.price}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                sx={{ marginRight: '100px' }}
                component="div"
                count={archiveData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export { MainTable };
