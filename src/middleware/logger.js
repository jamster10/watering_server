//will need a table for storing last contact and query made
//willrun a job to check if no contact made in last x time, and ping phone

const logger = (req, res, next) => {
  const { deviceId } = req.body;
  const time = Date.now();
  
  console.log(deviceId, time)
  next()
}
  
module.exports = logger;