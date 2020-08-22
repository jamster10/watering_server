const DEVICES = [
  'mac address'
]

const authenticator = (req, res, next) => {
  const { deviceId } = req.body;

  if (DEVICES.includes(deviceId)) {
    next()
  }
  next({E})
}
  
module.exports = authenticator;