import React, { useEffect, useState } from "react";
import api from "../utils/api"
import TodoBoard from "../components/TodoBoard";
import {Row, Col, Container} from "react-bootstrap";

const TodoPage = () => {
    const [todoList, setTodoList] = useState([])
    const [todoValue, setTodoValue] = useState("")
  
    const getTasks = async() => {
      const response = await api.get('/tasks')
      // console.log("rrr", response)
      setTodoList(response.data.data)
    }
  
    const addTask = async() => {
      try{
        const response = await api.post('/tasks', {
          task: todoValue,
          isComplete: false
        })
        if (response.status === 200) {
          console.log("success")
          // 입력값 안 보이게 -> 초기화, 추가값 생기게 -> getTasks() 다시 불러와.
          setTodoValue("")
          getTasks();
        } else {
          throw new Error("task can not be added")
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  
    const checkTask = async (id) => {
      try{
        const task = todoList.find((data) => data._id === id) // 클라이언트 측에서 직접 상태 업데이트
        const response = await api.put(`/tasks/${id}`, {
          isComplete: !task.isComplete
        })
        if (response.status === 200) {
          console.log("checked")
          getTasks()
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  
    const deleteTask = async (id) => {
      try{
        const response = await api.delete(`/tasks/${id}`, { // 서버 측에서 작업을 삭제
        })
        if (response.status === 200) {
          getTasks()
          console.log("deleted")
        }
      } catch (err) {
        console.log("error", err)
      }
    }
  
    useEffect(() => {
      getTasks()
    },[])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList = {todoList} checkTask = {checkTask} deleteTask = {deleteTask} />
    </Container>
  );
};

export default TodoPage;
