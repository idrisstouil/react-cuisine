
import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup} from 'react-bootstrap';
import './index.css';
import {AddRecipe} from './addrecipe';
import {EditRecipe} from './editrecipe';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
      
    ];
    this.setState({recipes: recipes});
  }
  showAddModal() {
    this.setState({showAdd: !this.state.showAdd});
  }
  showEditModal(index) {
    this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
  }
  addRecipe(recipe) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showAddModal();
  }
  editRecipe(newName, newIngredients, currentlyEditing) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, currentlyEditing: 0});
  }
  render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    return(
      <div className="jumbotron">
        <h1>mes recettes</h1>
        <Button bsStyle="success" onClick={this.showAddModal}>ajouter une nouvelle recette</Button>
        <AddRecipe onShow={this.state.showAdd} onAdd={this.addRecipe} onAddModal={this.showAddModal} />
        <PanelGroup accordion id="recipes">
          
          {recipes.map((recipe, index) => (
            
            <Panel className="card" style={{  }} eventKey={index} key={index}>
             
             
              <Panel.Heading>
                <Panel.Title className="title" toggle>{recipe.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body >
                <ListGroup className="cardc">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="info" onClick={() => {this.showEditModal(index)}}>modifier</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteRecipe(index)}}>supprimer</Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditRecipe onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
      
      </div>
    );
  }
};

ReactDOM.render(<Recipe />, document.getElementById('app'));