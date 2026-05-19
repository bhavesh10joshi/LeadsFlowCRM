import { LeadModel } from "../../DB/db";
import { ServerErrors, ClientErrorStatusCodes, SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { Middleware, AdminOnly } from "../../Middleware/middleware";
import { LeadObject, LeadUpdateObject } from "../../Validations/ZodValidations";
import { buildLeadFilter, buildSortOption, generateCSV } from "../../Helper/Helper";
import { Router } from "express";

const LeadRouter = Router();

const PAGE_SIZE = 10;

LeadRouter.get("/All", Middleware, async function(req:any, res:any)
{
    try{
        const page = parseInt(req.query.page as string) || 1;
        const skip = (page - 1) * PAGE_SIZE;
        const filter = buildLeadFilter(req.query);
        const sort = buildSortOption(req.query.sortBy, req.query.sortOrder);

        const [leads, total] = await Promise.all([
            LeadModel.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(PAGE_SIZE)
                .populate("createdBy", "name email"),
            LeadModel.countDocuments(filter)
        ]);

        res.status(SuccessStatusCodes.Success).json({
            leads : leads,
            pagination : {
                total : total,
                page : page,
                pages : Math.ceil(total / PAGE_SIZE),
                limit : PAGE_SIZE
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
});

LeadRouter.get("/Single/:id", Middleware, async function(req:any, res:any)
{
    try{
        const lead = await LeadModel.findById(req.params.id).populate("createdBy", "name email");
        if(lead)
        {
            res.status(SuccessStatusCodes.Success).json({
                lead : lead
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Lead not found"
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

LeadRouter.post("/New", Middleware, async function(req:any, res:any)
{
    const zodSafeObject:any = LeadObject.safeParse(req.body);

    if(!zodSafeObject.success)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "Validation failed",
            errors : zodSafeObject.error.errors
        });
        return;
    }

    try{
        const newLead = await LeadModel.create({
            ...zodSafeObject.data,
            createdBy : req.UserId
        });

        if(newLead)
        {
            res.status(SuccessStatusCodes.ResourceCreated).json({
                lead : newLead
            });
            return;
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

LeadRouter.put("/Update/:id", Middleware, async function(req:any, res:any)
{
    const zodSafeObject:any = LeadUpdateObject.safeParse(req.body);

    if(!zodSafeObject.success)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "Validation failed",
            errors : zodSafeObject.error.errors
        });
        return;
    }

    try{
        const updatedLead = await LeadModel.findByIdAndUpdate(
            req.params.id,
            zodSafeObject.data,
            { new: true }
        );

        if(updatedLead)
        {
            res.status(SuccessStatusCodes.Success).json({
                lead : updatedLead
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Lead not found"
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

LeadRouter.delete("/Delete/:id", Middleware, AdminOnly, async function(req:any, res:any)
{
    try{
        const deletedLead = await LeadModel.findByIdAndDelete(req.params.id);

        if(deletedLead)
        {
            res.status(SuccessStatusCodes.Success).json({
                msg : "Lead deleted successfully"
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Lead not found"
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

LeadRouter.get("/Export/CSV", Middleware, async function(req:any, res:any)
{
    try{
        const filter = buildLeadFilter(req.query);
        const sort = buildSortOption(req.query.sortBy, req.query.sortOrder);

        const leads = await LeadModel.find(filter).sort(sort);

        const csv = generateCSV(leads);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=leads-export.csv");
        res.status(SuccessStatusCodes.Success).send(csv);
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
});

export default LeadRouter;
