import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



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



class RewardList extends React.Component {

    constructor(props) {
        super(props);

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true, 
            hideSelectColumn: true            
        };
        this.state={
            selectedRewardId: undefined
        }
    }
    handleRewardFilter1 = (e) =>{
        let dataId = e.currentTarget.dataset.id;
        this.refs.table.handleFilterData({ status: dataId });
        this.props.d.history.push(`/rewards/${dataId}`);
    };

    handleEditReward(cell, row, rowIndex) {
        this.setState({selectedRewardId: row.id});
        const selectedRewardId = this.state.selectedRewardId;

        if (selectedRewardId) {
            this.setState({selectedRewardId: undefined});
            this.props.d.history.push(`/reward/${row.id}`);
        }
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={() =>
                    this.handleEditReward(cell, row, rowIndex)}
            >
                <i className="fa fa-pencil" aria-hidden="true"/> Edit
            </button>
        )
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
                    filteredStatus.map(course=>{
                        return <button
                            type="button"
                            className="btn btn-warning ml-2"
                            data-id={course.status}
                            onClick={this.handleRewardFilter1}>
                            {course.status}
                        </button>
                    })
                }
                <BootstrapTable ref='table' data={this.props.rewards}  selectRow={this.selectRowProp}  options={this.options} bordered={false} striped hover condensed>
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
