import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FiStar } from 'react-icons/fi';

const Task = ({
  label, done, changeTaskDone, id, changeTaskFav, fav,
}) => {
  const addFavori = (taskId) => {
    return () => {
      changeTaskFav(taskId);
    };
  };
  const changeHandler = (taskId) => {
    // console.log('une fonction est retournée / est créée');
    // console.log('cette fonction a accès à ' + taskId);
    return () => {
      // console.log('la fonction retournée a été executée');
      // console.log('oui je suis la fonction retournée et j\'ai accès à ' + taskId);
      changeTaskDone(taskId);
    };
  };
  // on pourrait l'écrire
  // const changeHandler = taskId => () => {
  //   changeTaskDone(taskId);
  // };
  return (
    <li className={classNames('task', { 'task--done': done }, { 'task--fav': fav })}>
      <input checked={done} onChange={changeHandler(id)} type="checkbox" />
      <span className="task-label">{label} <FiStar className={classNames('fistar', {' fistar--on': fav })} onClick={addFavori(id)} /> </span>
    </li>
  );
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  changeTaskDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Task;
