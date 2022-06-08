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

function RenderDish({ dish }) {
  return (
    <Card key={dish.id}>
      <CardImg top width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  
  return (
    <div className="container" style={{ padding: 0 + "em" }}>
      <Card>
        <CardBody>
          <h2>COMMENTS</h2>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CardText>{comment.comment}</CardText>
                <CardText>
                  <span>--</span>
                  {comment.author},
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </CardText>

                <br></br>
              </div>
            );
          })}
          <CommentForm dishId={dishId} addComment={addComment}/>
        </CardBody>
      </Card>
    </div>)};

function CommentForm (props){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const handleSubmit = (values) => {
       toggleModal();
       console.log(values.rating)
       console.log(values.author)
       console.log(values.comment)
       props.addComment(props.dishId, values.rating, values.author, values.comment);
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
  if (props.dish != null) {
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
            addComment={props.addComment}
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