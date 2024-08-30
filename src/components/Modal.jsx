import CreateTask from "./CreateTask";
import "./modal.css";
function Modal({ closeModal,tasks,setTasks }) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <CreateTask closeModal={closeModal} tasks={tasks} setTasks={setTasks}/>
        </div>
   </div>
  );
  }

  export default Modal;