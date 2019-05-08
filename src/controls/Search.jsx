import React from 'react';
import styled from 'styled-components'
import {
    FilledInput,
    InputLabel,
    FormControl,
    MenuItem,
    FormControlLabel,
    TextField,
    Radio,
    Select,
    FormHelperText,
    withStyles,
    Grid,
    Switch,
} from '@material-ui/core';



export const SearchType = {
    TEXT: 'TEXT',
    DATE: 'DATE',
    DATE_TIME: 'DATE_TIME',
    SELECT: 'SELECT',
}


const Div = styled.div`
    align-items:center;
    display:flex;
    flex-wrap: wrap;
`

const SearchItem = ({ condition }) => {
    const { searchType, name, onChange, selectItems, selectValue } = condition;
    return <div style={{ paddingRight: 8 }}>
        {(searchType == null || searchType === SearchType.TEXT) && <TextField

            label={name}
            onChange={onChange}
            name={name}
            margin="normal"
            variant="filled"
        />}
        {searchType === SearchType.SELECT && <FormControl style={{ minWidth: 200, marginTop: 8 }} variant="filled">
            <InputLabel htmlFor="filled-age-simple" shrink={selectValue !== -1}  >{name}</InputLabel>
            <Select name={name} value={selectValue} onChange={onChange} input={<FilledInput name="age" id="filled-age-simple" />} >
                {selectItems && selectItems.length > 0 && selectItems.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
            </Select>
        </FormControl>}
        {searchType === SearchType.DATE && <TextField
            style={{ minWidth: 200, marginTop: 8 }}
            name={name}
            onChange={onChange}
            label={name}
            value={selectValue}
            type="date"
            variant="filled"
            InputLabelProps={{ shrink: true, }}
        />}
    </div>
}

export const Search = ({ items }) => {
    return <div style={{ display: 'flex',alignItems:'center' }}>
        <div style={{ fontSize: 14, width: 80 }}>{'查询条件：'}</div>
        <Div>

            {items.map(x => <SearchItem key={x.name} condition={x} />)}
        </Div>
    </div>
}