import { useSelector, useDispatch } from 'react-redux';
import { setInterval } from '../../redux/reducer/reducers';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectTimeMarker = () => {
    const dispatch = useDispatch();
    const interval = useSelector((state) => state.bitcoin.interval);

    const handleChange = (event) => {
        dispatch(setInterval(event.target.value));
    };

    return (
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
            <Select
                id="demo-simple-select-helper"
                value={interval}
                onChange={handleChange}
            >
                <MenuItem value={60}>1 мин</MenuItem>
                <MenuItem value={120}>2 мин</MenuItem>
                <MenuItem value={180}>3 мин</MenuItem>
            </Select>
        </FormControl>
    );
};

export { SelectTimeMarker };
