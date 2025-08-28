import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Resource } from "../slices/tableSlice";

/**
 * This file contains selectors regarding table filters
 */

export const getAllFilters = (state: RootState) => {
	// Return empty array if data is corrupted (not an array)
	// The useTableFilterStateValidation hook should be used to reset corrupted state
	return Array.isArray(state.tableFilters.data) ? state.tableFilters.data : [];
};

export const getStats = (state: RootState) => {
	// Return empty array if stats is corrupted (not an array)
	// The useTableFilterStateValidation hook should be used to reset corrupted state
	return Array.isArray(state.tableFilters.stats) ? state.tableFilters.stats : [];
};

export const getAllTextFilter = (state: RootState) => {
	// Return empty array if textFilter is corrupted (not an array)
	// The useTableFilterStateValidation hook should be used to reset corrupted state
	return Array.isArray(state.tableFilters.textFilter) ? state.tableFilters.textFilter : [];
};

export const getSelectedFilter = (state: RootState) => state.tableFilters.selectedFilter;
export const getSecondFilter = (state: RootState) => state.tableFilters.secondFilter;
export const getCurrentFilterResource = (state: RootState) => state.tableFilters.currentResource;

export const getFilters = createSelector(
	[getAllFilters, (_state, resource: Resource) => resource],
	(filters, resource) => {
		// filters will already be an array due to getAllFilters fallback
		return filters.filter(obj => obj.resource === resource);
	});

export const getTextFilter = createSelector(
	[getAllTextFilter, (_state, resource: Resource) => resource],
	(textFilter, resource) => {
		// textFilter will already be an array due to getAllTextFilter fallback
		const textFilte = textFilter.find(obj => obj.resource === resource);
		return textFilte?.text ?? "";
	},
);
