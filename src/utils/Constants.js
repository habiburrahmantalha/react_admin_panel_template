export const BASEURL = process.env.REACT_APP_BASE_URL;
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const statusList = [ 'Disabled', 'Enabled'];
export const statusDropdownOptions = statusList.map((e,i) => ({key: e, text: e, value: i}));
export const getStatusTitle = (i) => statusList[i];

export const SKIP = 10;
export const LIMIT = 10;

export const MenuNames = {
    home: { lower: "home", upper: "Home"},
    region: { lower: "region", upper: "Region"},
    area: { lower: "area", upper: "Area"},
    town: { lower: "town", upper: "Town"},
    user: { lower: "user", upper: "User"},
    user_group: { lower: "user_group", upper: "UserGroup"},
}

export const APP_NAME="Template"