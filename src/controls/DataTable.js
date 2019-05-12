import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from './Pagination'
import { TableHead, TableCell } from '@material-ui/core';


export const Total=({from,to,count,page})=><React.Fragment>
    {count>0 && <div>{`共${count}条记录，当前第${page+1}页`}</div>}
    {count===0 && <div>{`共${count}条记录`}</div>}
    </React.Fragment>

export const DataTable = ({ rows, pageIndex, pageSize, totalCount, renderHeader, renderRow,onPageIndexChange,onPageSizeChange ,needPagination}) => {
    
    return <Table >
        <TableHead>
            {renderHeader && renderHeader()}
        </TableHead>
        <TableBody>
            {renderRow && rows && rows.map((row ,idx)=> renderRow(row,idx))}
            { ( rows==null || rows.length===0 )&& <TableRow>
                <TableCell style={{textAlign:'center'}} colSpan={100}> {'没有找到记录'}</TableCell>
                </TableRow>}
          
        </TableBody>
        {needPagination===true && <TableFooter>
            <TableRow>
                <TablePagination
                    labelRowsPerPage={'每页行数'}
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={totalCount?totalCount:rows!=null? rows.length:0}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    SelectProps={{
                        native: true,
                    }}
                    labelDisplayedRows={p=><Total  {...p}/>}
                    onChangePage={onPageIndexChange}
                    onChangeRowsPerPage={onPageSizeChange}
                    ActionsComponent={Pagination}
                />
            </TableRow>
        </TableFooter>}
    </Table>
}


