// == Import : npm
import React from 'react';

// == Import : local
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import List from 'src/components/List';
import './app.scss';
import initialTasks from 'src/data';

// == Composant
// on veut pouvoir tenir nos data à jours en fonction des intéractions
// on va exploiter le state pour cela
// on passe le composant App sous forme de stateful component / de composant intélligent
// il pourra mettre à jour le state

/*
  // dumb component: on reçoit des props et on retourne du jsx en fonction
  const App = () => (
    <div id="todo">
      <Form />
      <Counter count={2} />
      <List tasks={tasks} />
    </div>
  );
*/

// stateful component: on peut en plus mettre à jour le state
class App extends React.Component {
  state = {
    tasks: initialTasks,
    inputValue: '',
  }

  // on déclare une fonction qui pourra être distribuer à nos composants
  // les composants pourront indirectement modifier le state via cette fonction
  addTask = () => {
    // const { inputValue } = this.state === const inputValue = this.state.inputValue
    // Les 2 sont identiques
    const { inputValue } = this.state;
    // on récupère nos tâches actuelles (sans la nouvelle)
    // on peut donner un allias lordqu'on destructure
    const { tasks: oldTasks } = this.state;
    // on déclare notre nouvelle tache
    // on génère un nouvel id
    // ça ça ne marche pas
    // les id ne se suivent pas forcemment
    // const id = oldTasks.length;
    // on peut récuperer un tableau d'id
    // on construit un tableau à partir d'un tableau avec map
    // on ne garde que les ids
    const allIds = oldTasks.map(task => task.id);
    // on peut récuperer la plus grande valeur tu tableau
    // on déverse toutes les valeurs de notre tableau en arguments de Math.max
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/max
    // Math.max nous retourne la plus grande valeur
    const id = Math.max(...allIds) + 1;
    const newTask = {
      // version longue
      // id: id,
      // version courte
      id,
      label: inputValue,
      done: false,
      fav: false,
    };
    // on peut être tenté de modifier directement le state
    // /!\ JAMAIS DE LA VIE /!\
    // this.state.tasks.push(newTask);
    // /!\ JAMAIS DE LA VIE /!\
    // on ne modifie pas directement le state

    // on crée un nouveau tableau
    // exemple pour créer une copie d'un tableau sans toucher à l'original
    // const newTableau = [...oldTableau];
    const tasksCopy = [
      // on déverse/on éclate/on utilise l'opérateur spread pour récuperer les valeurs
      // actuelles sans toucher au state d'origine directement
      ...oldTasks,
      newTask,
    ];
    this.setState({
      // on chercher à modifier le state
      // on lui transmet toutes les tasks d'origine
      // + la nouvelle
      tasks: tasksCopy,
    });
  }

  changeInputValue = (newInputValue) => {
    this.setState({
      inputValue: newInputValue,
    });
  }

  changeTaskFav = (id) => {
    const { tasks: oldTasks } = this.state;
    const tasksModified = oldTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          fav: !task.fav,
        };
      }
      
      return task;
    });
    this.setState({
      tasks: tasksModified,
    });
  }

  changeTaskDone = (id) => {
    // on va devoir changer le done d'une tache
    // on va construire un tableau représentant nos tâches modifées
    // on crée donc une copie du tableau d'origine
    // sauf que pour un id donnée on va inverser le done
    const { tasks: oldTasks } = this.state;
    const tasksModified = oldTasks.map((task) => {
      if (task.id === id) {
        // on retourne un nouvel objet
        return {
          // dans cet objet on déverse toutes les propriétés de l'objet task
          ...task,
          // on inverse un booléen avec un point d'exclamation
          done: !task.done,
        };
      }
      return task;
    });
    this.setState({
      tasks: tasksModified,
    });
  }

  filterTask = (id) => {
    const { tasks: oldTasks } = this.state;
    const tasksToKeep = oldTasks.filter(task => task.id !== id);
    console.log(tasksToKeep); 
    this.setState({
      tasks: tasksToKeep,
    })
  }

  // la valeur de retour du dumb component devient la méthode render de la classe
  render() {
    // on déstructure l'objet du state
    const { tasks, inputValue } = this.state;
    const count = tasks.filter(task => !task.done).length;
    return (
      <div id="todo">
        {/* on peut tout à fait transmettre une fonction via les props */}
        <Form
          inputValue={inputValue}
          addTask={this.addTask}
          changeInputValue={this.changeInputValue}
        />
        <Counter count={count} />
        <List changeTaskDone={this.changeTaskDone} tasks={tasks} changeTaskFav={this.changeTaskFav} filterTask={this.filterTask}/>
      </div>
    );
  }
}


// == Export
export default App;
