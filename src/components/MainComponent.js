import React, { useEffect, setState } from 'react';
import { connect, useSelector } from "react-redux";
import StaffList from './StaffListComponent';
import Department from './DeparmentComponent';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Salary from './SalaryComponent';
import RenderStaff from './Staff';
import { Loading } from "./LoadingComponents";
import { fetchStaffs , fetchDepartments , fetchSalarys, addStaff, deleteStaff, updateStaff } from '../redux/ActionCreators';
import DepartmentInfor from './DepartmentInfo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return{ 
     staffs: state.staffs,
     departments: state.departments,
     staffsSalary: state.staffsSalary,
  }
}

const mapDispatchToProps = (dispatch) =>({
  addStaff: (staff)=>{
    dispatch(addStaff(staff)); },
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments : () => {dispatch(fetchDepartments())},
  fetchSalarys: () => {dispatch(fetchSalarys())},
    deleteStaff: (id) => {
      dispatch(deleteStaff(id))
    },
    updateStaff: (staff) => {dispatch(updateStaff(staff))}
}
)

function Main(props){

  useEffect(()=>{
    props.fetchStaffs();
    props.fetchDepartments();
    props.fetchSalarys();},[]
  )
      const StaffWithId=()=>{
        const id=useParams();
        return(
          <RenderStaff 
          Staff={props.staffs.staffs.filter((Staff)=>Staff.id === parseInt (id.id, 10))}
          />
        )
      }
      const location = useLocation();
  // if (props.departments.departments.length==0){
    if(props.staffs.isLoading){

      return <Loading />
    }
    else if(props.staffs.errMess !== null){

      return <h3>{props.staffs.errMess}</h3>
   }    
  // return <div></div>}
  else {
debugger
      return(
        <div>
      <TransitionGroup >
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
                <Route path='NhanVien' element={<StaffList Staffs={props.staffs} Departments={props.departments} onAdd={props.addStaff} onDeleteStaff={props.deleteStaff}/>}/>
                <Route path='NhanVien/:id' element={<StaffWithId onDeleteStaff={props.deleteStaff}/>}/>
                <Route path='PhongBan' element={<Department Department={props.departments.departments} />}/>
                <Route path='PhongBan/:departmentName' element={<DepartmentInfor departments={props.departments} staffs={props.staffs} />}/>
                <Route path='BangLuong' element={<Salary Staffs={props.staffs} />}/>
                <Route path='*' element={<Navigate to="/Nhanvien" />}/>
          </Routes>
          </CSSTransition>
        </TransitionGroup>
        </div>
      
      )}
    }

export default connect(mapStateToProps, mapDispatchToProps)(Main);