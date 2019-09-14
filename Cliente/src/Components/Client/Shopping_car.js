import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Input,Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {getCar} from '../../store/shopping_car/reducer';
import {getUsername} from '../../store/username/reducer';
import updateCar from '../../store/shopping_car/action';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CheckPayment from './CheckPayment';



class Shopping_car extends React.Component {
  constructor(props){
    super(props)

    this.state={
      activate: false
    }

    this.update= this.update.bind(this);
    this.delete= this.delete.bind(this);
    this.buy= this.buy.bind(this);
    this.showCar= this.showCar.bind(this);
    this.payment= this.payment.bind(this);
    this.closePayment= this.closePayment.bind(this);
    this.act = this.act.bind(this)
  }

  buy(){

    this.setState({   
      activate: true            
    })
    /*
    fetch ("/Bill/buy", {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, * /*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username:this.props.username,
        books:this.props.car.map((z)=>{
          console.log(z)
          return({
              isbn:z.isbn,
              name_dp:z.distribution_point,
              quantity:z.quantity
          })
      })
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.bool){
        console.log(res)
        this.props.updateCar([])
        this.forceUpdate();
      }
      else{
        console.log("NO entro")
      }
    });
    */
  }

  payment(){
    return(
      <CheckPayment />
    );
  }


  update(event){
    var aux=this.props.car
    
    aux[event.target.name].quantity=parseInt(event.target.value);
    
    this.props.updateCar(aux)
    
  }

  delete(event){
    var aux=this.props.car
    
    aux.splice(event.target.name,1)
    console.log(aux)
    this.props.updateCar(aux)
    this.forceUpdate();
  } 

  act(){
    if(this.state.activate){
      return(
        <CheckPayment callback={this.closePayment.bind(this)}/>
      )
    }
  }

  closePayment(){
    this.setState({
      activate: false
    })
  }
  
  showCar(){
   
    if(this.props.car.length!==0){
      
      return(
        <div>
          {this.props.car.map( (x,i)=>
                    <Card key={i} >
                      <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                          Isbn:{x.isbn}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {x.title}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                          Distribution Point: {x.distribution_point}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                          Quantity Available: {x.limit}
                        </Typography>
                        <Typography>
                          Quantity:
                        </Typography>
                        <Input type="number" name={i.toString()} onChange={this.update} inputProps={{min:"1",max:x.limit}}   defaultValue={x.quantity}></Input>
                        
                      </CardContent>
                      <IconButton color="inherit" onClick={this.delete}>
                          <DeleteIcon />
                      </IconButton>
                    </Card>  
                    )}
            <Button key="boton" onClick={this.buy}>To buy</Button>
            {this.act()}
        </div>
      )
    }
    else return (<p>You have no items in your shopping cart</p>)
  }

  render(){ 
    console.log(this.props)     
    return (
    <div>
      {this.showCar()}
    </div>);
  } 
}


const mapStateToProps= state => {
  return {
    car: getCar(state),
    username: getUsername(state)
  }
}


export default connect (mapStateToProps,{updateCar})(Shopping_car);


