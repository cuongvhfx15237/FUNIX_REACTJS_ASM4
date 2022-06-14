import React, { useLayoutEffect, useEffect, useState } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {
  Routes,
  Route,
  Navigate,
  Redirect,
  withRouter,
  useParams,
} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect, useSelector } from "react-redux";
import DishDetail from "./DishdetailComponent";
import {
  postComment,
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router";
import { ConfigureStore } from "../redux/configureStore";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (dishId, rating, author, comment) =>
      dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
      dispatch(fetchDishes());
    },
    resetFeedbackForm: () => {
      dispatch(actions.reset("feedback"));
    },
    fetchComments: () => {
      dispatch(fetchComments());
    },
    fetchPromos: () => {
      dispatch(fetchPromos());
    },
  };
};
function Main(props) {
  const [vals, setVals] = useState({...props,
    dishes: {
      dishes: [
          {
          id: 0,
          name:'',
          image: '',
          category: '',
          label:'',
          price:'',
          featured: true,
          description:''                    
          },
      ]
    }, 
    comments: {
      comments: [
        {
          id: 0,
          dishId: 0,
          rating: 5,
          comment: "",
          author: "",
          date: ""
      },
      ]
    },
    promotions: {
      promotions: [
        
            {
              id: 0,
              name: '',
              image: '',
              label: '',
              price: '',
              featured: true,
              description: ''
                           
          },
      ]
    },
    leaders:[{
      id: 0,
      name: '',
      image: '',
      designation: '',
      abbr: '',
      featured: true,
      description: ""
    }],
  })
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
  },[]);
  const HomePage = () => {
    if (props.dishes.dishes.length===0){props=vals}

    return (
      <Home
        dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.dishes.isLoading}
        dishesErrMess={props.dishes.errMess}
        promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading={props.promotions.isLoading}
        promosErrMess={props.promotions.errMess}
        leader={props.leaders.filter((leader) => leader.featured)[0]}
      />
    );

  };
  const DishWithId = () => {
    const id = useParams();
    debugger
    return (
      <DishDetail
        dish={
          props.dishes.dishes.filter(
            (dish) => dish.id === parseInt(id.dishId, 10)
          )[0]
        }
        isLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
        comments={props.comments.comments.filter(
          (comment) => comment.dishId === parseInt(id.dishId, 10)
        )}
        commentsErrMess={props.comments.errMess}
        postComment={props.postComment}
      />
    );
  };
  const location = useLocation()
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path='menu' element={<Menu dishes={props.dishes} />}/>
            <Route path="menu/:dishId" element={<DishWithId/>} />
            <Route path='aboutus' element={ <About leaders={props.leaders}/> }/>
            <Route path='contactus' element={<Contact resetFeedbackForm={props.resetFeedbackForm}/>}/>
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
