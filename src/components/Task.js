import { FaTimes } from 'react-icons/fa';

const Task = ({ items, onDelete, onToogle }) => {
  return (
    <div className={`task ${items.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToogle(items.id)}>
      <h3>{items.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(items.id)} /></h3>
      <p>{items.day}</p>
    </div>
  );
}

export default Task;