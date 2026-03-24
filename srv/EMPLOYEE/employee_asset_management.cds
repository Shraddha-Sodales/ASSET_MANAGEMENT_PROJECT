using {ASM as db} from '/home/user/asset_management/db/schema.cds';

service EmployeeService {
  
 entity AllRequest as projection on db.T.ALLREQUESTS;
  action CreateRequest (
    CATID : Integer,
    ASTID : Integer,
    PRITY : String(20)
  ) returns String;
   

    function getRequestsByUserId(USERID: String) returns array of AllRequest;
}