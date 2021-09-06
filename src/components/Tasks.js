import Task from './Task';

const Tasks = ({ data, onDelete, onToogle }) => {

  return (
    <>
      {data.map((task) => (
        <Task key={task.id} items={task} onDelete={onDelete} onToogle={onToogle} />
      ))}
    </>
  );
}

export default Tasks;