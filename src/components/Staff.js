import React from "react";
import { CardImg, CardText, CardBody } from "reactstrap";
import dateFormat from "dateformat";
import '../index.css'
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function RenderStaff(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='Nhanvien'>Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active> {props.Staff[0].name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <CardBody className="col-sm-12 col-md-4 col-xl-3">
            <CardImg src={props.Staff[0].image} alt={props.Staff[0].name} />
        </CardBody>
        <CardBody className="col col-md-8 col-xl-9">
            <h1>{props.Staff[0].name}</h1>
            <CardText>
              Ngày sinh: {dateFormat(props.Staff[0].doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(props.Staff[0].startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Hệ số lương: {props.Staff[0].salaryScale} </CardText>
            <CardText>Số ngày nghỉ còn lại: {props.Staff[0].annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {props.Staff[0].overTime}</CardText>
        </CardBody>
      </div>
    </div>
        );
      }

export default RenderStaff;