import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from './employeeAPI';



const initialState = {
  organizations: {},
  loading: false,
  error: null,
};



export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployees',
  async (organizationId) => {
    try {
      const data = await fetchEmployees(organizationId);
      return { organizationId, data };
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to fetch employees'
      );
    }
  }
);


export const createEmployeeAsync = createAsyncThunk(
  'employees/createEmployee',
  async ({ organizationId, employeeData }) => {
    try {
      const data = await createEmployee(organizationId, employeeData);
      return { organizationId, data };
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to create employee'
      );
    }
  }
);



export const updateEmployeeAsync = createAsyncThunk(
  'employees/updateEmployee',
  async ({ organizationId, employeeId, updatedData }) => {
    try {
      const data = await updateEmployee(organizationId, employeeId, updatedData);
      return { organizationId, employeeId, data };
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to update employee'
      );
    }
  }
);



export const deleteEmployeeAsync = createAsyncThunk(
  'employees/deleteEmployee',
  async ({ organizationId, employeeId }) => {
    try {
      await deleteEmployee(organizationId, employeeId);
      return { organizationId, employeeId };
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to delete employee'
      );
    }
  }
);



const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { organizationId, data } = action.payload;
        state.organizations[organizationId] = { employees: data };
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(createEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { organizationId, data } = action.payload;
        state.organizations[organizationId].employees.push(data);
      })
      .addCase(createEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(updateEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { organizationId, employeeId, data } = action.payload;
        const employees = state.organizations[organizationId].employees;
        const index = employees.findIndex(employee => employee._id === employeeId);
        if (index !== -1) {
          employees[index] = data;
        }
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { organizationId, employeeId } = action.payload;
        const employees = state.organizations[organizationId].employees;
        state.organizations[organizationId].employees = employees.filter(employee => employee._id !== employeeId);
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export default employeesSlice;
