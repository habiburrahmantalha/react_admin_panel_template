import FilterInputItems from "../shared/Filter/FilterInputItems";
import {tableContentType} from "../shared/table/table_utils";
export const user_groupQueryFilterParams = () => user_groupFilterParams.reduce((acm, cur) => [...acm, cur.name], []);

export const user_groupFilterParams = [
  FilterInputItems.id,
  FilterInputItems.name,
  FilterInputItems.region_id,
  FilterInputItems.area_id,
];

export const user_groupListAttributes = [
  {
    title: 'ID',
    field: 'id',
    type: tableContentType.ID,
  },
  {
    title: 'Title',
    field: 'title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Status',
    field: 'status',
    type: tableContentType.STATUS,
  },
  {
    title: 'Created At',
    field: 'created_at',
    type: tableContentType.DATE_TIME,
  },
  {
    title: 'Action',
    field: 'action',
    type: tableContentType.ACTION,
  },
];

export const user_groupDetailsAttributes = [
  {
    title: 'ID',
    field: 'id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Name',
    field: 'name',
    type: tableContentType.TEXT,
  },
  {
    title: 'Status',
    field: 'status',
    type: tableContentType.STATUS,
  },
  {
    title: 'Created At',
    field: 'created_at',
    type: tableContentType.DATE_TIME,
  },
];

