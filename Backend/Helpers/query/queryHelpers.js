export const searchHelper = (searchKey, query, req) => {
  if (req.query.search) {
    const searchObject = {};

    const regex = new RegExp(req.query.search, "i");

    searchObject[searchKey] = regex;

    query = query.where(searchObject);

    return query;
  }

  return query;
};

export const paginateHelper = async (model, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * pageSize;

  const regex = new RegExp(req.query.search, "i");

  const total = await model.countDocuments({ title: regex });

  const pages = Math.ceil(total / pageSize);

  query = query.skip(skip).limit(pageSize);

  return {
    query: query,
    page: page,
    pages: pages,
  };
};

export const queryHelper = {
  searchHelper,
  paginateHelper,
};
export default queryHelper;
