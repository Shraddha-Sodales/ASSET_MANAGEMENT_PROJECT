using {ASM as db} from '/home/user/projects/Asset-Management/db/schema.cds';

service ManagerService {
  entity AllRequest as projection on db.T.ALLREQUESTS;
  entity AllAsset as projection on db.T.Asset;
  
@Capabilities.Readable: false
  entity cate as projection on db.M.ASSETCATGORY;
  @Capabilities.Readable: false
  entity subcat as projection on db.M.Assetsubcategory;
  
    action ApproveRequest(
    REQID : String,
    STATUS : Integer
    ) returns String;

    action AssignAsset(
    REQID : String, 
    ASTID : String
    ) returns String;

    action insertAsset (
    P_ASTID    : String,
    P_ASTNAME  : String,
    P_CATID    : String,
    P_SUBCATID : String,
    P_QTY      : Integer


    
);


function getAllRequestsCount() returns Integer;


function getPendingRequestsCount() returns Integer;

function getAvailableAssetsByCategory()
  returns array of {
    CATEGORY : String;
    COUNT    : Integer;
  };



function getAssetAllocationSummary()
  returns {
    AVAILABLE : Integer;
    ASSIGNED  : Integer;
  };



function getTotalAssets() returns Integer;

function getAvailableAssets() returns Integer;

function getPendingRequests() returns Integer;

function getAssetsInMaintenance() returns Integer;





}