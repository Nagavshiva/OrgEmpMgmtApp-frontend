import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrganizations, fetchOrganizationById, createOrganization, updateOrganization, deleteOrganization } from "./organizationAPI";


const initialState = {
  organizations: [],
  currentOrganization: null,
  loading: false,
  error: null,
};


export const fetchOrganizationsAsync = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    try {
      const data = await fetchOrganizations();
      return data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to fetch organizations'
      );
    }
  }
);


export const fetchOrganizationByIdAsync = createAsyncThunk(
  'organizations/fetchOrganizationById',
  async (id) => {
    console.log(id)
    try {
      const data = await fetchOrganizationById(id);
      return data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to fetch organization by ID'
      );
    }
  }
);


export const createOrganizationAsync = createAsyncThunk(
  'organizations/createOrganization',
  async (organizationData) => {
    try {
      const data = await createOrganization(organizationData);
      return data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to create organization'
      );
    }
  }
);


export const updateOrganizationAsync = createAsyncThunk(
  'organizations/updateOrganization',
  async ({ id, organizationData }) => {
    try {
      const data = await updateOrganization(id, organizationData);
      return { id, organizationData: data }; 
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to update organization'
      );
    }
  }
);


export const deleteOrganizationAsync = createAsyncThunk(
  'organizations/deleteOrganization',
  async (id) => {
    try {
      const data = await deleteOrganization(id);
      return data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || 'Failed to delete organization'
      );
    }
  }
);



const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.organizations = action.payload;
        localStorage.setItem('organizations', JSON.stringify(action.payload));
      })
      .addCase(fetchOrganizationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchOrganizationByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrganization = null; // Clear the current organization details
      })
      .addCase(fetchOrganizationByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrganization = action.payload;
      })
      .addCase(fetchOrganizationByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentOrganization = null; // Clear the current organization details in case of error
      })


      .addCase(createOrganizationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganizationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.organizations.push(action.payload);
      })
      .addCase(createOrganizationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(updateOrganizationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Update the organization in the state
        const index = state.organizations.findIndex(
          (org) => org._id === action.payload._id
        );
        if (index !== -1) {
          state.organizations[index] = action.payload;
        }
      })
      .addCase(updateOrganizationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(deleteOrganizationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganizationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Remove the deleted organization from the state
        state.organizations = state.organizations.filter(org => org._id !== action.payload.id);
      })
      .addCase(deleteOrganizationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export default organizationsSlice;

