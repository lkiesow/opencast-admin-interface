import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Resource } from "../slices/tableSlice";

/**
 * This file contains selectors regarding table filters
 */

export const getAllFilters = (state: RootState) => {
	// Handle corrupted state from localStorage where data might not be an array
	if (!Array.isArray(state.tableFilters.data)) {
		console.warn("tableFilters.data is not an array, returning empty array. This may indicate corrupted localStorage state.");
		return [];
	}
	return state.tableFilters.data;
};
export const getStats = (state: RootState) => {
	// Handle corrupted state from localStorage where stats might not be an array
	if (!Array.isArray(state.tableFilters.stats)) {
		console.warn("stats is not an array, returning empty array. This may indicate corrupted localStorage state.");
		return [];
	}
	return state.tableFilters.stats;
};
export const getAllTextFilter = (state: RootState) => {
	// Handle corrupted state from localStorage where textFilter might not be an array
	if (!Array.isArray(state.tableFilters.textFilter)) {
		console.warn("textFilter is not an array, returning empty array. This may indicate corrupted localStorage state.");
		return [];
	}
	return state.tableFilters.textFilter;
};
export const getSelectedFilter = (state: RootState) => state.tableFilters.selectedFilter;
export const getSecondFilter = (state: RootState) => state.tableFilters.secondFilter;
export const getCurrentFilterResource = (state: RootState) => state.tableFilters.currentResource;
export const getFilters = createSelector(
	[getAllFilters, (_state, resource: Resource) => resource],
	(filters, resource) => {
		// Handle corrupted state from localStorage where filters might not be an array
		if (!Array.isArray(filters)) {
			console.warn("filters is not an array, returning empty array. This may indicate corrupted localStorage state.");
			return [];
		}
		return filters.filter(obj => obj.resource === resource);
	});
export const getTextFilter = createSelector(
	[getAllTextFilter, (_state, resource: Resource) => resource],
	(textFilter, resource) => {
		// Handle corrupted state from localStorage where textFilter might not be an array
		if (!Array.isArray(textFilter)) {
			console.warn("textFilter is not an array, returning empty string. This may indicate corrupted localStorage state.");
			return "";
		}
		const textFilte = textFilter.find(obj => obj.resource === resource);
		return textFilte?.text ?? "";
	},
);
