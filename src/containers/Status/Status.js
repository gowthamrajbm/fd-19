import React from "react";
import "./Status.css";

import axios from "../../axios";
import Button from "../../components/UI/Button/Button";
import DotLoader from "../../components/UI/DotLoader/DotLoader";

class Status extends React.Component {
  state = {
    page: 1,
    data: null
  };

  setPage = page => {
    this.setState({ page: page });
  };

  toggleCheckin = id => {
    axios
      .get("/employee/toggleCheckin?eid=" + id)
      .then(res => {
        this.loadData();
      })
      .catch(err => {
        alert("Error occurred. Try again.");
      });
  };

  toggleGift = id => {
    axios
      .get("/employee/toggleGift?eid=" + id)
      .then(res => {
        this.loadData();
      })
      .catch(err => {
        alert("Error occurred. Try again.");
      });
  };

  loadData = () => {
    this.setState({ data: null });
    axios
      .get("/employee/getAll")
      .then(res => {
        if (res.data.success) {
          this.setState({ data: res.data.response });
        } else {
          this.setState({ data: null });
          this.loadData();
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    var data = !this.state.data ? (
      <DotLoader />
    ) : (
      <table>
        <thead>
          <th>EMPLOYEE</th>
          <th>CHECK-IN</th>
          <th>GIFT</th>
        </thead>
        {this.state.data.map(employee => {
          return (
            <tr>
              <td>
                {employee.eid}
                <br />
                <b>{employee.name}</b>
              </td>
              <td>
                {employee.logged_in ? (
                  <Button
                    btntype="Action Success"
                    clicked={() => this.toggleCheckin(employee.eid)}
                  >
                    Check-In
                  </Button>
                ) : (
                  <Button
                    btntype="Action Danger"
                    clicked={() => this.toggleCheckin(employee.eid)}
                  >
                    Unchecked
                  </Button>
                )}
              </td>
              <td>
                {employee.gift ? (
                  <Button
                    btntype="Action Success"
                    clicked={() => this.toggleGift(employee.eid)}
                  >
                    Received
                  </Button>
                ) : (
                  <Button
                    btntype="Action Danger"
                    clicked={() => this.toggleGift(employee.eid)}
                  >
                    Not Received
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    );
    return (
      <div className="Page-Cont">
        <div className="Status-Cont">
          <h3>Employee Statuses</h3>
          {data}
        </div>
      </div>
    );
  }
}
export default Status;
