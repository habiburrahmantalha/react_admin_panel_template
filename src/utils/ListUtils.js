import queryString from "query-string";
import moment from "moment";
import {LIMIT, SKIP} from "./Constants";

export default {
    // prepare page and filters form action
    prepareActionParams(activePage, filters) {
        return {
            pager: {
                skip: (activePage - 1) * SKIP,
                limit: LIMIT,
            },
            filters,
        };
    },

    // returns filter parameters with values
    prepareFilterParams(filters) {
        return filters ? Object.keys(filters)
            .filter(key => { return filters[key] !== null && filters[key] !== undefined && filters[key] !== "" })
            .reduce((obj, key) => {
                obj[key] = filters[key];
                return obj;
            }, {}) : null;
    },

     // returns filter parameters with values
     prepareFilterParamsWithDate(filters, between) {
        let current = new Date();
        let now = moment(new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), 0, 0));
        
         if(moment(between.from).isSame(moment(between.to)) && moment(between.from).diff(moment(now),"minute") === 0) {
            delete filters['from'];
            delete filters['to'];
         } else {
            if(between.from !== "" && between.to !== "") {
                filters['from'] = between.from;
                filters['to'] = between.to;
            }
         }
        return filters;
    },

    // prepare frontend url for filters
    prepareFilterUrl(filters) {
        return filters ? Object.keys(filters).reduce((accumulator, current) => {
            return accumulator + `&${current}=${filters[current]}`
        }, "") : "";
    },

    // prepare frontend url for page
    preparePageUrl(page) {
        return page ? `page=${page}` : "";
    },

    // prepare route
    prepareUrl(basePath, page, filters) {
        return `${basePath}?${this.preparePageUrl(page)}${this.prepareFilterUrl(filters)}`;
    },
    // returns filters object from props
    currentFilters(search, queryFilterParams) {
        const parsedQuery = queryString.parse(search);
        const queryParams = Object.keys(parsedQuery)
            .filter((queryString => queryString !== "page" || queryString !== "limit"))
            .reduce((obj, key) => {
                if(parsedQuery[key] === "false") {
                    obj[key] = false;
                } else if(parsedQuery[key] === "true") {
                    obj[key] = true;
                } else {
                    obj[key] = parsedQuery[key];
                }
                return obj;
            }, {});

        queryFilterParams.forEach(q => {
            if(!Object.keys(parsedQuery).includes(q)) {
                //queryParams[q] = null;
                delete  queryParams[q];
            }
        });
        return queryParams;
    },
    currentDates(search){
        const parsedQuery = queryString.parse(search);
        if(parsedQuery['startDate'] != null && parsedQuery['endDate'] != null) {
            return {between: {startDate: parsedQuery['startDate'], endDate: parsedQuery['endDate']}}
        } else 
            return null;
    },

    // return page number from props
    currentPage(search) {
        return queryString.parse(search).page ? queryString.parse(search).page : 1;
    },
    currentLimit(search) {
        return queryString.parse(search).limit
            ? queryString.parse(search).limit
            : 10;
    },

    // return total page from props data
    totalPage(meta) {
        return meta ? Math.ceil(meta.total / SKIP) : 0;
    },

    // return total count from props data
    totalCount(meta) {
        return meta ? meta.total : 0;
    },

    // form param for the search modal
    searchModalFormParams(search, userListSearchModalParams) {
        const currentFilter = this.currentFilters(search, userListSearchModalParams);
        return userListSearchModalParams.map((el) => {
            el.value = currentFilter[el.key];
            return el;
        })
    },

    // parse Metric data
    parseMetricData(data) {
        if(!!data) {
            data = data.length > 0 ? data[0] : data;
            let val = Object.values(data);
            data = val.length > 0 ? val[0] : [];
            return data.map(d => ({id: moment.unix(d[0]).utc(), count: parseInt(d[1])}))
        }
        return []
    },
}