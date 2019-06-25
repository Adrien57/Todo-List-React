// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './counter.scss';

// == Composant
// on récupère un objet props qui a pour propriétés les props transmises
// à l'appel du composant, cad dans index.js de App en faisant <Counter uneProp="toto" />
// const Counter = (props) => (
// on peut le déstructurer tout de suite
const Counter = ({ count }) => {
  let message = '';
  switch (count) {
    // si aucun message
    case 0:
      message = 'Aucune tâche en cours';
      break;
      // si 1 message
    case 1:
      message = '1 tâche en cours';
      break;
      // si plusieurs messages
    default:
      message = `${count} tâches en cours`;
  }

  return (
    <p id="todo-counter">
      {message}
    </p>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

// == Export
export default Counter;
