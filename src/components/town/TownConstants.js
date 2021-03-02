import FilterInputItems from "../shared/Filter/FilterInputItems";
import {tableContentType} from "../shared/table/table_utils";

export const townQueryFilterParams = () => townFilterParams.reduce((acm, cur) => [...acm, cur.name], []);

export const townFilterParams = [
  FilterInputItems.id,
  FilterInputItems.title,
  FilterInputItems.region_id,
  FilterInputItems.area_id,
];

export const townListAttributes = [
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
    title: 'Region',
    field: 'region_title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Area',
    field: 'area_title',
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

export const townDetailsAttributes = [
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
    title: 'Region',
    field: 'region_title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Area',
    field: 'area_title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Region ID',
    field: 'region_id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Area ID',
    field: 'area_id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Created At',
    field: 'created_at',
    type: tableContentType.DATE_TIME,
  },
];

