export const buildLeadFilter = (query: any) => {
    const filter: any = {};

    if(query.status)
    {
        filter.status = query.status;
    }

    if(query.source)
    {
        filter.source = query.source;
    }

    if(query.search)
    {
        const searchRegex = new RegExp(query.search, "i");
        filter.$or = [
            { name: searchRegex },
            { email: searchRegex }
        ];
    }

    return filter;
};

export const buildSortOption = (sortBy: string | undefined, sortOrder: string | undefined) => {
    const sort: any = {};
    const field = sortBy || "createdAt";
    const order = sortOrder === "asc" ? 1 : -1;
    sort[field] = order;
    return sort;
};

export const generateCSV = (leads: any[]) => {
    const headers = ["Name", "Email", "Status", "Source", "Company", "Phone", "Notes", "Created At"];
    const rows = leads.map((lead) => {
        return [
            lead.name,
            lead.email,
            lead.status,
            lead.source,
            lead.company || "",
            lead.phone || "",
            (lead.notes || "").replace(/,/g, ";").replace(/\n/g, " "),
            new Date(lead.createdAt).toISOString()
        ].map((field) => `"${field}"`).join(",");
    });
    return [headers.join(","), ...rows].join("\n");
};
