import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayForm: false,
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
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
        });
    }
    // kick nut x dong form 
    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,

        });
    }
    //them du lieu 
    onSubmit = (data) => {
        // console.log(data);
        let { tasks } = this.state;
        if (data.id === '') { //them thi id  ='' 
            let item = {
                id: 1 + (Math.random() * (1000 - 1)),
                name: data.name,
                status: data.status
            }
            tasks.push(item);
        } else { //sua 
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditting: null //xoa bien de bam nut them dc

        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    //kick status thi toggle status
    onUpdateStatus = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
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
    // delete record
    onDelete = (id) => {
        let { tasks } = this.state;
        //tra ve mang moi remove object co id = id 
        let newTasks = tasks.filter((task) => {
            return task.id !== id;
        });
        this.setState({
            tasks: newTasks
        });
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        this.onCloseForm();
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

    onSearch =(keyword)=>{
        
        this.setState({
            keyword: keyword.toLowerCase(),
        });

    }

    onSort = (sort)=>{
        this.setState({
            sort: sort
        });
    }

    render() {
        let { 
            isDisplayForm,
            taskEditting,
            // filter,
            // keyword, 
            sort 
            } = this.state;
        
        // if(filter){
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) { //lay tat ca
        //             return tasks;
        //         } else { // status: 1 la lay kick hoat
        //             return task.status === (filter.status === 1 ? true : false)
        //         }
        //     });
        // }

        // if(keyword){
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1;
        //     });
        // }

        // if(sort){
        //     if(sort.by==='name'){
        //         tasks.sort((a,b)=>{
        //             if(a.name > b.name) return sort.value;
        //             else if(a.name <b.name) return -sort.value;
        //             else return 0;
        //         })
        //     }else{
        //         tasks.sort((a,b)=>{
        //             if(a.status > b.status) return -sort.value;
        //             else if(a.status <b.status) return sort.value;
        //             else return 0;
        //         })
        //     }
        // }
        
        
        const elmTaskForm = isDisplayForm === true ?
            <TaskForm
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                task={taskEditting}
            /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {elmTaskForm}
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
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
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



export default  App;
