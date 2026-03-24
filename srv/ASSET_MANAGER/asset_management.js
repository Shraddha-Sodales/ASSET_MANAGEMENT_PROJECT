module.exports = (srv) => {

  srv.before('READ', 'AllRequest', (req) => {
    
    req.query.where({ STAT: 0 });
  });
  
  srv.on('AssignAsset', async (req) => {

  const userId = Number(req.user.id )|| 2001;

  const { REQID, ASTID } = req.data;

  await cds.run(
    `CALL assign_asset(?, ?, ?)`,
    [String(REQID),
         String(ASTID),
          userId]
  );

  return 'Asset Assigned';
});

  srv.on('ApproveRequest', async (req) => {

  const userId = Number(req.user?.id) || 2001;

  const { REQID, STATUS } = req.data;

  await cds.run(
    `CALL asset_approve_request(?, ?, ?)`,
    [
      String(REQID),
      String(STATUS),
      userId
    ]
  );

  return 'Request Updated';
});


srv.on('insertAsset', async (req) => {

  const userId = Number(req.user?.id) || 2001;

  const {
    P_ASTID,
    P_ASTNAME,
    P_CATID,
    P_SUBCATID,
    P_QTY
  } = req.data;

  await cds.run(
    `CALL insert_asset(?, ?, ?, ?, ?, ?)`,
    [
      String(P_ASTID),
      P_ASTNAME,
      String(P_CATID),
      String(P_SUBCATID),
      String(P_QTY),
      userId
    ]
  );

  return 'Asset Inserted';
});

};