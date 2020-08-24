const { mac_address } = require('../config')

const DEVICES = [
  mac_address
];

const authenticator = (req, res, next) => {
  const token = req.get('authorization') || '';
  let deviceId = "";

  if (!token.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'unknown device' });
  }
  deviceId = token.split(' ')[1];

  if (!DEVICES.includes(deviceId)) {
    return res.status(401).json({ error: 'unknown device' });
  }
  req.deviceId = deviceId
  next()
}

module.exports = authenticator;
