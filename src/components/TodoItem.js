import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({data, checkTask, deleteTask}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${data.isComplete? "data-complete" : ""}`}>
          <div className="todo-content">{data.task}</div>

          <div>
            <button className="button-delete" onClick={()=>deleteTask(data._id)}>삭제</button>
            <button className="button-delete" onClick={()=>checkTask(data._id)}>{data.isComplete? "아직인 듯": "끝난 듯"}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
