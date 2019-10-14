import React from 'react';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    //khi kick nut edit hàm sẽ thực thi( licycle) 
    componentWillMount() {
        if (this.props.task) {
            const { task } = this.props;
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    //lay du lieu tu form khi bam submit va set state 
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = (target.value === 'true' ? true : false);
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault(); //ko load trang 
        this.props.onSubmit(this.state);//gui sang app.js
        //after submit cancer and close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        let { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Sửa Công Việc' : 'Thêm Công Việc'}
                    </h3>
                    <span
                        className="fa fa-times-circle text-right"
                        onClick={this.onCloseForm}
                    >

                    </span>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name='name'
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name='status'
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default TaskForm;
