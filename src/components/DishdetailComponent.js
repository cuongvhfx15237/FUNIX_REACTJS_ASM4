import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Form,
  ModalBody,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Loading } from './LoadingComponent';
import {baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md5 m-1">
    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
    <Card key={dish.id}>
      <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
    </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  
  return (
    <div className="col-12 col-md-5 m-1">
          <h2>COMMENTS</h2>
          <ul className="list-unstyled">
          <Stagger in>
          {comments.map((comment) => {
            debugger
            return (
              <Fade in>
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author},
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
                <br></br>
              </li>
              </Fade>
            );
          })}
          </Stagger>
          </ul>
          <CommentForm dishId={dishId} postComment={postComment}/>

    </div>)};

function CommentForm (props){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const handleSubmit = (values) => {
       toggleModal();
       props.postComment(props.dishId, values.rating, values.author, values.comment);
  };
  const required = (values) => values && values.length;
  const maxLength = (len) => (values) => !values || values.length <= len;
  const minLength = (len) => (values) => values && values.length >= len;

  return (
    <Form>
          {/*button*/}
          <Row className="form-group">
            <Button
              type="button"
              style={{ color: "gray", backgroundColor: "transparent" }}
              onClick={toggleModal}
            >
              <i className="fa fa-bookmark"></i> Submit Comment
            </Button>
          </Row>

          <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Comments</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="Ratting">Ratting</Label>
                  <Control.select 
                  model=".ratting"
                  type="select" 
                  id="Ratting" 
                  name="Ratting">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author">
                    Your Name
                  </Label>
                    <Control.input
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLeng: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Comments">Comments</Label>
                  <Control.textarea
                    model=".comment"
                    type="textarea"
                    id="comment"
                    className="comment"
                    name="comment"
                  />
                </Row>
                <Row className="form-group">
                  <Button type="submit" style={{ color: "primary" }}>
                    Submit
                  </Button>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>

        </Form>
  );
}
const DishDetail = (props) => {
  debugger
  if (props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
  }
  else if (props.errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4> {props.errMess}</h4>
        </div> 
      </div>
    )
  }
  else if (props.dish != null) {
    debugger
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;