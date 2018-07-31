import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

const getCaret = direction => {
    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }
    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }
    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};


const titleFormatter = (cell, row) => {
  return `<a href=${row.watchHref} target="_blank">${cell}</a>`;
};


class RewardList extends Component {

    componentWillReceiveProps(nextProps){
        const { tab } = nextProps;
        if(tab !== undefined){
            this.refs.table.handleFilterData({ status: tab });
        }
    }

    handleRewardFilter = (e) =>{
        let dataId = e.currentTarget.dataset.id;
        this.refs.table.handleFilterData({ status: dataId });
        this.props.history.push(`/reward/${dataId}`);
    };

    handleEditReward(cell, row) {
        this.props.history.push(`/user/${row.id}`);
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={() => this.handleEditReward(cell, row, rowIndex)}>
                <i className="fa fa-pencil" aria-hidden="true"/> Edit
            </button>
        )
    }

    // sortDates (a, b, order) {
    //
    //     if(order === 'desc')
    //         return moment(a.date, "DD/MM/YYYY") - moment(b.date, "DD/MM/YYYY");
    //     return moment(b.date, "DD/MM/YYYY") - moment(a.date, "DD/MM/YYYY");
    // }

    // dateFormatter(cell: any) {
    //     if (!cell) {
    //         return "";
    //     }
    //     return `${moment(cell).format("DD-MM-YYYY")? moment(cell).format("DD-MM-YYYY"):moment(cell).format("DD-MM-YYYY") }`;
    // }

    sortDates (a, b, order) {
        let indices = [6, 7, 8, 9, 0, 1, 3, 4];
        if (order === 'asc') {
            let r = 0;
            indices.find(i => r = a.date.charCodeAt(i) - b.date.charCodeAt(i));
            return r;
        } else if (order === 'desc') {
            let r = 0;
            indices.find(i => r = b.date.toString().charCodeAt(i) - a.date.toString().charCodeAt(i));
            return r;
        }
    }

    render() {
        const flags = new Set();
        const filteredStatus = this.props.rewards.filter(entry => {
            if (flags.has(entry.status)) {
                return false;
            }
            flags.add(entry.status);
            return true;
        });

        return (
            <div>
                {
                    filteredStatus.map((course, index)=>{
                        return <button
                            key={index}
                            className="btn btn-warning ml-2"
                            data-id={course.status}
                            onClick={this.handleRewardFilter}>
                            {course.status}
                        </button>
                    })
                }
                <BootstrapTable ref='table' data={this.props.rewards} bordered={false} striped hover condensed>
                    <TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="user"
                        dataFormat={titleFormatter}
                        dataSort={true}
                        columnTitle
                    >
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="experience"
                        dataSort={true}
                        filter={{type: 'TextFilter', delay: 0 }}
                        columnTitle
                    >
                        Experience
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="date"
                        dataSort={true}
                        caretRender={getCaret}
                        sortFunc={ this.sortDates }
                        // dataFormat={this.dateFormatter}
                        columnTitle
                    >
                        Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="status"
                        dataSort={true}
                        columnTitle
                    >
                        Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='button'
                        dataFormat={this.cellButton.bind(this)}
                    />

                </BootstrapTable>
            </div>
        );
    }

}



export default RewardList;
