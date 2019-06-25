// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './form.scss';

// == Composant
const Form = ({ addTask, inputValue, changeInputValue }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // on pourrait récuperer la valeur en traversant le DOM
    // mais désormais ce qu'on cherche c'est de manipuler notre state et non le DOM
    // addTask(event.target.children[0].value);
    addTask();
  };

  const changeHandler = (event) => {
    changeInputValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} id="todo-form">
      <input onChange={changeHandler} value={inputValue} id="todo-input" name="newTask" placeholder="Ajouter une tâche" />
    </form>
  );
};

Form.propTypes = {
  addTask: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  changeInputValue: PropTypes.func.isRequired,
};

// == Export
export default Form;
