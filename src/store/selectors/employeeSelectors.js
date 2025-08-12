/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {createSelector} from '@reduxjs/toolkit';

// Base selectors
export const selectEmployeeState = (state) => state.employees;
export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeeLoading = (state) => state.employees.loading;
export const selectEmployeeError = (state) => state.employees.error;
export const selectSelectedRows = (state) => state.employees.selectedRows;
export const selectFilters = (state) => state.employees.filters;
export const selectSorting = (state) => state.employees.sorting;
export const selectPagination = (state) => state.employees.pagination;

// Memoized selectors for performance
export const selectFilteredEmployees = createSelector(
  [selectAllEmployees, selectFilters],
  (employees, filters) => {
    let filtered = [...employees];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchTerm) ||
          emp.lastName.toLowerCase().includes(searchTerm) ||
          emp.email.toLowerCase().includes(searchTerm) ||
          emp.department.toLowerCase().includes(searchTerm) ||
          emp.position.toLowerCase().includes(searchTerm)
      );
    }

    // Department filter
    if (filters.department) {
      filtered = filtered.filter(
        (emp) => emp.department === filters.department
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter((emp) => emp.status === filters.status);
    }

    return filtered;
  }
);

// Get all filtered employee IDs
export const selectAllFilteredEmployeeIds = createSelector(
  [selectFilteredEmployees],
  (employees) => employees.map((emp) => emp.id)
);

export const selectSortedEmployees = createSelector(
  [selectFilteredEmployees, selectSorting],
  (employees, sorting) => {
    const {field, direction} = sorting;

    return [...employees].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
);

export const selectPaginatedEmployees = createSelector(
  [selectSortedEmployees, selectPagination],
  (employees, pagination) => {
    const {currentPage, itemsPerPage} = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      employees: employees.slice(startIndex, endIndex),
      filteredEmployees: employees,
      totalItems: employees.length,
      totalPages: Math.ceil(employees.length / itemsPerPage),
      currentPage,
      itemsPerPage,
    };
  }
);

// Get employee by ID
export const selectEmployeeById = createSelector(
  [selectAllEmployees, (state, employeeId) => employeeId],
  (employees, employeeId) => employees.find((emp) => emp.id === employeeId)
);

// Get unique departments for filter dropdown
export const selectUniqueDepartments = createSelector(
  [selectAllEmployees],
  (employees) => {
    const departments = [];
    employees.forEach((emp) => {
      if (!departments.includes(emp.department)) {
        departments.push(emp.department);
      }
    });
    return departments.sort();
  }
);

// Get unique positions
export const selectUniquePositions = createSelector(
  [selectAllEmployees],
  (employees) => {
    const positions = [];
    employees.forEach((emp) => {
      if (!positions.includes(emp.position)) {
        positions.push(emp.position);
      }
    });
    return positions.sort();
  }
);

// Statistics selectors
export const selectEmployeeStats = createSelector(
  [selectAllEmployees],
  (employees) => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(
      (emp) => emp.status === 'active'
    ).length;
    const inactiveEmployees = employees.filter(
      (emp) => emp.status === 'inactive'
    ).length;

    const departmentCounts = employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    const averageSalary =
      totalEmployees > 0
        ? employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) /
          totalEmployees
        : 0;

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      departmentCounts,
      averageSalary: Math.round(averageSalary),
    };
  }
);

// Search suggestions
export const selectSearchSuggestions = createSelector(
  [selectAllEmployees, (state, searchTerm) => searchTerm],
  (employees, searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];

    const suggestions = [];
    const term = searchTerm.toLowerCase();

    employees.forEach((emp) => {
      if (
        emp.firstName.toLowerCase().includes(term) &&
        !suggestions.includes(emp.firstName)
      ) {
        suggestions.push(emp.firstName);
      }
      if (
        emp.lastName.toLowerCase().includes(term) &&
        !suggestions.includes(emp.lastName)
      ) {
        suggestions.push(emp.lastName);
      }
      if (
        emp.department.toLowerCase().includes(term) &&
        !suggestions.includes(emp.department)
      ) {
        suggestions.push(emp.department);
      }
      if (
        emp.position.toLowerCase().includes(term) &&
        !suggestions.includes(emp.position)
      ) {
        suggestions.push(emp.position);
      }
    });

    return suggestions.slice(0, 5);
  }
);
