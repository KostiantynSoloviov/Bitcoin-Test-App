import TableSortLabel from '@mui/material/TableSortLabel';
import Grid from '@mui/material/Grid';

export function HeadTable({ data, dataBy, handleSort }) {
    return (
        <Grid container direction="row">
            <Grid item xs={6}>
                <Grid
                    sx={{ margin: '20px 0 20px 50px' }}
                    key={'date'}
                    sortdirection={dataBy === 'date' ? data : ''}
                >
                    <TableSortLabel
                        active={dataBy === 'date'}
                        direction={dataBy === 'date' ? data : 'asc'}
                        onClick={(event) => handleSort(event, 'date')}
                    >
                        {'Дата/Время'}
                    </TableSortLabel>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid
                    sx={{ margin: '20px 0 20px 160px' }}
                    key={'price'}
                    sortdirection={dataBy === 'price' ? data : ''}
                >
                    <TableSortLabel
                        active={dataBy === 'price'}
                        direction={dataBy === 'price' ? data : 'asc'}
                        onClick={(event) => handleSort(event, 'price')}
                    >
                        {'Цена'}
                    </TableSortLabel>
                </Grid>
            </Grid>
        </Grid>
    );
}
