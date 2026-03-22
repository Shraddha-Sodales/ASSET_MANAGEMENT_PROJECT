service EmployeeService {

 
  action CreateRequest (
    CATID : Integer,
    ASTID : Integer,
    PRITY : String(20)
  ) returns String;

}