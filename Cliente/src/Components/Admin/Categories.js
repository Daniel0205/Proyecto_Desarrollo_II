import React from 'react';
import { Button, Select } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';


export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "Search",
      selected: 'DEFAULT',
      name: "",
      description: "",
      categoryNames: [],
      msj:'',
      types:''

    };
    this.getNames = this.getNames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getFormular = this.getFormular.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.crear = this.crear.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNames();
  }


  actualizar() {

    fetch("/Category/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'CATEGORY UPDATED SUCCESSFULLY!',types:'success'})
        }
        else this.setState({msj:'ERROR UPDATING CATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected:'DEFAULT'
        })
      })
  }


  getNames() {

    fetch("/Category/consult", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => this.setState({ categoryNames: res }))
  }


  eliminar() {

    fetch("/Category/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category: this.state.name })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'CATEGORY DELETED SUCCESSFULLY!',types:'success'})
        }
        else this.setState({msj:'ERROR DELETING CATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected: 'DEFAULT'
        })
      })
  }


  crear() {

    fetch("/Category/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name_category: this.state.name,
        description: this.state.description,
        active:true
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'CATEGORY CREATED SUCCESSFULLY!',types:'success'})
          this.forceUpdate()
        }
        else this.setState({msj:'ERROR CREATING CATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected:'DEFAULT'
        })
      })
  }


  handleSelect(event) {
    if (event.target.value !== 'DEFAULT') {
      let object = this.state.categoryNames.find(x => x.name_category === event.target.value)
      this.setState({
        selected: event.target.value,
        name: object.name_category,
        description: object.description
      });
    }
    else {
      this.setState({
        selected:'DEFAULT'
      });
    }
  }


  handleName(event) {
    this.setState({
      name: event.target.value
    })
  }


  handleDescription(event) {
    this.setState({
      description: event.target.value
    })
  }


  getFormular() {

    if (this.state.selected !=='DEFAULT') {

      switch (this.state.type) {
        case "Search":
          return (<div key="0" className="buscar-categoria">
            <h2 >Name:</h2>
            <h3 >{this.state.name}</h3>

            <h2 >Description:</h2>
            <h3 >{this.state.description}</h3>

            <Button onClick={() => this.setState({ type: "Actualizar" })}>Update</Button>
            <Button onClick={this.eliminar}>Delete</Button>

          </div>);
        case "Actualizar":
          return (
            <div className="actualizar-categoria">
              <form>
                <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                label="Category name"
                disabled
                value={this.state.name}
                onChange={this.handleName} 
                />
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Description of the category"
                  
                  value={this.state.description}
                  onChange={this.handleDescription}
                />
                <Button onClick={this.actualizar}>Update</Button>
                <Button onClick={() => this.setState({ type: "Search" })}>Cancel</Button>
              </form>
            </div>);
        default:
          return
      }
    }
  }


  handleSubmit = () => {
    this.crear();
  }

  //Validaciones con expresiones regulares
  componentDidMount() {
    ValidatorForm.addValidationRule(
      "isValidName", (string) => /[a-zA-Z \u00E0-\u00FC]/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthName", (string) => /\b[a-zA-Z \u00E0-\u00FC]{1,20}\b/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthDescription", (string) => /\b[a-zA-Z \u00E0-\u00FC]{1,50}\b/g.test(string)
    );
  }


  render() {
    
     var msj =
     (<Snackbar
           anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
           open={this.state.msj!==''}
           autoHideDuration={3000} //opcional
       >
           <SnackbarMesssages
               variant={this.state.types}
               onClose={()=>this.setState({msj:''})}
               message={this.state.msj} />
       </Snackbar>)


    if (this.state.type !== 'Create') {
      return (<div>
        <h1>Category</h1>
        {msj}
        <Select
          name="categoryName"
          defaultValue={'DEFAULT'}
          value={this.state.selected}
          onChange={this.handleSelect}
        >
          <option value={'DEFAULT'} disabled >
            Select a category:
              </option>
          {this.state.categoryNames.map(x =>
            <option value={x.name_category} key={x.name_category}>
              {x.name_category}
            </option>)}

        </Select>
        {this.getFormular()}
        <Button onClick={() => this.setState({
          type: "Create",
          name: "",
          description: "",
        })}>Create Category</Button>
      </div>);
    }
    else {
      return (
        <div>
          <h1>Category</h1>
          
          {msj}
          <ValidatorForm onSubmit={this.handleSubmit}>

            <h3>Category name:</h3>
            <TextValidator
              value={this.state.name}
              onChange={this.handleName}
              id="category_name"
              validators={["required", "isValidName", "isValidLengthName"]}
              errorMessages={["Requered field name!", "invalid format!", "Too long name!"]}
              placeholder='Category name' /><br />

            <h3>Description of the category</h3>
            <TextValidator
              value={this.state.description}
              onChange={this.handleDescription}
              id="description_category"
              validators={["required", "isValidName", "isValidLengthDescription"]}
              errorMessages={["Requered field category!", "invalid format!", "Too long description!"]}
              placeholder='Description of the category' /><br />

            <Button type="submit" >Create</Button>
            <Button onClick={() => this.setState({ type: "Search", selected:'DEFAULT' })}>Cancel</Button>

          </ValidatorForm >
        </div>
      )
    }
  }
}