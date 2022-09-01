import React from "react";
import AddToDo from "./AddToDo";
import { toast } from "react-toastify";
class ListToDo extends React.Component {
  state = {
    listToDos: [
      { id: "todo1", title: "Lear react" },
      { id: "todo2", title: "Clean my room" },
    ],

    editTodo: {},
  };

  changeContent=(event)=>{
    let editTodoCopy = {...this.state.editTodo}
    editTodoCopy.title=event.target.value;
    this.setState({
      editTodo: editTodoCopy
    })
  }

  handleEditTodo = (todo) => {
    let ListToDosItem = this.state.listToDos;
    let editTodoItem = this.state.editTodo;
    let isEmptyObj = Object.keys(editTodoItem).length === 0 ? true : false;
    console.log('after onclick >> check isEmty obj', isEmptyObj)
   
   // save
    if (isEmptyObj===false && editTodoItem.id===todo.id) {
        let listToDosCopy=[...ListToDosItem];
        let objIndex= listToDosCopy.findIndex((item => item.id===todo.id))
        listToDosCopy[objIndex].title=editTodoItem.title
        this.setState({
          listToDos:listToDosCopy,
          editTodo: {}
        })

        console.log(this.state.listToDos)
        return;
    }

    // edit
    this.setState({
      editTodo: todo,
    });
  };

  deleteTodo = (todoID) => {
    console.log("id item will ve remove >>>", todoID);
    let currentTodo = this.state.listToDos.filter((item) => item.id !== todoID);
    this.setState({
      listToDos: currentTodo,
    });

    console.log("Removed id >>>", todoID);
  };

  addNewToDo = (newTodo) => {
    console.log("New todo will be added >>>", newTodo);
    this.setState({
      listToDos: [...this.state.listToDos, newTodo],
    });
    toast.success("Add item successfully");
  };

 

  render() {
    let ListToDos = this.state.listToDos;
    let editTodo = this.state.editTodo;
    let isEmptyObj = Object.keys(editTodo).length === 0 ? true : false;
    console.log("check object empty >>>", isEmptyObj);
    return (
      <div className="list-todo_container">
        <AddToDo addNewToDo={this.addNewToDo}></AddToDo>
        <div className="list-todo-content">
          <table className="table-list-todo">
            <tbody>
              {ListToDos.map((item, index) => {
                return (
                  <>
                    <tr key={item.id}>
                    
                      {isEmptyObj===false && item.id===editTodo.id ?
                      
                      <td>
                         <input type='text' value={this.state.editTodo.title} onChange={(event)=>this.changeContent(event) }></input>
                       </td>
                      :
                        <td>
                        {index + 1} - {item.title}
                      </td> 
                    }
                     
                      <td>
                        <button
                          type="button"
                          onClick={() => this.handleEditTodo(item)}
                        >
                          {isEmptyObj===false && item.id===editTodo.id ?
                           'Save'
                           :
                           'Update'
                        }
                         
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => this.deleteTodo(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListToDo;
