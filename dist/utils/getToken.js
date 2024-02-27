import jwt from 'jsonwebtoken';
export const getToken = async (bearer) => {
    let result = { isAuth: false };
    if (!bearer) {
        return result;
    }
    const token = bearer.split(' ')[1];
    try {
        let decoded = await jwt.verify(token, 'mysecretkey');
        result.isAuth = true;
        result.userId = decoded.userId;
        result.userEmail = decoded.userEmail;
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    return result;
};
