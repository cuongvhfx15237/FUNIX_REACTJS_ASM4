import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent'
import About from './AboutComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, Redirect, withRouter, useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import DishDetail from './DishdetailComponent';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }
}
class Main extends Component {

  
  constructor(props) {
    super(props);

  }



  render() {

    const HomePage = () => {
        return(
          <Home 
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        )
    }
    const DishWithId = () => {
      const id=useParams()
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(id.dishId,10))[0]}
            comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(id.dishId,10))}
            />
          
      )
    }
    
    return(
     
      <div>
        <Header />
        <Routes>
              <Route path='home' element={<HomePage />}/>
              <Route path='menu' element={<Menu dishes={this.props.dishes} />}/>
              <Route path='menu/:dishId' element={<DishWithId/>}/>
              <Route path='aboutus' element={<About leaders={this.props.leaders}/>}/>
              <Route path='contactus' element={<Contact/>}/>
              <Route path='/*' element={<Navigate to="/home" />}/>
        </Routes>
        <Footer />
      </div>
    
    );

  }
}


export default connect(mapStateToProps)(Main);