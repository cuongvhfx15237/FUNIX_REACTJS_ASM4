import React from "react";
import { Card } from "reactstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";



function Department (props){
    const Dept = props.Department.map((Dept) => {
      return (

          <div key={Dept.id}  className="col-sm-12 col-md-6 col-xl-4" style={{padding: "1em"}}>
                    <Link to={`/PhongBan/${Dept.name}`} style={{textDecoration:'none'}}>
              <Card style={{padding: "10px",  backgroundImage: "linear-gradient(#0dcaf0 50%, #f8f9fa 50%", color:'black'}}>
                  <h3>{Dept.name}</h3>
                  <p>Số Lượng Nhân Viên : {Dept.numberOfStaff}</p>
              </Card>
              </Link>
            </div>
          );
          }); 
          const StaffsofDept = props.Department.map((Dept) => {
            return (
                <div key={Dept.id}  className="col-sm-12 col-md-6 col-xl-4" style={{padding: "1em"}}>
                          <Link to={`/PhongBan/${Dept.name}`}>
                    <Card style={{padding: "10px",  backgroundImage: "linear-gradient(#0dcaf0 50%, #f8f9fa 50%"}}>
                        <h3>{Dept.name}</h3>
                        <p>Số Lượng Nhân Viên : {Dept.numberOfStaff}</p>
                    </Card>
                    </Link>
                  </div>
                );
                }); 
    return (
      <div className="container-fluid">
        <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='Nhanvien'>Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active> Phòng Ban</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <hr/>
          <div className="row">
            {Dept}
          </div>

      </div>
    );
  
}
export default Department;
