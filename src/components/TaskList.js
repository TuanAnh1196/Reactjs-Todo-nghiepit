import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filtetStatus: -1 //all: -1, active: 1, deactive: 0
        }
    }

    onChange =(event)=>{
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.props.onFilter(
            name==='filterName'?value:this.state.filterName,
            name==='filterStatus'?value:this.state.filterStatus
        )
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log(this.props.todos);
        
        const { tasks } = this.props;
        const elmTasks = tasks.map((item, index) => {
            return <TaskItem
                key={item.id}
                index={index + 1}
                task={item}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
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
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, null)(TaskList);
