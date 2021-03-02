import FilterInputTypes from "./FilterInputTypes";

export default {
  name: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "name",
    required: false,
    label: `Name`,
    placeholder: `Enter name`,
  },
  user_id: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "user_id",
    required: false,
    label: `Email`,
    placeholder: `Enter email`,
  },
  region_id: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "region_id",
    required: false,
    label: `Region`,
    placeholder: `Select region`,
  },
  area_id: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "area_id",
    required: false,
    label: `Area`,
    placeholder: `Select area`,
  },
  town_id: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "town_id",
    required: false,
    label: `Town`,
    placeholder: `Select town`,
  },
  id: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "id",
    required: false,
    label: `ID`,
    placeholder: `Enter id`,
  },
  title: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "title",
    required: false,
    label: `Title`,
    placeholder: `Enter title`,
  },
  email: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "email",
    required: false,
    label: `Email`,
    placeholder: `Enter email`,
  },
  line_manager: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "line_manager",
    required: false,
    label: `Line Manager Email`,
    placeholder: `Enter Line Manager's email`,
  },
  mobile: {
    type: FilterInputTypes.TEXT_INPUT,
    name: "mobile",
    required: false,
    label: `Mobile`,
    placeholder: `Enter mobile`,
  },

  designation: {
    type: FilterInputTypes.SELECT_INPUT,
    name: "designation_id",
    required: false,
    label: `Function`,
    placeholder: `Select function App`,
    options:[
      {
        value: 11,
        title: "Workplace Services",
      },
      {
        value: 10,
        title: "Supply Chain",
      },
      {
        value: 9,
        title: "Research/Development",
      },
      {
        value: 8,
        title: "Marketing",
      },
      {
        value: 7,
        title: "Legal",
      },
      {
        value: 6,
        title: "Information Technology",
      },
      {
        value: 5,
        title: "Human Resources",
      },
      {
        value: 4,
        title: "General Management",
      },
      {
        value: 3,
        title: "Finance",
      },
      {
        value: 2,
        title: "Customer Development",
      },
      {
        value: 1,
        title: "Communications",
      }
    ]
  },
  type_id: {
    type: FilterInputTypes.SELECT_INPUT,
    name: "type_id",
    required: false,
    label: `Observation Type`,
    placeholder: `Select Observation Type`,
    options: [
      {
        value: 4,
        title: "Unsafe Condition",
      },
      {
        value: 3,
        title: "NEAR MISS",
      
      },
      {
        value: 2,
        title: "UNSAFE OBSERVATION",
      
      },
      {
        value: 1,
        title: "SAFE OBSERVATION",
      
      }
    ],
  },
  title_id: {
    type: FilterInputTypes.SELECT_INPUT,
    name: "title_id",
    required: false,
    label: `Title`,
    placeholder: `Select Title`,
    options: [
      {
        value: 6,
        title: "Procedures",
      },
      {
        value: 5,
        title: "Work Environment",
      },
      {
        value: 4,
        title: "Tools & Equipment",
      },
      {
        value: 3,
        title: "Personal Protective Equipment",
      },
      {
        value: 2,
        title: "Body Position",
      },
      {
        value: 1,
        title: "Peoples Initial reaction",
      }
    ],
  },

};