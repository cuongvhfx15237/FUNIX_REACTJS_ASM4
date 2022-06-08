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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }
}
const mapDispatchToProps = (dispatch) => ({
  addComment:(dishId, rating, author, comment) => 
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{ dispatch(actions.reset('feedback'))}
})
class Main extends Component {

  
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }



  render() {

    const HomePage = () => {
        return(
          <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        )
    }
    const DishWithId = () => {
      const id=useParams()
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(id.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(id.dishId,10))}
            addComment={this.props.addComment}
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
              <Route path='contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
              <Route path='/*' element={<Navigate to="/home" />}/>
        </Routes>
        <Footer />
      </div>
    
    );

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);