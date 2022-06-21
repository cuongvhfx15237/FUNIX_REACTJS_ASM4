import React from 'react';
import { Card , CardImg , CardTitle, Button, Breadcrumb, BreadcrumbItem, Row} from 'reactstrap';
import { Link, useParams} from 'react-router-dom';


function DepartmentInfor(props){
    const departmentName = useParams();

   //  const depts = props.departments.departments.filter((dept)=> dept.name === 'Sale')
    const depts = props.departments.departments.filter((dept)=> dept.name === departmentName.departmentName)
    const staffOfDepart = props.staffs.staffs.filter((staff) =>
      staff.departmentId === depts[0].id)
    .map((staff) =>{
       return(
          <div key={staff.id} className="col-sm-6 col-md-4 col-xl-2" style={{padding:'1em'}}>
             <Card>
                <Link to={`/nhanvien/${staff.id}`} style={{textDecoration:'none'}}>
                  <CardImg src={staff.image} alt={staff.name} className='col-sm-12 col-md-4 col-xl-3'/>
                  <CardTitle style={{ textAlign: "center", color:'black', fontSize:'1.1em' }}>{staff.name}</CardTitle>

                </Link>
                <Row>
                     <Button color='primary' style={{width:"50%"}}>Update
                     <Link to={`/nhanvien/${staff.id}`} style={{textDecoration:'none'}}/></Button>
                  <Button color='danger' style={{width:"50%"}} >Delete</Button>

                  </Row>
             </Card>
          </div>
       )
    })


    return(
       <div className="container-fluid">
          <div className="row">
             <Breadcrumb>
                <BreadcrumbItem>
                   <Link to="/PhongBan">Phòng Ban</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>{departmentName.departmentName}</BreadcrumbItem>
             </Breadcrumb>
          </div>

          <hr />

          <div className="row">
             {staffOfDepart}
          </div>
       </div>
    )
}
export default DepartmentInfor;

