import React, {useState} from "react";
import { CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, ModalFooter, Card } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import '../index.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FadeTransform } from 'react-animation-components';

const isNumber = (val) => !isNaN(Number(val)) || !(val);
const required = (val) => (val && val.length > 0);
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => (val && (val.length >= len)) || !(val)
  var dateReg = (val) => (val && val.length > 0);
function RenderStaff(props) {
  function handleUpdate(value){
   const doBValue=(new Date(value.updateDoB)).toISOString();
    const startDateValue = (new Date(value.updateStartDate)).toISOString();
    const DepartmentValue =document.querySelector("#updateDepartment").value;
    const salaryScaleValue = parseInt(value.updateSalaryScale)
    const annualLeaveValue = parseInt(value.updateAnnualLeave)
    const overTimeValue = parseInt(value.updateOverTime)
    const newInfor = {
       id: props.Staff[0].id,
       name: value.updateName,
       doB: doBValue,
       salaryScale: salaryScaleValue,
       startDate: startDateValue,
       departmentId: DepartmentValue,
       annualLeave: annualLeaveValue,
       overTime: overTimeValue,
       salary: 3000000,
       image: '/assets/images/alberto.png',
    };
    props.updateStaff(newInfor);
    debugger
 }

 const [modalUpdate, setModalUpdate] = useState(false)

 {/* function to control Modal add Staff
- Params AddModal : false to close*/}
 function toggleModal(){
   setModalUpdate(
   !modalUpdate,
   )
 }

// function updateStaff(){
//  const department = departments.filter((department) =>department.id === staff.departmentId)[0];




debugger
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
            <Button color='primary' onClick={toggleModal}>Update</Button>

          {/*update Staff Modal*/}
          <Modal
            style={{ width: "900px", maxWidth: "100%" }}
            isOpen={modalUpdate}
          >
            <div>
              <LocalForm className="form-container" id="form-container" 
              onSubmit={(value)=> handleUpdate(value)}
              >
                <ModalHeader style={{width: '100%', display: 'inline-flex'}}>
                        Cập nhật thông tin nhân viên
                        <button onClick={toggleModal} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{display:'inherit'}}></button>
                </ModalHeader>
                <ModalBody style={{display:'flex'}}>
                  <Card style = {{width: '30%'}}>
                     <CardImg src={props.Staff[0].image} alt={props.Staff[0].name} />
                  </Card>
                  <Card style = {{ width: '70%'}}>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="name">
                      Họ Và Tên
                    </Label>
                    <Control.input
                      model=".updateName"
                      className="col-sm-12 col-md-8 col-xl-9"
                      id="updateName"
                      name="updateName"
                      placeholder="Họ và tên"
                      validators={{
                        required: required, 
                        minLength: minLength(3),
                        maxLength: maxLength(30)
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".updateName"
                    className = "text-danger col-sm-12 col-md-8 col-xl-9"
                    show="touched"
                    messages={{
                      required:"Yêu cầu nhập thông tin",
                      minLength: "Tên phải nhiều hơn 3 ký tự",
                      maxLength:" Tên phải ít hơn  ký tự",
                    }}></Errors>

                  </Row>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="doB">
                      Ngày Sinh
                    </Label>
                    <Control.input
                      model=".updateDoB"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="date"
                      id="updateDoB"
                      name="updateDoB"
                      validators={{
                        dateReg,
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".updateDoB"
                    className = "text-danger col-sm-12 col-md-8 col-xl-9"
                    show="touched"
                    messages={{
                      dateReg: "Vui long nhap ngay thang"
                    }}></Errors>
                  </Row>
                  <Row className="row" id="form-group">
                    <Label
                      className="col-sm-12 col-md-4 col-xl-3"
                      htmlFor="startDate"
                    >
                      Ngày vào công ty
                    </Label>
                    <Control.input
                      model=".updateStartDate"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="date"
                      id="updateStartDate"
                      name="updateStartDate"
                      validators={{
                        dateReg,
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".updateStartDate"
                    className = "text-danger col-sm-12 col-md-8 col-xl-9"
                    show="touched"
                    messages={{
                      dateReg: 'Vui long nhap ngay thang'
                    }}></Errors>
                  </Row>
                  <Row className="row" id="form-group">
                    <Label
                      className="col-sm-12 col-md-4 col-xl-3"
                      htmlFor="department"
                    >
                      Phòng ban
                    </Label>
                    <Control.select
                      model=".updateDepartment"
                      id="updateDepartment"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="select"
                      name="updateDepartment"
                    >
                      {props.Departments.departments.map((department) => {
                        return (
                          <option
                            key={props.Departments.departments.indexOf(department)}
                            value={department.id}
                          >
                            {department.name}
                          </option>
                        );
                      })} 

                    </Control.select>
                  </Row>
                  <Row className="row" id="form-group">
                    <Label
                      className="col-sm-12 col-md-4 col-xl-3"
                      htmlFor="salaryScale"
                    >
                      Hệ số lương
                    </Label>
                    <Control.input
                      model=".updateSalaryScale"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={1}
                      name="updateSalaryScale"
                    />
                  </Row>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="annualLeave">
                      Số ngày nghỉ còn lại
                    </Label>
                    <Control.input
                      model = ".updateAnnualLeave"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={0}
                      name="updateAnnualLeave"
                    />
                  </Row>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="overTime">
                      Số ngày làm thêm
                    </Label>
                    <Control.input
                    model=".updateOverTime"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={0}
                     name="updateOverTime"
                    />
                  </Row>
                  </Card>
                </ModalBody>
                
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={toggleModal}>Cập nhật<Link to='Nhanvien'></Link></Button>
                </ModalFooter>
              </LocalForm>
            </div>
          </Modal>


        </CardBody>
      </div>
    </div>
        );
      }

export default RenderStaff;