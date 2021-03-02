import moment from 'moment';
import ListUtils from "./ListUtils";

export const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
    },
};

export const prepareInput = ({ name, label, placeholder, rules, options, value, prefixIcon, type}) => {
    return {
        name: name,
        label: label,
        placeholder: placeholder,
        rules: rules,
        options: options,
        value: value,
        prefixIcon: prefixIcon
    };
};

export const prepareUrlWithFilter = (search, listSearchModalParams) => {
    let page = ListUtils.currentPage(search) ?? 1;
    let limit = ListUtils.currentLimit(search) ?? 10;

    let filters = new URLSearchParams(search);

    const newFilters = new URLSearchParams("?");
    listSearchModalParams.forEach(e => {
        if(filters.has(e.name)){
            console.log(e.name, filters.get(e.name))
            newFilters.set(e.name,filters.get(e.name) )
        }
    })

    return `skip=${limit * (page -1)}&limit=${limit}&${newFilters}`;
}

export default{

    prepareDropdownOptions(list) {
        return list.map(e => ({
          key: e.id,
          text: e.title,
          value: e.id
        }));
      },
    prepareDropdownOptionsName(list) {
        return list.map(e => ({
            key: e.id,
            text: e.name,
            value: e.id
        }));
    },
    // e.town === null || e.town.title === null ? "": e.town.title + ", Territory: "+
    // e.territory === null || e.territory.title === null ? "":e.territory.title,
    prepareDropdownOptionsTerritory(list) {
        return list.map(e => ({
            key: e.id,
            text: e.title === null ? "" : e.title + (e.area && e.area.title ? ", Area: "+ e.area.title : ""),
            value: e.id
        }));
    },
    prepareDropdownOptionsThana(list) {
        return list.map(e => ({
            key: e.id,
            text: e.title === null ? "" : e.title + (e.town && e.town.title ? ", Town: "+ e.town.title : ""),
            value: e.id
        }));
    },
      // showToast(title, description){
      //   return toast({
      //       type: "success",
      //       icon: "envelope",
      //       title: title,
      //       description: description,
      //       time: 800
      //   })
      // },
    formatNumber (num) {
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },

    getDefaultDateRange(from, to){
        let now = new Date();
        const currentTime = moment(
            new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                23,
                59,
                0,
                0
            )
        );
        return {
            from: from ? from: moment(currentTime).subtract(30, "days")
                //.utc()
                .format("YYYY-MM-DDTHH:mm:ss") + "Z",
            to: to ? to: moment(currentTime)
                //.utc()
                .format("YYYY-MM-DDTHH:mm:ss") + "Z",
        };
    },

    getDateRangeDuration(from, to){
        let start = moment(to, 'YYYY-MM-DDTHH:mm:ssZ');
        let end = moment(from, 'YYYY-MM-DDTHH:mm:ssZ');
        return  start.diff(end, 'days');
    },
    getYear(time){
        return time.split('-')[1];
    },
    getNumber(x) {
        return isNaN(x) ? 0: x;
    }
}