/**
 * External dependencies
 */
import { flow } from 'lodash';

/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { PREFERENCES_DEFAULTS } from './defaults';

/**
 * Higher-order reducer creator which provides the given initial state for the
 * original reducer.
 *
 * @param {*} initialState Initial state to provide to reducer.
 *
 * @return {Function} Higher-order reducer.
 */
const createWithInitialState = ( initialState ) => ( reducer ) => {
	return ( state = initialState, action ) => reducer( state, action );
};

/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state Current state.
 *
 * @return {Object} Updated state.
 */
export const preferences = flow( [
	combineReducers,
	createWithInitialState( PREFERENCES_DEFAULTS ),
] )( {
	features( state, action ) {
		if ( action.type === 'TOGGLE_FEATURE' ) {
			return {
				...state,
				[ action.feature ]: ! state[ action.feature ],
			};
		}

		return state;
	},
} );

/**
 * Reducer returning the editing canvas device type.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function deviceType( state = 'Desktop', action ) {
	switch ( action.type ) {
		case 'SET_PREVIEW_DEVICE_TYPE':
			return action.deviceType;
	}

	return state;
}

/**
 * Reducer returning the settings.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function settings( state = {}, action ) {
	switch ( action.type ) {
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...action.settings,
			};
	}

	return state;
}

/**
 * Reducer returning the template ID.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function templateId( state, action ) {
	switch ( action.type ) {
		case 'SET_TEMPLATE':
		case 'SET_PAGE':
			return action.templateId;
	}

	return state;
}

/**
 * Reducer returning the template part ID.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function templatePartId( state, action ) {
	switch ( action.type ) {
		case 'SET_TEMPLATE_PART':
			return action.templatePartId;
	}

	return state;
}

/**
 * Reducer returning the template type.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function templateType( state = 'wp_template', action ) {
	switch ( action.type ) {
		case 'SET_TEMPLATE':
		case 'SET_PAGE':
			return 'wp_template';
		case 'SET_TEMPLATE_PART':
			return 'wp_template_part';
	}

	return state;
}

/**
 * Reducer returning the page being edited.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function page( state, action ) {
	switch ( action.type ) {
		case 'SET_PAGE':
			return action.page;
	}

	return state;
}

/**
 * Reducer for information about the site's homepage.
 *
 * @param {Object} state Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
export function homeTemplateId( state, action ) {
	switch ( action.type ) {
		case 'SET_HOME_TEMPLATE':
			return action.homeTemplateId;
	}

	return state;
}

function navigationPanel( state = { menu: 'root', isOpen: false }, action ) {
	switch ( action.type ) {
		case 'SET_NAVIGATION_PANEL_ACTIVE_MENU':
			return {
				...state,
				menu: action.menu,
			};
		case 'OPEN_NAVIGATION_PANEL_TO_MENU':
			return {
				...state,
				isOpen: true,
				menu: action.menu,
			};
		case 'SET_NAVIGATION_PANEL_OPEN':
			return {
				...state,
				isOpen: action.isOpen,
			};
		case 'SET_INSERTER_OPEN':
			return {
				...state,
				isOpen: action.isOpen ? false : state.isOpen,
			};
	}
	return state;
}

function blockInserterPanel( state = false, action ) {
	switch ( action.type ) {
		case 'OPEN_NAVIGATION_PANEL_TO_MENU':
			return false;
		case 'SET_NAVIGATION_PANEL_OPEN':
			return action.isOpen ? false : state.isOpen;
		case 'SET_INSERTER_OPEN':
			return action.isOpen;
	}
	return state;
}

export default combineReducers( {
	preferences,
	deviceType,
	settings,
	templateId,
	templatePartId,
	templateType,
	page,
	homeTemplateId,
	navigationPanel,
	blockInserterPanel,
} );
