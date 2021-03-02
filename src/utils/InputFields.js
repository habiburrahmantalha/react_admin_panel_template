import {prepareInput} from "./Utils";
import {FileTextOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

export const InputFields = {
    email: prepareInput({
        name: 'email',
        label:  'Email Address',
        placeholder: 'Email Address',
        rules:  [{ required: true, message: 'Please input your email!' }],
        prefixIcon: <UserOutlined className="site-form-item-icon" />
    }),
    name: prepareInput({
        name: 'name',
        label:  'Name',
        placeholder: 'Name',
        rules:  [{ required: true, message: 'Please input your name!' }],
        prefixIcon: <UserOutlined className="site-form-item-icon" />
    }),
    password: prepareInput({
        name: 'password',
        label: 'Password',
        rules: [{ required: true, message: 'Please input your Password!' }],
        placeholder: 'Enter Password',
        type: "password",
        prefixIcon: <LockOutlined className="site-form-item-icon" />}),
    title: {
        name: 'title',
        label:  'Title',
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    region_id: {
        name: 'region_id',
        label: 'Region',
        placeholder: 'Select region',
        rules:  [{ required: true, message: 'Please select region!' }],
        options: []
    },
    area_id: {
        name: 'area_id',
        label: 'Area',
        placeholder: 'Select area',
        rules:  [{ required: true, message: 'Please select area!' }],
        options: []
    },
    town_id: {
        name: 'town_id',
        label: 'Town',
        placeholder: 'Select town',
        rules:  [{ required: true, message: 'Please select town!' }],
        options: []
    },
    agency_id: {
        name: 'agency_id',
        label: 'Agency',
        placeholder: 'Select Agency',
        rules:  [{ required: true, message: 'Please select Agency!' }],
        options: []
    },
    role: {
        name: 'role',
        label: 'User type',
        placeholder: 'Select user type',
        rules:  [{ required: true, message: 'Please select User Type' }],
        options: []
    },

    app_type: {
        name: 'app_type',
        label:  'Application Type',
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    mobile: {
        name: 'mobile',
        label:  'Mobile Number',
        placeholder: '01...',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    name_father: {
        name: 'name_father',
        label:  "Father's Name",
        placeholder: 'Name',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    name_mother: {
        name: 'name_mother',
        label:  "Mother's Name",
        placeholder: 'Name',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    marital_status: {
        name: 'marital_status',
        label:  "Marital Status",
        placeholder: 'Select',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    dob: {
        name: 'dob',
        label:  "Date of Birth",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    gender: {
        name: 'gender',
        label:  "Gender",
        placeholder: 'Select',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    nid: {
        name: 'nid',
        label:  "National ID",
        placeholder: 'NID Number',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    religion: {
        name: 'religion',
        label:  "Religion",
        placeholder: 'Select',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    nationality: {
        name: 'nationality',
        label:  "Nationality",
        placeholder: 'e.g Bangladeshi',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    address_present: {
        name: 'address_present',
        label:  "Present Address",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    address_permanent: {
        name: 'address_permanent',
        label:  "Permanent Address",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    photo: {
        name: 'photo',
        label:  "Photograph",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    photo_nid: {
        name: 'photo_nid',
        label:  "National ID/Birth Certificate",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    wholesaler: {
        name: 'wholesaler',
        label:  "Is he a retailer/wholesaler?",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    dealership: {
        name: 'dealership',
        label:  "Is he a retailer/wholesaler?",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    name_company: {
        name: 'name_company',
        label:  "Company Name",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
    tenure: {
        name: 'tenure',
        label:  "Tenure",
        placeholder: 'Title',
        rules:  [{ required: true, message: 'Please input title!' }],
        prefixIcon: <FileTextOutlined />
    },
};

export const resetFields = () =>  {
    Object.keys(InputFields).forEach(function(key) {
        console.log(key);
        if(key === 'status' || key === 'verified'){

        }else if(InputFields[key].value) {
            InputFields[key].value = "";
        }
    });
};