import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import {LocalForm, Control, Errors} from 'react-redux-form';
import "../index.css";
import { Link } from "react-router-dom";
import { Button, Modal } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FadeTransform } from 'react-animation-components';
import * as BUTTON from "./ButtonComponent"


function StaffList(props, iStaffs) {
  const required = (val) => (val && val.length > 0);
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => (val && (val.length >= len)) || !(val)
  var dateReg = (val) => (val && val.length > 0);
  const [modalAdd, setModalAdd] = useState(false)

  {/* function to control Modal add Staff
- Params AddModal : false to close*/}
  function toggleModal(){
    setModalAdd(
    !modalAdd,
    )
  }

  {/* function to control data when changed
- Params name: name of object of staff info
- value value of name object
- use onAdd to pass value newStaff info from children component to Main component*/}
  const handleSubmit = (value) =>{
    //  event.preventDefault();
    const doBValue=(new Date(value.doB)).toISOString();
    const startDateValue = (new Date(value.startDate)).toISOString();
    const DepartmentValue = props.Departments[document.querySelector("#department").value];
    const salaryScaleValue = parseInt(value.salaryScale)
    const annualLeaveValue = parseInt(value.annualLeave)
    const overTimeValue = parseInt(value.overTime)

    const newStaff = {
      name: value.name,
      doB: doBValue,
      startDate: startDateValue,
      department: DepartmentValue,
      salaryScale: salaryScaleValue,
      annualLeave: annualLeaveValue,
      overTime: overTimeValue,
      image: "/assets/images/alberto.png",
    };
     props.onAdd(newStaff)
  }
  

  function RenderStaffList({ Staff }) {
    //render  list staff with image and name;
    return (
      <Card>
        <Link to={`${Staff.id}`}>
          <CardImg src={Staff.image} alt={Staff.image} />
          <CardTitle style={{ textAlign: "center" }}>{Staff.name}</CardTitle>
        </Link>
        {/* <Button color='primary' style={{display: 'inline-block', width:"50%"}}>Update</Button>
        <Button color='danger' style={{display: 'inline-block', width:"50%"}} onDeleteStaff={props.deleteStaff}>Delete</Button> */}
        <Row>
        <BUTTON.delButton />
        <BUTTON.updateButton Staff={Staff}/>
        </Row>
      </Card>
    );
  }

  // getvalue search Name
  //params : iStaff
  const [searchName, setSearchName] = useState("");
  const mySearch = () => {
    setSearchName(document.getElementById("SearchName").value);
  };
  if (searchName === "") {
    iStaffs = props.Staffs;
  } else {
    iStaffs = props.Staffs.filter(
      (iStaff) => iStaff.name.match(eval("/" + searchName + "/gi")) != null
    );
  }

  //Defragment
  const [Defragment, setDefragment] = useState("");
  const myDefragment = () => {

    setDefragment(document.getElementById("Defragment-select").value);
  };
  const DepartmentContainer = props.Departments.departments.map((departmentItem) => {

    const Staffs = iStaffs.staffs.filter(
      (iStaff) => iStaff.departmentId === departmentItem.id
    );
    if (Defragment === "Defragment") {
      return (
        <div
          className="row"
          style={{
            margin: "inherit",
            padding: "0px",
            border: "1px solid black",
          }}
          key={departmentItem.id}
        >
          <div
            className="col-sm-12 col-md-3 col-xl-2"
            style={{
              padding: 1 + "em",
              backgroundColor: "#1e90ff",
              border: "1px solid black",
              fontSize: 1 + "em",
              textAlign: "center",
              width: "100%",
            }}
          >
            {departmentItem.name}
          </div>
          <div className="row">
            {Staffs.map((Staff) => {
              return (
                <div
                  key={Staff.id}
                  className="col-sm-12 col-md-3 col-xl-2"
                  style={{ padding: 1 + "em" }}
                >
                  <RenderStaffList Staff={Staff} />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {

      return Staffs.map((Staff) => {

        return (
          <div
            key={Staff.id}
            className="col-sm-6 col-md-4 col-xl-2"
            style={{ padding: 1 + "em" }}
          >
            <RenderStaffList Staff={Staff} />
          </div>
        );
      });
    }
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="col-sm-2 col-md-2 col-xl-2">Nhân Viên</h2>

        {/*search*/}
        <div className="col-sm-7 col-md-8 col-xl-8">
          <input
            id="SearchName"
            type="text"
            className="form-control "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>
        <div className="col-sm-3 col-md-2 col-xl-2">
          <button
            type="button"
            style={{ width: "100%" }}
            className="btn btn-outline-primary "
            onClick={mySearch}
          >
            search
          </button>
        </div>
      </div>
      <hr />

      {/*add Staff*/}
      <div className="row">
        <div className="col-sm-2 col-md-2 col-xl-2">
          <Button color="primary" onClick={toggleModal}>
            ADD
          </Button>

          <Modal
            style={{ width: "900px", maxWidth: "100%" }}
            isOpen={modalAdd}
          >
            <div>
              <LocalForm className="form-container" id="form-container" onSubmit={(value)=> handleSubmit(value)}>
                <ModalHeader>Thông tin nhân viên</ModalHeader>
                <ModalBody>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="name">
                      Họ Và Tên
                    </Label>
                    <Control.input
                      model=".name"
                      className="col-sm-12 col-md-8 col-xl-9"
                      id="name"
                      name="name"
                      placeholder="Họ và tên"
                      validators={{
                        required: required, 
                        minLength: minLength(3),
                        maxLength: maxLength(30)
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".name"
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
                      model=".doB"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="date"
                      id="doB"
                      name="doB"
                      validators={{
                        dateReg,
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".doB"
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
                      model=".startDate"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="date"
                      id="startDate"
                      name="startDate"
                      validators={{
                        dateReg,
                     }}
                    />
                    <span className="col-sm-12 col-md-4 col-xl-3"></span>
                    <Errors
                    model=".startDate"
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
                      model=".department"
                      id="department"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="select"
                      name="department"
                    >
                      {props.Departments.departments.map((department) => {
                        return (
                          <option
                            key={props.Departments.departments.indexOf(department)}
                            value={props.Departments.departments.indexOf(department)}
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
                      model=".salaryScale"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={1}
                      name="salaryScale"
                    />
                  </Row>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="annualLeave">
                      Số ngày nghỉ còn lại
                    </Label>
                    <Control.input
                      model = ".annualLeave"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={0}
                      name="annualLeave"
                    />
                  </Row>
                  <Row className="row" id="form-group">
                    <Label className="col-sm-12 col-md-4 col-xl-3" htmlFor="overTime">
                      Số ngày làm thêm
                    </Label>
                    <Control.input
                    model=".overTime"
                      className="col-sm-12 col-md-8 col-xl-9"
                      type="number"
                      defaultValue={0}
                      name="overTime"
                    />
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={toggleModal}>
                    Thêm
                  </Button>
                </ModalFooter>
              </LocalForm>
            </div>
          </Modal>
        </div>

        {/*Sort*/}
        <div className="col-sm-7 col-md-8 col-xl-8">
          <select className="form-select rounded " id="Defragment-select">
            <option value="Default">None Defragment</option>
            <option value="Defragment">Defragment with Deparment</option>
          </select>
        </div>
        <div className="col-sm-3 col-md-2 col-xl-2">
          <Button
            type="button"
            className="btn btn-outline-primary"
            style={{
              width: "100%",
              background: "none",
            }}
            onClick={myDefragment}
          >
            {" "}
            Submit
          </Button>
        </div>

        {/*body*/}
        <div className="row">{DepartmentContainer}</div>
        <div className="row">
          Bấm vào tên Nhân Viên để xem thông tin cụ thể.
        </div>
      </div>
    </div>
  );
}

export default StaffList;