import { createReducer, on } from '@ngrx/store';

import * as TicketActions from 'src/app/modules/tickets/state/ticket.actions';
import { Ticket } from 'src/app/modules/tickets/resources/customer-message';

export const ticketsFeatureKey = 'Tickets';

export interface State {
  ticket: Ticket | {};
  tickets: Ticket[];
  statistics: any;
  error: any | null;
}

export const initialState: State = {
  ticket: {},
  tickets: [],
  statistics: {},
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    TicketActions.loadAdminTickets,
    TicketActions.loadManagerTickets,
    TicketActions.loadAdminTicket,
    TicketActions.loadManagerTicket,
    (state) => {
      return {
        ...state,
        error: null,
      };
    }
  ),

  on(TicketActions.loadTicketsSuccess, (state, action) => {
    return {
      ...state,
      tickets: action.tickets,
      statistics: action.statistics,
      error: null,
    };
  }),

  on(
    TicketActions.sendMessageSuccess,
    TicketActions.loadTicketSuccess,
    TicketActions.openTicketSuccess,
    TicketActions.updateTicketSuccess,
    (state, action) => {
      return {
        ...state,
        ticket: action.ticket,
        error: null,
      };
    }
  ),

  on(
    TicketActions.sendMessageFailure,
    TicketActions.loadTicketsFailure,
    TicketActions.loadTicketFailure,
    TicketActions.deleteTicketFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(TicketActions.deleteTicket, (state, action) => {
    return {
      ...state,
      ticket: action.ticketId,
      error: null,
    };
  }),

  on(TicketActions.deleteTicketSuccess, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
