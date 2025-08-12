/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {createSlice} from '@reduxjs/toolkit';

// Initial mock data
const initialEmployees = [
  {
    id: 1,
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@ing.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 85000,
    dateOfEmployment: '15/03/2022',
    dateOfBirth: '12/05/1995',
    status: 'active',
    phone: '+90 555 123 4567',
    address: 'Levent, Istanbul',
  },
  {
    id: 2,
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@ing.com',
    department: 'Product',
    position: 'Product Manager',
    salary: 95000,
    dateOfEmployment: '22/08/2021',
    dateOfBirth: '08/11/1992',
    status: 'active',
    phone: '+90 555 234 5678',
    address: 'Kadıköy, Istanbul',
  },
  {
    id: 3,
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@ing.com',
    department: 'Design',
    position: 'UX Designer',
    salary: 70000,
    dateOfEmployment: '10/01/2023',
    dateOfBirth: '25/07/1990',
    status: 'active',
    phone: '+90 555 345 6789',
    address: 'Beşiktaş, Istanbul',
  },
  {
    id: 4,
    firstName: 'Fatma',
    lastName: 'Özkan',
    email: 'fatma.ozkan@ing.com',
    department: 'Analytics',
    position: 'Data Analyst',
    salary: 75000,
    dateOfEmployment: '05/11/2022',
    dateOfBirth: '03/09/1994',
    status: 'active',
    phone: '+90 555 456 7890',
    address: 'Şişli, Istanbul',
  },
  {
    id: 5,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
  {
    id: 6,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
  {
    id: 7,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
  {
    id: 8,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
  {
    id: 9,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
  {
    id: 10,
    firstName: 'Can',
    lastName: 'Arslan',
    email: 'can.arslan@ing.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 55000,
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '18/12/1998',
    status: 'active',
    phone: '+90 555 567 8901',
    address: 'Maltepe, Istanbul',
  },
];

// Load from localStorage if available
const loadFromStorage = () => {
  try {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      const parsed = JSON.parse(savedEmployees);
      // Check if data structure is compatible (has new field names)
      if (parsed.length > 0 && !parsed[0].dateOfEmployment) {
        console.log(
          'Outdated employee data structure detected, using initial data'
        );
        localStorage.removeItem('employees'); // Clear old data
        return initialEmployees;
      }
      return parsed;
    }
    return initialEmployees;
  } catch (error) {
    console.warn('Error loading employees from localStorage:', error);
    return initialEmployees;
  }
};

// Save to localStorage
const saveToStorage = (employees) => {
  try {
    localStorage.setItem('employees', JSON.stringify(employees));
  } catch (error) {
    console.warn('Error saving employees to localStorage:', error);
  }
};

const initialState = {
  employees: loadFromStorage(),
  loading: false,
  error: null,
  selectedRows: [],
  filters: {
    search: '',
    department: '',
    status: 'all',
  },
  sorting: {
    field: 'id',
    direction: 'asc',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Employee CRUD operations
    addEmployee: (state, action) => {
      const newEmployee = {
        ...action.payload,
        id: Math.max(...state.employees.map((emp) => emp.id), 0) + 1,
        status: 'active',
      };
      state.employees.push(newEmployee);
      saveToStorage(state.employees);
    },

    updateEmployee: (state, action) => {
      const {id, ...updates} = action.payload;
      const index = state.employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        state.employees[index] = {...state.employees[index], ...updates};
        saveToStorage(state.employees);
      }
    },

    deleteEmployee: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((emp) => emp.id !== id);
      saveToStorage(state.employees);
    },

    deleteSelectedEmployees: (state, action) => {
      const ids = action.payload;
      state.employees = state.employees.filter((emp) => !ids.includes(emp.id));
      saveToStorage(state.employees);
    },

    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Filters
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when filtering
    },

    setDepartmentFilter: (state, action) => {
      state.filters.department = action.payload;
      state.pagination.currentPage = 1;
    },

    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },

    clearFilters: (state) => {
      state.filters = {
        search: '',
        department: '',
        status: 'all',
      };
      state.pagination.currentPage = 1;
    },

    // Sorting
    setSorting: (state, action) => {
      const {field, direction} = action.payload;
      state.sorting = {field, direction};
    },

    toggleSortDirection: (state, action) => {
      const field = action.payload;
      if (state.sorting.field === field) {
        state.sorting.direction =
          state.sorting.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sorting = {field, direction: 'asc'};
      }
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
    },

    updateTotalItems: (state, action) => {
      state.pagination.totalItems = action.payload;
    },

    // Selection management
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },

    clearSelectedRows: (state) => {
      state.selectedRows = [];
    },

    // Bulk operations
    updateEmployeeStatus: (state, action) => {
      const {ids, status} = action.payload;
      state.employees.forEach((emp) => {
        if (ids.includes(emp.id)) {
          emp.status = status;
        }
      });
      saveToStorage(state.employees);
    },

    // Reset state
    resetEmployeeState: (state) => {
      state.filters = initialState.filters;
      state.sorting = initialState.sorting;
      state.pagination = initialState.pagination;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteSelectedEmployees,
  setLoading,
  setError,
  clearError,
  setSearchFilter,
  setDepartmentFilter,
  setStatusFilter,
  clearFilters,
  setSorting,
  toggleSortDirection,
  setCurrentPage,
  setItemsPerPage,
  updateTotalItems,
  setSelectedRows,
  clearSelectedRows,
  updateEmployeeStatus,
  resetEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;
