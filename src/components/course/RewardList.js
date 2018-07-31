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
    constructor(props){
        super(props);
        this.state = {
          statusType:{}
        };
    }

    componentWillReceiveProps(nextProps){
        const { tab } = nextProps;
        let filteredStatusArray = this.filterStatus(nextProps).map((status)=>{
          let Asset = {};
          Object.assign(Asset, {
            [status.status]: status.status
          });
          return Asset;
        });
        let filteredStatus = Object.assign({}, ...filteredStatusArray);
       this.setState({statusType: filteredStatus});

        if(tab !== undefined){
            this.refs.status.applyFilter(tab);
        }
    }

  filterStatus(props){
    const flags = new Set();
    return props.rewards.filter(entry => {
      if (flags.has(entry.status)) {
        return false;
      }
      flags.add(entry.status);
      return true;
    });
  }

    handleRewardFilter = (e) =>{
        let dataId = e.currentTarget.dataset.id;
        this.refs.status.applyFilter(dataId);
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

    sortDates (a, b, order) {
        if(order === 'desc')
            return moment(a.date, "MM/DD/YYYY") - moment(b.date, "MM/DD/YYYY");
        return moment(b.date, "MM/DD/YYYY") - moment(a.date, "MM/DD/YYYY");
    }

    enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    render() {
        return (
            <div>
                {
                    this.filterStatus(this.props).map((course, index)=>{
                        return <button
                            key={index}
                            className="btn btn-warning ml-2"
                            data-id={course.status}
                            onClick={this.handleRewardFilter}
                        >
                            {course.status}
                        </button>
                    })
                }
                <BootstrapTable ref='table' data={this.props.rewards} bordered={false}>
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
                        ref='experience'
                        filter={ { type: 'RegexFilter', placeholder: 'Please enter an experience' } }
                        columnTitle
                    >
                        Experience
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="date"
                        dataSort={true}
                        caretRender={getCaret}
                        sortFunc={ this.sortDates }
                        columnTitle
                    >
                        Date
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        ref='status'
                        dataField="status"
                        filterFormatted
                        dataFormat={this.enumFormatter}
                        formatExtraData={this.state.statusType}
                        filter={{type: "SelectFilter", options: this.state.statusType}}>
                        Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='button'
                        dataFormat={this.cellButton.bind(this)}
                    >
                        Edit
                </TableHeaderColumn>

                </BootstrapTable>
            </div>
        );
    }

}



export default RewardList;
