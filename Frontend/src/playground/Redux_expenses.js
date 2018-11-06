import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// Action creator for Adding Expenses
const createExpenseAddAction = ({
  description = "",
  amount = 0,
  note = "",
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    amount,
    note,
    createdAt
  }
});

// Action for removing expenses
const createExpenseRemoveAction = ({ id }) => {
  return {
    type: "REMOVE_EXPENSE",
    id
  };
};

const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(singleExpense => {
        return singleExpense.id != action.id;
      });
    default:
      return state;
  }
};

//Reducer for handling filter object in state

const filterReducerDefaultState = {
  text: "",
  sortby: "date",
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SORTBYDATE":
      return {
        ...state,
        sortby: "date"
      };

    case "SORTBYAMOUNT":
      return {
        ...state,
        sortby: "amount"
      };

    case "STARTDATE":
      return {
        ...state,
        startDate: action.startDate
      };

    case "ENDDATE":
      return {
        ...state,
        endDate: action.endDate
      };
    case "SETTEXT":
      return {
        ...state,
        text: action.text
      };

    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

const getVisibleExpenses = (expenses, filters) => {
  return expenses
    .filter(singleExpense => {
      const startDate =
        typeof startDate !== "number" ||
        singleExpense.createdAt >= filters.startDate;
      const endDate =
        typeof startDate !== "number" ||
        singleExpense.createdAt <= filters.startDate;
      const text =
        filters.text === "" ||
        singleExpense.description.indexOf(filters.text) !== -1;

      return startDate && endDate && text;
    })
    .sort((a, b) => {
      if (a.sortby === "date") {
        if (a.createdAt < b.createdAt) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.amount < b.amount) {
          return 1;
        } else {
          return -1;
        }
      }
    });
};

store.subscribe(() => {
  const state = store.getState();
  getVisibleExpenses(state.expenses, state.filters);
  console.log(store.getState());
});

store.dispatch(sortByDate());
const expenseOne = store.dispatch(
  createExpenseAddAction({
    description: "This is an expense",
    note: "Hi there",
    amount: 25,
    createdAt: -10
  })
);

const expenseTwo = store.dispatch(
  createExpenseAddAction({
    description: "Ankit 2",
    note: "Hi",
    amount: 2
  })
);

// store.dispatch(createExpenseRemoveAction({ id: expenseOne.expense.id }));

// store.dispatch(sortByAmount());

// store.dispatch(setStartDate(12));

// store.dispatch(setEndDate(25));

// store.dispatch(setTextFilter("An"));

//NO. OF ACTIONS NEED TO BE PERFORMED
//Remove Expense
// Edit expense
// SET text Filter
// Sort By Date
// Sort By Amount
// Set Start Date
// SET End Date

const demoState = {
  expenses: [
    {
      id: "sadasdasdasd",
      description: "January Rent",
      note: "This was the final payment for the address",
      amount: 54500,
      createdAt: 0
    }
  ],
  filter: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};
