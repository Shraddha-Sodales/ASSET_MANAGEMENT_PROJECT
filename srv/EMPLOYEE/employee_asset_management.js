
module.exports = (srv) => {

  srv.on('CreateRequest', async (req) => {
    try {
      const userId = req.user?.id || 'EMP-1001';
      const { CATID, ASTID, PRITY } = req.data;

      await cds.run(
        'CALL create_request(?, ?, ?, ?)',
        [
          userId,
          String(CATID),
          String(ASTID),
          String(PRITY)
        ]
      );

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Request created by User ${userId}`,
          CREATEDAT: new Date()
        })
      );

      return 'Request Created';

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

      return req.error(500, 'Failed to create request');
    }
  });

  srv.on('getRequestsByUserId', async (req) => {
    try {
      const { USERID } = req.data;

      const result = await SELECT.from('EmployeeService.AllRequest')
        .where({ USRID: USERID });

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Requests fetched for User ${USERID}`,
          CREATEDAT: new Date()
        })
      );

      return result;

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

      return req.error(500, 'Failed to fetch requests');
    }
  });

  srv.on('getAssetByAssetId', async (req) => {
    try {
      const { ASSTID } = req.data;

      const result = await SELECT.from('EmployeeService.AllAsset')
        .where({ ASTID: ASSTID });

      // Audit Log
      await srv.tx(req).run(
        INSERT.into('ASM_T_AUDIT').entries({
          ID: req.id,
          STATUS: 'SUCCESS',
          MESSAGE: `Asset details fetched for Asset ${ASSTID}`,
          CREATEDAT: new Date()
        })
      );

      return result;

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

      return req.error(500, 'Failed to fetch asset details');
    }
  });

};
