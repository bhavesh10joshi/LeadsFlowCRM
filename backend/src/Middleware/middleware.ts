import jwt from "jsonwebtoken";
import { ClientErrorStatusCodes } from "../StatusCodes/StatusCodes";
import { UserModel } from "../DB/db";

export function Middleware(req:any, res:any, next:any)
{
    const authHeader:string = req.headers["authorization"];

    if(!authHeader)
    {
        res.status(ClientErrorStatusCodes.Unathorized).json({
            msg : "No token provided"
        });
        return;
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try{
        const check:any = jwt.verify(token, process.env.JWT_SECRET as string);

        if(check)
        {
            req.UserId = check.id;
            req.UserRole = check.role;
            next();
        }
        else
        {
            res.status(ClientErrorStatusCodes.Unathorized).json({
                msg : "Invalid token"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ClientErrorStatusCodes.Unathorized).json({
            msg : "Token verification failed"
        });
        return;
    }
}

export function AdminOnly(req:any, res:any, next:any)
{
    if(req.UserRole !== "admin")
    {
        res.status(ClientErrorStatusCodes.Forbidden).json({
            msg : "Admin access required"
        });
        return;
    }
    next();
}
