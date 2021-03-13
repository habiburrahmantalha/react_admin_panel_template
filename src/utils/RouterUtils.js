export const apiLogin = "/auth/login";
export const routeHome = "/home";

export const getRouteList = (title) => `/${title}/list`;
export const getApiList = (title, filter) => `/${title}/index?${filter}`;

export const getRouteDetailsPath = (title) => `/${title}/:id`;
export const getRouteDetails = (title, id) => `/${title}/${id}`;
export const getApiDetails = (title, id) => `/${title}/${id}`;

export const getRouteCreate = (title) => `/${title}/create`;
export const getApiCreate = (title) => `/${title}/store`;

export const getRouteUpdatePath = (title) => `/${title}/update/:id`;
export const getRouteUpdate = (title, id) => `/${title}/update/${id}`;
export const getApiUpdate = (title, id) => `/${title}/update/${id}`;

export const getApiListExport = (title, filter) => `/${title}/export?${filter}`;

/*_add_from_here*/