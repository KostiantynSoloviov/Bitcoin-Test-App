/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Header } from './layout/header/header';

import { getData } from './service/api';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { MainTable } from './components/table/mainTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

const theme = createTheme(ruRU);

function App() {
    const dispatch = useDispatch();
    const archiveData = useSelector(
        (state) => state.bitcoin.bitcoinHistoryArray
    );
    const interval = useSelector((state) => state.bitcoin.interval);

    useEffect(() => {
        if (archiveData.length)
            setTimeout(() => {
                dispatch(getData());
            }, interval * 1000);
        if (!archiveData.length) dispatch(getData());
    }, [archiveData]);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ margin: '15px 0 20px 0' }} maxWidth="sm">
                <Grid>
                    <Grid sx={{ marginBottom: '15px' }}>
                        <Header />
                    </Grid>
                    <Grid>
                        <MainTable archiveData={archiveData} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
