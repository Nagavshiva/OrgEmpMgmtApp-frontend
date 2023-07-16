import { configureStore } from "@reduxjs/toolkit";
import  organizationsSlice  from "./organizations/organizationsSlice"
import employeesSlice  from "./employees/employeesSlice"

const store = configureStore({
    reducer: {
        organizations: organizationsSlice.reducer,
        employees: employeesSlice.reducer,
    },
})

export default store;