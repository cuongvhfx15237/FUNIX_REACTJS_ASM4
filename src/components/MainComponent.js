import React, { useEffect } from 'react';
import StaffList from './StaffListComponent';
import Department from './DeparmentComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Salary from './SalaryComponent';
import RenderStaff from './Staff';
import { ConfigureStore } from "../redux/configureStore";
import { fetchStaffs , fetchDepartments , fetchSalarys } from '../redux/ActionCreators';
// import SearchName from './SearchComponent';
const mapStateToProps = (state) => {
  return{ 
     staffs: state.staffs,
     departments: state.departments,
     staffsSalary: state.staffsSalary,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments : () => {dispatch(fetchDepartments())},
  fetchSalarys: () => {dispatch(fetchSalarys())},}
};

function Main(props){
  debugger
  useEffect(()=>{
    props.fetchStaffs();
    props.fetchDepartments();
    props.fetchSalarys();},[]
  )

  const addStaff = (staffAdd) =>{
    const idF = props.Staffs.map((staff)=>staff.id);
    const id = Math.max(...idF) + 1;
    const newStaff = { id, ...staffAdd};
    this.setState({
     Staffs: [...props.Staffs, newStaff]
  });
  }

      const StaffWithId=()=>{
        const id=useParams();
        return(
          <RenderStaff 
          Staff={props.Staffs.filter((Staff)=>Staff.id === parseInt (id.id, 10))}
          />
        )
      }
  debugger
  if (props.departments===undefined){
    debugger
  return <div></div>}
  else {
    debugger
      return(
        <div>
          <Routes>
                <Route path='NhanVien' element={<StaffList Staffs={props.Staffs} Departments={props.Departments} onAdd={addStaff}/>}/>
                <Route path='NhanVien/:id' element={<StaffWithId />}/>
                <Route path='PhongBan' element={<Department Department={props.Departments} />}/>
                <Route path='BangLuong' element={<Salary Staffs={props.Staffs} />}/>
                <Route path='*' element={<Navigate to="/Nhanvien" />}/>
          </Routes>
        </div>
      
      )}
    }

export default Main;