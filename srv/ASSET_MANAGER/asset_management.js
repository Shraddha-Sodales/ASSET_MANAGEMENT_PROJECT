module.exports = (srv) => {

  srv.before('READ', 'AllRequest', (req) => {
    req.query.where({ STAT: 0 });
  });





  srv.on('AssignAsset', async (req) => {
    try {
      const userId = Number(req.user.id) || 2001;
      const { REQID, ASTID } = req.data;

      await cds.run(
        `CALL assign_asset(?, ?, ?)`,
        [
          String(REQID),
          String(ASTID),
          userId
        ]
      );

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Asset ${ASTID} assigned for Request ${REQID}`,
          CREATEDAT: new Date()
        })
      );

      return 'Asset Assigned';

    } catch (error) {

      // Error Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_ERRLOG').entries({
          ERRMS: error.message,
          ERRST: error.stack,
          STCOD: 500,
          ISDEL: 0,
          CRTDT: new Date(),
          CRTTM: new Date(),
          CRTBY: req.user?.id || 'SYSTEM'
        })
      );

      return req.error(500, 'Failed to assign asset');
    }
  });





  srv.on('ApproveRequest', async (req) => {
    try {
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

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Request ${REQID} updated with status ${STATUS}`,
          CREATEDAT: new Date()
        })
      );

      return 'Request Updated';

    } catch (error) {

      // Error Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_ERRLOG').entries({
          ERRMS: error.message,
          ERRST: error.stack,
          STCOD: 500,
          ISDEL: 0,
          CRTDT: new Date(),
          CRTTM: new Date(),
          CRTBY: req.user?.id || 'SYSTEM'
        })
      );

      return req.error(500, 'Failed to update request');
    }
  });





  srv.on('insertAsset', async (req) => {
    try {
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

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Asset ${P_ASTID} inserted successfully`,
          CREATEDAT: new Date()
        })
      );

      return 'Asset Inserted';

    } catch (error) {

      // Error Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_ERRLOG').entries({
          ERRMS: error.message,
          ERRST: error.stack,
          STCOD: 500,
          ISDEL: 0,
          CRTDT: new Date(),
          CRTTM: new Date(),
          CRTBY: req.user?.id || 'SYSTEM'
        })
      );

      return req.error(500, 'Failed to insert asset');
    }
  });





  srv.on('getAllRequestsCount', async (req) => {
  try {
    const result = await SELECT
      .from('ManagerService.AllRequest')
      .columns`count(*) as TOTAL`;

    await srv.tx(req).run(
      INSERT.into('ASM_T_AUDIT').entries({
        ID: req.id,
        STATUS: 'SUCCESS',
        MESSAGE: `Fetched total requests count: ${result[0].TOTAL}`,
        CREATEDAT: new Date()
      })
    );

    return result[0].TOTAL;

  } catch (error) {
    await logError(srv, req, error);
    return req.error(500, 'Failed to fetch total requests count');
  }
});





srv.on('getPendingRequestsCount', async (req) => {
  try {
    const result = await SELECT
      .from('ManagerService.AllRequest')
      .where({ STAT: 0 })
      .columns`count(*) as TOTAL`;

    await audit(srv, req, `Fetched pending requests count: ${result[0].TOTAL}`);
    return result[0].TOTAL;

  } catch (error) {
    await logError(srv, req, error);
    return req.error(500, 'Failed to fetch pending requests count');
  }
});



srv.on('getAvailableAssetsByCategory', async (req) => {
  try {
    const result = await SELECT
      .from('ManagerService.AllAsset')
      .columns(
        { ref: ['CATID'], as: 'CATEGORY' },
        { func: 'sum', args: [{ ref: ['AVAILABLE_QTY'] }], as: 'COUNT' }
      )
      .groupBy('CATID');

    await audit(srv, req, 'Fetched available assets by category');
    return result;

  } catch (error) {
    await logError(srv, req, error);
    return req.error(500, 'Failed to fetch assets by category');
  }
});



srv.on('getAssetAllocationSummary', async (req) => {
  try {
    const available = await SELECT
      .from('ManagerService.AllAsset')
      .columns`sum(AVAILABLE_QTY) as TOTAL`;

    const assigned = await SELECT
      .from('ManagerService.AllAsset')
      .columns`sum(ASSIGNED_QTY) as TOTAL`;

    const result = {
      AVAILABLE: available[0].TOTAL || 0,
      ASSIGNED: assigned[0].TOTAL || 0
    };

    await audit(srv, req, 'Fetched asset allocation summary');
    return result;

  } catch (error) {
    await logError(srv, req, error);
    return req.error(500, 'Failed to fetch asset allocation summary');
  }
});




srv.on('getTotalAssets', async () => {
  const result = await SELECT
    .from('ManagerService.AllAsset')
    .columns`count(ASTID) as TOTAL`;

  return result[0].TOTAL;
});


srv.on('getAvailableAssets', async () => {
  const result = await SELECT
    .from('ManagerService.AllAsset')
    .where({ ASTST: 'AVAILABLE' })
    .columns`count(ASTID) as TOTAL`;

  return result[0].TOTAL;
});




srv.on('getPendingRequests', async () => {
  const result = await SELECT
    .from('ManagerService.AllRequest')
    .where({ STAT: 0 })
    .columns`count(REQID) as TOTAL`;

  return result[0].TOTAL;
});


srv.on('getAssetsInMaintenance', async () => {
  const result = await SELECT
    .from('ManagerService.AllAsset')
    .where({ ASTST: 'MAINTENANCE' })
    .columns`count(ASTID) as TOTAL`;

  return result[0].TOTAL;
});


 


}; 