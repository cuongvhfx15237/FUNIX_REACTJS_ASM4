import React, {useState} from "react";
import { Card, CardTitle } from "reactstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

//add comman to Money
function formatMoney(n) {
  return   (Math.round(n * 100) / 100).toLocaleString()+ "VND ";
}

  function Salary(props, iStaffs){
    debugger
      // getvalue search Name
    const [searchName, setSearchName] = useState('');
    const mySearch = () => {

      setSearchName(document.getElementById("SearchName").value);
  
    }
    if (searchName === ''){
    debugger
     iStaffs = props.Staffs;
    }
    else {
      debugger
     iStaffs=props.Staffs.filter((iStaff)=> iStaff.name===searchName)}

      //Sort 
    const [SortId, setSortId] = useState('');
      const mySort = () => {
        setSortId(document.getElementById("SortHandle").value);
        if (SortId === "IdUp") {
          return (
            iStaffs = iStaffs.sort(function(a,b){
              return(a.id-b.id)
            })
          )

        }
        else if (SortId === "IdDown") {
          return (
            iStaffs = iStaffs.sort(function(a,b){
              return(b.id-a.id)
            })
          )
        }
        else if (SortId === "salaryDown") {
          return (
            iStaffs = iStaffs.sort(function(a,b){
              return(b.id-a.id)
            })
          )
        }
        else if (SortId === "salaryUp") {
          return (
            iStaffs = iStaffs.sort(function(a,b){
              return(b.id-a.id)
            })
          )
        }
        console.log(iStaffs);
      }



  //body
       const staf = iStaffs.staffs.map((Staff) => {
         const salaryTotal = formatMoney(parseInt(Staff.salaryScale)*3000000+parseInt(Staff.overTime)*200000);
         Staff = Object.assign(Staff, {salaryTotal:salaryTotal});
      return (
          <div 
            key={Staff.id}  
            className="col-sm-12 col-md-6 col-xl-4" 
            style={{padding: 1 + "rem"}}>
              <Card  
                style={{padding: 0.4 + "rem",  
                backgroundImage: "linear-gradient(#0dcaf0 20%, #f8f9fa 20%"}}>
                  <Link 
                    to={`/Nhanvien/${Staff.id}`} 
                    style={{ textDecoration: "none", color:"black"}}>
                      <h4 style={{ textAlign: "center"}}>{Staff.name}</h4>
                  </Link>
                  <p> Mã Nhân Viên : {Staff.id}</p>
                  <p> Hệ số lương: {Staff.salaryScale}</p>
                  <p> Số ngày làm thêm: {Staff.overTime} </p>
                  <label style={{backgroundColor:'#e3e3e3', border:'1px solid black', borderRadius:10+"px", textAlign: 'center', fontSize:22+"px"}}> 
                    Lương: {Staff.salaryTotal}
                    </label>
                  
              </Card>
            </div>
          );
          }); 


          
    return (
      <div className="container-fluid">
          
      <div className="row">
        <Breadcrumb style={{width: 50 + "%"}}>
          <BreadcrumbItem>
            <Link to='Nhanvien'>Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active> Bảng Lương</BreadcrumbItem>
        </Breadcrumb>

          <div className="input-group" style={{width: 50 + '%'}}>
                <input id="SearchName" 
                        type="text" 
                        className="form-control rounded" 
                        placeholder="Search" aria-label="Search" 
                        aria-describedby="search-addon" />
                <button type="button" 
                        className="btn btn-outline-primary" 
                        style={{backgroundColor:"none"}} 
                              onClick= {mySearch}>
                                search
                </button>
            </div>
      </div>
      <hr/>
          <div className="row" >
              <div style={{width: 50 + "%"}}></div>
              <div  className="input-group" style={{width: 50 + '%', alignItems:'flex-end'}}>

                <select id='SortHandle' className="form-select"  style={{margin: '0px', width: '80%'}} >
                    <option value="IdUp">Id Up</option>
                    <option value="IdDown">Id Down</option>
                    <option value="salaryUp">Salary total Up</option>
                    <option value="salaryDown">Salary total down</option>
                </select>
                <button type="button" 
                        className="btn btn-outline-primary" 
                        style={{backgroundColor:"none"}} 
                        onClick= {mySort}>
                          Submit
                </button>
                </div>
          </div>
          <div className="row" >
            {staf}
          </div>
      </div>
    );
  
}


export default Salary;

