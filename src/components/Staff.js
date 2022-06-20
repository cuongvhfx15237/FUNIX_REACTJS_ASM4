import React, {useState} from "react";
import { CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import '../index.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FadeTransform } from 'react-animation-components';

const isNumber = (val) => !isNaN(Number(val)) || !(val);
function RenderStaff(props, staff, departments, update) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  function updateStaff(values){
    const newInfor = {
       id: staff.id,
       name: values.nameStaff,
       doB: values.dateOfBirth,
       salaryScale: values.salaryScale,
       startDate: values.startDate,
       departmentId: values.department,
       annualLeave: values.annualLeave,
       overTime: values.overTime,
       salary: 3000000,
       image: '/assets/images/alberto.png',
    };
    setIsOpenModal(!isOpenModal);
    update(newInfor);
 }
function updateStaff(){
 const department = departments.filter((department) =>department.id === staff.departmentId)[0];
   return(
      <div>
         <div className="row">
            <Button onClick={()=> setIsOpenModal(!isOpenModal)}>Update</Button>
         </div>
         <div className="row my-1 shadow-lg">
            <div className="col-md-3 col-sm-4 col-12">
               <img src={staff.image} width="100%" alt=""/>
            </div>

            <div className="col-md-9 col-sm-8 col-12">
               <h2>{staff.name}</h2>
               <p> --<i>Ngày sinh: </i> {dateFormat(staff.doB , "dd/mm/yyyy")}
               </p>
               <p>
                  --<i>Ngày vào công ty: </i>
                  {dateFormat(staff.startDate, "dd/mm/yyyy")}
               </p>
               <p>
                  --<i>Phòng Ban: </i>
                  {department.name || staff.departmentId}
               </p>
               <p>
                  --<i>Số ngày nghỉ còn lại: </i>
                  {staff.annualLeave}
               </p>
               <p>
                  --<i>Số ngày nghỉ còn lại: </i>
                  {staff.overTime}
               </p>
            </div>
         </div>
         <Modal isOpen={isOpenModal}>
            <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
               Update
            </ModalHeader>
            <ModalBody>
               <LocalForm onSubmit={updateStaff}>
                  {/* ten nhan vien */}
                  <Row className="form-group">
                     <Label htmlFor="nameStaff" md={4}>Tên</Label>
                     <Col md={8}>
                        <Control.text model=".nameStaff" name="nameStaff"
                           className="form-control"
                        />
                     </Col>
                  </Row>
                  {/* ngay sinh cua nhan vien */}
                  <Row className="form-group">
                     <Label htmlFor="dateOfBirth" md={4}>
                        Ngày sinh:   
                     </Label>
                     <Col md={8}>
                        <Control type="date" name="dateOfBirth" 
                           model=".dateOfBirth"
                           className="form-control"
                        />
                     </Col>
                  </Row>
                  {/* ngay vao cong ty */}
                  <Row className="form-group">
                     <Label htmlFor="startDate" md={4}>
                        Ngày vào công ty:
                     </Label>
                     <Col md={8}>
                     <Control type="date" model=".startDate" name="startDate" className="form-control" />
                     </Col>
                  </Row>
                  {/* phong ban cong ty */}
                  <Row className="form-group">
                     <Label htmlFor="department" md={4}>
                        Phòng ban
                     </Label>
                     <Col md={8}>
                        <Control.select model=".department" name="department" className="form-control"
                        defaultValue={"Sale"}>
                           <option selected="selected" value='Dep01'>Sale</option>
                           <option value='Dep02'>HR</option>
                           <option value='Dep03'>Marketing</option>
                           <option value='Dep04'>IT</option>
                           <option value='Dep05'>Finance</option>
                        </Control.select>
                     </Col>
                  </Row>
                  {/* he so luong */}
                  <Row className="form-group">
                        <Label htmlFor="salaryScale" md={4}>
                           Hệ số lương 
                        </Label>
                        <Col md={8}>
                        <Control.text model=".salaryScale" name="salaryScale" 
                        className="form-control"
                        validators={{
                           isNumber
                        }}
                        />
                        <Errors
                           className="text-danger"
                           model=".salaryScale"
                           show="touched"
                           messages={{
                              isNumber: 'Dữ liệu nên là số'
                           }}
                        />
                        </Col>
                     </Row>
                  {/* Số ngày nghỉ còn lại */}
                  <Row className="form-group">
                     <Label htmlFor="annualLeave" md={4}>
                        Số ngày nghỉ còn lại  
                     </Label>
                     <Col md={8}>
                     <Control.text model=".annualLeave" name="annualLeave" className="col-12 form-control"
                     validators={{
                        isNumber
                     }}
                     />
                     <Errors
                        className="text-danger"
                        model=".annualLeave"
                        show="touched"
                        messages={{
                           isNumber: 'Dữ liệu nên là số'
                        }}
                     />
                     </Col>
                  </Row>
                  {/* Số ngày làm thêm */}
                  <Row className="form-group">
                     <Label htmlFor="overTime" md={4}>Số ngày làm thêm</Label>
                     <Col md={8}>
                        <Control.text model=".overTime" name="overTime" className="form-control" 
                        validators={{isNumber}}/>
                        <Errors
                           model=".overTime"
                           className="text-danger"
                           show="touched"
                           messages={{
                              isNumber: 'Dữ liệu nên là số'}}
                        />
                     </Col>
                  </Row>
                  {/* Button submit update */}
                  <Button color="primary">
                     Update
                  </Button>
               </LocalForm>
            </ModalBody>
         </Modal>
      </div>
   )
}


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
            <Button color='primary'>Update</Button>
        </CardBody>
      </div>
    </div>
        );
      }

export default RenderStaff;