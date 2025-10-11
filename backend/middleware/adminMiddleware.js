/*
  Exports:
    - authorize(role)  -> middleware factory, e.g. authorize('admin')
    - isAdmin          -> shortcut for authorize('admin')
  Assumes authMiddleware.protect sets req.user
*/
function authorize(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // Accept any of these admin indicators
    if (role === 'admin') {
      if (req.user.isAdmin === true || req.user.role === 'admin' || (Array.isArray(req.user.roles) && req.user.roles.includes('admin'))) {
        return next();
      }
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    // Generic role check
    if (req.user.role && req.user.role === role) {
      return next();
    }
    if (Array.isArray(req.user.roles) && req.user.roles.includes(role)) {
      return next();
    }

    return res.status(403).json({ success: false, message: 'Forbidden' });
  };
}

const isAdmin = authorize('admin');

module.exports = { authorize, isAdmin };