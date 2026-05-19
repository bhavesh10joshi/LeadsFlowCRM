import { z } from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../../DB/db";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { ServerErrors, ClientErrorStatusCodes, SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { RegisterObject, LoginObject } from "../../Validations/ZodValidations";
import { Middleware } from "../../Middleware/middleware";

const UserRouter = Router();

type RegisterInput = z.infer<typeof RegisterObject>;

UserRouter.post("/Register", async function(req:any, res:any)
{
    const zodSafeObject:any = RegisterObject.safeParse(req.body);

    if(!zodSafeObject.success)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "Validation failed",
            errors : zodSafeObject.error.errors
        });
        return;
    }

    const RegisterData: RegisterInput = zodSafeObject.data;

    try{
        const existingUser = await UserModel.findOne({ email: RegisterData.email });

        if(existingUser)
        {
            res.status(ClientErrorStatusCodes.Conflicts).json({
                msg : "User with this email already exists"
            });
            return;
        }

        const HashedPassword = await bcrypt.hash(RegisterData.password, 10);

        if(HashedPassword)
        {
            try
            {
                const newUser = await UserModel.create({
                    name : RegisterData.name,
                    email : RegisterData.email,
                    password : HashedPassword,
                    role : RegisterData.role || "sales"
                });

                const token = jwt.sign({
                    id : newUser._id,
                    role : newUser.role
                }, process.env.JWT_SECRET as string);

                res.status(SuccessStatusCodes.ResourceCreated).json({
                    token : token,
                    user : {
                        id : newUser._id,
                        name : newUser.name,
                        email : newUser.email,
                        role : newUser.role
                    }
                });
                return;
            }
            catch(e)
            {
                console.log(e);
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Occurred"
                });
                return;
            }
        }
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred"
            });
            return;
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred"
        });
        return;
    }
});

UserRouter.post("/Login", async function(req:any, res:any)
{
    const zodSafeObject:any = LoginObject.safeParse(req.body);

    if(!zodSafeObject.success)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "Validation failed",
            errors : zodSafeObject.error.errors
        });
        return;
    }

    const email: string = zodSafeObject.data.email;
    const password: string = zodSafeObject.data.password;

    try{
        const FindUser = await UserModel.findOne({
            email : email
        });
        if(FindUser)
        {
            try{
                const Check = await bcrypt.compare(password, FindUser.password);
                if(Check)
                {
                    const token = jwt.sign({
                        id : FindUser._id,
                        role : FindUser.role
                    }, process.env.JWT_SECRET as string);
                    res.status(SuccessStatusCodes.Success).json({
                        token : token,
                        user : {
                            id : FindUser._id,
                            name : FindUser.name,
                            email : FindUser.email,
                            role : FindUser.role
                        }
                    });
                    return;
                }
                else
                {
                    res.status(ClientErrorStatusCodes.Unathorized).json({
                        msg : "Incorrect password"
                    });
                    return;
                }
            }
            catch(e)
            {
                console.log(e);
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Occurred"
                });
                return;
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Account doesn't exist"
            });
            return;
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred"
        });
        return;
    }
});

UserRouter.get("/Me", Middleware, async function(req:any, res:any)
{
    try{
        const user = await UserModel.findById(req.UserId).select("-password");
        if(user)
        {
            res.status(SuccessStatusCodes.Success).json({
                user : {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    role : user.role
                }
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "User not found"
            });
            return;
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred"
        });
        return;
    }
});

export default UserRouter;
