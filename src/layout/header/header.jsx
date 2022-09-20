import { SelectTimeMarker } from '../../components/select/select';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export function Header() {
    return (
        <Grid container direction="row">
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Интервал сканирования
                </Typography>
            </Grid>
            <Grid sx={{ marginLeft: '60px' }}>
                <SelectTimeMarker />
            </Grid>
        </Grid>
    );
}
