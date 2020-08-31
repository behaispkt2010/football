import React, { Component } from "react";
import {
  Table,
  Button
} from "reactstrap";
import { render } from "react-dom";

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {showFunction: 1};
    }
    componentDidMount() {
        this.setState({
            showFunction: this.props.showFunction
        })
    }
    renderTableHeader() {
        let header = this.props.dataField;
        return header.map((key, index) => {
            return <th key={index}>{Object.values(key)[0]}</th>;
        });
    }
    renderTD(item) {
        const { showText } = this.props;
        let datakeys = this.props.dataField;
        return datakeys.map((key, index) => {
            let tempKey = Object.keys(key)[0];
            let render = item[tempKey];
            switch (tempKey) {
                case "gender":
                    render = showText(item[tempKey]);
                case "isactive":
                    // console.log(item[tempKey]);
                    render = showText(item[tempKey]);
                break;
            }
            return <td key={index}>{render}</td>;
        });
    }
    renderTableData() {
        const { actionUpdateTables, actionDeleteTable } = this.props;
        
        return this.props.list.map((data, index) => {
            // console.log(data);
            return (
                <tr key={index}>
                    <td key={index}>{index+1}</td>
                    {this.renderTD(data)}
                    {this.state.showFunction != 0 &&
                    <td>
                        <Button color="primary" onClick={() => actionUpdateTables(data)}>
                          Cập nhật
                        </Button>{" "}
                        <Button color="danger" onClick={() => actionDeleteTable(data)}>
                          Xóa
                        </Button>{" "}
                    </td>
                    }
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <Table>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            {this.renderTableHeader()}
                            {this.state.showFunction != 0 && <th>Chức năng</th> }
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Tables;
