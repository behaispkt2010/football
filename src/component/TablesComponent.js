import React, { Component } from "react";
import {
  Table,
  Button
} from "reactstrap";
import { render } from "react-dom";

class Tables extends Component {
    constructor(props) {
        super(props);
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
                    <td>
                        <Button color="primary" onClick={() => actionUpdateTables(data)}>
                          Cập nhật
                        </Button>{" "}
                        <Button color="danger" onClick={() => actionDeleteTable(data)}>
                          Xóa
                        </Button>{" "}
                    </td>
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
                        <th>Chức năng</th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Tables;
