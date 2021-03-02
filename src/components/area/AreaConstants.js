import FilterInputItems from "../shared/Filter/FilterInputItems";
import {tableContentType} from "../shared/table/table_utils";

export const areaQueryFilterParams = () => areaFilterParams.reduce((acm, cur) => [...acm, cur.name], []);

export const areaFilterParams = [
  FilterInputItems.id,
  FilterInputItems.title,
  FilterInputItems.region_id,
];

export const areaListAttributes = [
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
    title: 'Agency',
    field: 'agency_title',
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

export const areaDetailsAttributes = [
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
    title: 'Agency',
    field: 'agency_title',
    type: tableContentType.TEXT,
  },
  {
    title: 'Region ID',
    field: 'region_id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Agency ID',
    field: 'agency_id',
    type: tableContentType.TEXT,
  },
  {
    title: 'Created At',
    field: 'created_at',
    type: tableContentType.DATE_TIME,
  },
];

