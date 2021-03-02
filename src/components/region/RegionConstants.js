import FilterInputItems from "../shared/Filter/FilterInputItems";
import {tableContentType} from "../shared/table/table_utils";

export const regionQueryFilterParams = () => regionFilterParams.reduce((acm, cur) => [...acm, cur.name], []);

export const regionFilterParams = [
  FilterInputItems.id,
  FilterInputItems.title,
];

export const regionListAttributes = [
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

export const regionDetailsAttributes = [
  {
    title: 'ID',
    field: 'id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Title',
    field: 'title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Created At',
    field: 'created_at',
    type: tableContentType.DATE_TIME,
  },
];

