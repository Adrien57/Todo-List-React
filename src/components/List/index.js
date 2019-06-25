// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import Task from './Task';
import './list.scss';

// == Composant
// 1- je récupère mes props (je destructure/j'extrais ce qui m'intéresse en même temps)
// 2- je valide mes propps
// 3- je les utilise
const List = ({ tasks, changeTaskDone, changeTaskFav }) => (
  <ul id="todo-list">
    {/*
      exemple sans destructuration
      on récupère un objet puis on cible la propriété qu'on veut utiliser
      {tasks.map((task) => (
        <Task key={task.id} />
      ))}
      exemple avec destructuration
      on extrait directement la propriété qu'on veut utiliser
      {tasks.map(({ id }) => (
        <Task key={id} />
      ))}
    */}
    {tasks.map(task => (
      /*
        le spread nous permet d'éclater l'objet task
        pour donner directement chaque propriété de l'objet sous forme de props en lui associant sa valeur
        ça revient au même que d'écrire
        <Task key={task.id} id={1} label="toto" done={false} />
      */
      <Task changeTaskDone={changeTaskDone} key={task.id} {...task} changeTaskFav={changeTaskFav} />
    ))}
  </ul>
);

List.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  changeTaskDone: PropTypes.func.isRequired,
};

// == Export
export default List;
