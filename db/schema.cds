namespace ASM;
context M{
@cds.persistence.exists 
@cds.persistence.calcview 
Entity ASSETCATGORY {
key     ACTID: String(30)  @title: 'ACTID: Unique ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        CNAME: String(100)  @title: 'CNAME: Category Name' ; 
        CDESC: String(255)  @title: 'CDESC: Category Description' ; 
        STAT: String(50)  @title: 'STAT: Status' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
}
@cds.persistence.exists 
@cds.persistence.calcview 
Entity Assetsubcategory {
key     ASCID: String(30)  @title: 'ASCID: Unique ID' ; 
        SCTID: String(30)  @title: 'SCTID:  SUB Category ID' ; 
        SCNAM: String(100)  @title: 'SCNAM: SUB Category Name' ; 
        CATID: String(30) @title: 'CATID: Category ID' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
        
}

    
}
context T{
    @cds.persistence.exists 
    Entity asset_requests {
key     ASRID: Integer64  @title: 'ASRID: Unique ID' ; 
        REQID: String(30)  @title: 'REQID: Request ID' ; 
        USRID: Integer  @title: 'USRID: User ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        ASTID: String(30)  @title: 'ASTID: Asset ID' ; 
        RDATE: Timestamp  @title: 'RDATE: Request Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
        PRITY: String(20)  @title: 'PRITY: Priority' ; 
        APBY: Integer  @title: 'APBY: Approved By' ; 
        APAT: Timestamp  @title: 'APAT: Approved At' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 

    }
    @cds.persistence.exists 
@cds.persistence.calcview 
Entity ALLREQUESTS {
key     ASRID: Integer64  @title: 'ASRID: Unique ID' ; 
        REQID: String(30)  @title: 'REQID: Request ID' ; 
        USRID: String(30)  @title: 'USRID: User ID' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        ASTID: String(30)  @title: 'ASTID: Asset ID' ; 
        RDATE: Timestamp  @title: 'RDATE: Request Date' ; 
        STAT: Integer  @title: 'STAT: Status' ; 
        PRITY: String(20)  @title: 'PRITY: Priority' ; 
        APBY: Integer  @title: 'APBY: Approved By' ; 
        APAT: Timestamp  @title: 'APAT: Approved At' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 
}
@cds.persistence.exists 
@cds.persistence.calcview 
Entity Asset {
key     ASTID: String(30)  @title: 'ASTID: Unique ID' ; 
        ASTNAME: String(100)  @title: 'ASTNAME: Asset Name' ; 
        CATID: String(30)  @title: 'CATID: Category ID' ; 
        SUBCATID: String(30)  @title: 'SUBCATID: Sub Category ID' ; 
        SERIALNO: String(50)  @title: 'SERIALNO: Serial Number' ; 
        ASTST: String(20)  @title: 'ASTST: Asset Status (AVAILABLE / ASSIGNED / MAINTENANCE)' ; 
        PURCHASEDATE: Date  @title: 'PURCHASEDATE: Purchase Date' ; 
        PRICE: Decimal(10)  @title: 'PRICE: Asset Price' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag' ; 
        CRTDT: Date  @title: 'CRTDT: Created Date' ; 
        CRTTM: Time  @title: 'CRTTM: Created Time' ; 
        CRTBY: String(30)  @title: 'CRTBY: Created By' ; 
        CHNDT: Date  @title: 'CHNDT: Changed/Updated Date' ; 
        CHNTM: Time  @title: 'CHNTM: Changed/Updated Time' ; 
        CHNBY: String(30)  @title: 'CHNBY: Changed By' ; 

        category    : Association to ASM.M.ASSETCATGORY on category.CATID = CATID;
        subcategory : Association to ASM.M.Assetsubcategory on  subcategory.SCTID = SUBCATID;



}
}
