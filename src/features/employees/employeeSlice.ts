import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Employee } from "./types/employee.types";

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },

    removeEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload,
      );
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
