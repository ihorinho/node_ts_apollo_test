import jwt from 'jsonwebtoken';

interface TokenMetadata {
    isAuth: boolean
    userId?: string,
    userEmail?: string
}
export const doAuth = async (bearer?: string) => {
    let result: TokenMetadata = {isAuth: false};

    if (!bearer) {
        return result;
    }

    const token = bearer.split(' ')[1];
    try {
        let decoded = await jwt.verify(token, 'mysecretkey') as TokenMetadata;
        result.isAuth = true;
        result.userId = decoded.userId;
        result.userEmail = decoded.userEmail;
    } catch(err) {
        console.log(err);
    }

    return result;
}