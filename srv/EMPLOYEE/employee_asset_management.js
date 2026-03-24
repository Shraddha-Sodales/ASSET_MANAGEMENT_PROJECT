module.exports = (srv) => {

  srv.on('CreateRequest', async (req) => {

    const userId = parseInt(req.user.id) || 1001;

    const { CATID, ASTID, PRITY } = req.data;

    await cds.run(
      'CALL create_request(?, ?, ?, ?)',
      [userId, CATID, ASTID, PRITY]
    );

    return 'Request Created';
  });
    srv.on("getRequestsByUserId", async (req) => {

    const { USERID } = req.data;

    return await SELECT.from("EmployeeService.AllRequest")
      .where({ USRID: USERID });  

  });

};