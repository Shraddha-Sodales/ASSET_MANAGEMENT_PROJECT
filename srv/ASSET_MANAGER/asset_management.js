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

};