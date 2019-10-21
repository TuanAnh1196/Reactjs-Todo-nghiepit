import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index'
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskEditting: null,
            filter: {
                name: "",
                status: -1
            },
            keyword: ""
        }
    }
    //tao du lieu dau 
    onGenerateData = () => {
        var tasks = [
            {
                id: 1,
                name: 'Hoc Lap Trinh',
                status: true
            },
        ];
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm = () => {
        this.props.onToggleForm(); 
       
    }
   
    //find index to change status 
    findIndex = (id) => {
        let { tasks } = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onUpdate = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        let taskEditting = tasks[index];// object task muốn sửa 
        this.setState({
            taskEditting: taskEditting
        });
        this.onToggleForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyword) => {

        this.setState({
            keyword: keyword.toLowerCase(),
        });

    }

    onSort = (sort) => {
        this.setState({
            sort: sort
        });
    }

    render() {
        let {
            sort
        } = this.state;
        var {isDisplayForm} = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <TaskForm />
                    </div>
                    <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                        'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={this.onGenerateData}
                        >
                            Generate Data
                        </button>
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortCallback={sort}
                        />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    // tasks={tasks}
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: ()=>{
            dispatch(actions.toggleForm());
        },
        onClearTask: (task)=>{
            dispatch(actions.editTask());
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
