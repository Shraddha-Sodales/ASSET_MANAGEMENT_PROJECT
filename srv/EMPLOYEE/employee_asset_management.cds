using {ASM as db} from '/home/user/projects/Asset-Management/db/schema.cds';

service EmployeeService {
  @Capabilities.Readable: false
 entity AllRequest as projection on db.T.ALLREQUESTS;
 @Capabilities.Readable: false
 entity AllAsset as projection on db.T.Asset;

 
  //entity cate as projection on db.M.ASSETCATGORY;
  
  entity subcat as projection on db.M.Assetsubcategory;
  
  action CreateRequest (
    CATID : String(20),
    ASTID : String(20),
    PRITY : String(20)
  ) returns String;
   

    function getRequestsByUserId(USERID: String) returns array of AllRequest;
    function getAssetByAssetId(ASSTID: String) returns array of AllAsset;
}