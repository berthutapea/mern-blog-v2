export const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  );
};

export const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const access_token = authorization.split(" ")[1];

  return access_token;
};

export const sendToken = (user, statusCode, res) => {
  const token = user.generateJwtFromUser();

  return res.status(statusCode).json({
    success: true,
    token,
  });
};

const tokenHelper = {
  sendToken,
  isTokenIncluded,
  getAccessTokenFromHeader,
};

export default tokenHelper;
