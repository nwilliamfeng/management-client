import React from 'react';

import { DataTable, } from './DataTable'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


 const DTable = ({ searchCondition, rows, columns, onSearch, totalCount }) => {

    const renderHeader = () => {
        const headers = columns.map(x => x.header);
        return <TableRow>
            {headers && headers.map((header, idx) => <TableCell key={idx}>{header === header.toString() ? header : header()}</TableCell>)}
        </TableRow>
    }

    const renderRow =( row,key) => {
        const cells = columns.map(x => x.cell);

        return <TableRow key={key}>
            {cells && cells.map((cell, idx) => <TableCell key={idx}>{cell(row)}</TableCell>)}
        </TableRow>
    }


    const onPageIndexChange = (event, idx) => {
        if(searchCondition==null || searchCondition.pageIndex==null){
            return;
        }
        const { pageIndex } = searchCondition;
        if (pageIndex !== idx + 1) {
            onSearch({ ...searchCondition, pageIndex: idx + 1 });
        }
    };

    const onPageSizeChange = event => {
        if(searchCondition==null || searchCondition.pageSize==null){
            return;
        }
        onSearch({ ...searchCondition, pageIndex: 1, pageSize: event.target.value });
    };

    return <DataTable
        rows={rows}
        pageSize={searchCondition==null?1000: searchCondition.pageSize}
        pageIndex={searchCondition==null?0:searchCondition.pageIndex - 1}
        totalCount={totalCount}
        onPageIndexChange={onPageIndexChange}
        onPageSizeChange={onPageSizeChange}
        renderHeader={renderHeader}
        renderRow={renderRow}
        needPagination={searchCondition!=null && searchCondition.pageIndex !==null}>
    </DataTable>


}

 const withSearchOnDidMount =Component=>class extends React.Component{
    componentDidMount(){
        const {onSearch,searchCondition} =this.props
        if(searchCondition!=null){
            onSearch(searchCondition);
        }
        else onSearch();
        
    }
    render(){
      return  <React.Fragment>
            <Component {...this.props}/>
        </React.Fragment>
    }
}

const WrapperTable=withSearchOnDidMount(props=><DTable {...props}/>);

export const QueryTable =({ searchCondition, rows, columns, onSearch, totalCount })=><WrapperTable  searchCondition={searchCondition}  rows={rows}  columns={columns}  onSearch={onSearch}  totalCount={totalCount}  />