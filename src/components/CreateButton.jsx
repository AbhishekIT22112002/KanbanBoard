import { useState } from "react";
import Modal from "./Modal";
import "./styles.css"

function CreateButton({tasks,setTasks}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    
  return (
    <>
      <button  onClick ={openModal} className="Btn">
        <div className="sign">+</div>
        <div className="text">Create</div>
      </button>
      { isModalOpen && <Modal tasks={tasks} setTasks={setTasks} closeModal={closeModal} />} 
    </>
  );
}

export default CreateButton;
