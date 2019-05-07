import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from './Pagination'
import { TableHead } from '@material-ui/core';


export const DataTable = ({ rows, pageIndex, pageSize, totalCount, renderHeader, renderRow,onPageIndexChange,onPageSizeChange ,needPagination}) => {
    //const emptyRows = pageSize - Math.min(pageSize, rows.length - pageIndex * pageSize);

    return <Table >
        <TableHead>
            {renderHeader && renderHeader()}
        </TableHead>
        <TableBody>
            {renderRow && rows.map(row => renderRow(row))}
            {/* {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )} */}
        </TableBody>
        {needPagination===true && <TableFooter>
            <TableRow>
                <TablePagination
                    labelRowsPerPage={'每页行数'}
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={totalCount?totalCount:rows.length}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    SelectProps={{
                        native: true,
                    }}
                    onChangePage={onPageIndexChange}
                    onChangeRowsPerPage={onPageSizeChange}
                    ActionsComponent={Pagination}
                />
            </TableRow>
        </TableFooter>}
    </Table>
}


