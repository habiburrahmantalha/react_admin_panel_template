import FilterInputItems from "../shared/Filter/FilterInputItems";
import {tableContentType} from "../shared/table/table_utils";

export const userQueryFilterParams = () => userFilterParams.reduce((acm, cur) => [...acm, cur.name], []);

export const userFilterParams = [
  FilterInputItems.id,
  FilterInputItems.title,
  FilterInputItems.id,
];

export const userListAttributes = [
  {
    title: 'ID',
    field: 'id',
    type: tableContentType.ID,
  },
  {
    title: 'Name',
    field: 'name',
    type: tableContentType.TEXT,
  },
  {
    title: 'Email',
    field: 'email',
    type: tableContentType.TEXT,
  },
  {
    title: 'User Group',
    field: 'user_group_title',
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
    title: 'Town',
    field: 'town_title',
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

export const userDetailsAttributes = [
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
    title: 'Email',
    field: 'email',
    type: tableContentType.TEXT,
  },
  {
    title: 'User Group',
    field: 'user_group_title',
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
    title: 'Town',
    field: 'town_title',
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
];

