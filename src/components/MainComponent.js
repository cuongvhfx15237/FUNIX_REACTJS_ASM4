import React from 'react';
import StaffList from './StaffListComponent';
import Department from './DeparmentComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Salary from './SalaryComponent';
import RenderStaff from './Staff';
// import SearchName from './SearchComponent';

function Main(props){

  // const addStaff = (staffAdd) =>{
  //   const idF = this.state.Staffs.map((staff)=>staff.id);
  //   const id = Math.max(...idF) + 1;
  //   const newStaff = { id, ...staffAdd};
  //   this.setState({
  //    Staffs: [...this.state.Staffs, newStaff]
  // });
  // console.log(newStaff)
  // console.log(this.state.Staffs)
  // }

      const StaffWithId=()=>{
        const id=useParams();
        return(
          <RenderStaff 
          Staff={this.state.Staffs.filter((Staff)=>Staff.id === parseInt (id.id, 10))}
          />
        )
      }
  
      return(
       
        <div>
          <Routes>
                <Route path='NhanVien' element={<StaffList Staffs={this.state.Staffs} Departments={this.state.Departments} onAdd={this.addStaff}/>}/>
                <Route path='NhanVien/:id' element={<StaffWithId />}/>
                <Route path='PhongBan' element={<Department Department={this.state.Departments} />}/>
                <Route path='BangLuong' element={<Salary Staffs={this.state.Staffs} />}/>
                <Route path='*' element={<Navigate to="/Nhanvien" />}/>
          </Routes>
        </div>
      
      )
    }

export default Main;