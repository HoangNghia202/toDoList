import React from "react";
import { toast } from "react-toastify";

class AddToDo extends React.Component {
  state = {
    title:'',
  };
  changeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAddButton = () => {
    if (!this.state.title) {
      toast.error("Missing param");
      return;
    }
    this.props.addNewToDo({
      id: Math.floor(Math.random() * 20),
      title: this.state.title,
    });

    this.setState({
      title:'',
    });
  }
  render() {
    return (
      <div className="add-todo">
        <input
          type={"text"} value={this.state.title}
          onChange={(event) => this.changeTitle(event)}
        ></input>
        <button type="button" onClick={() => this.handleAddButton()}>
          Add
        </button>
      </div>
    );
  }
}

export default AddToDo;
