using {ASM as db} from '/home/user/asset_management/db/schema.cds';

service ManagerService {
  entity AllRequest as projection on db.T.ALLREQUESTS;
  entity AllAsset as projection on db.T.Asset;
  
    action ApproveRequest(
    REQID : Integer,
    STATUS : Integer
    ) returns String;

    action AssignAsset(
    REQID : Integer, 
    ASTID : Integer
    ) returns String;

    action insertAsset (
  P_ASTID    : Integer,
  P_ASTNAME  : String,
  P_CATID    : Integer,
  P_SUBCATID : Integer,
  P_QTY      : Integer
);
}