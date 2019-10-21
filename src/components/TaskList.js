import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index'


class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filtetStatus: -1 //all: -1, active: 1, deactive: 0
        }
    }
    
    onChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        let { tasks, filterTable,keyword,sort } = this.props;
        //filter on table 
        if (filterTable.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            });
        }
        if (filterTable) {
            tasks = tasks.filter((task) => {
                if (filterTable.status === -1) { //lay tat ca
                    return tasks;
                } else { // status: 1 la lay kick hoat
                    return task.status === (filterTable.status === 1 ? true : false)
                }
            });
           
        }
        //search 
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        } 
        //sort 
        if(sort){
            if(sort.by==='name'){
                tasks.sort((a,b)=>{
                    if(a.name > b.name) return sort.value;
                    else if(a.name <b.name) return -sort.value;
                    else return 0;
                })
            }else{
                tasks.sort((a,b)=>{
                    if(a.status > b.status) return -sort.value;
                    else if(a.status <b.status) return sort.value;
                    else return 0;
                })
            }
        }

        const elmTasks = tasks.map((item, index) => {
            return <TaskItem
                key={item.id}
                index={index + 1}
                task={item}
                onUpdate={this.props.onUpdate}
            />
        });
        
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={this.state.filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filterStatus"
                                value={this.state.filterStatus}
                                onChange={this.onChange}
                            >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
