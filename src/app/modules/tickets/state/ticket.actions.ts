import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/modules/tickets/resources/customer-message';

export const sendMessage = createAction(
  '[Customer Support Component] Customer Support',
  props<{ name: string; email: string; category: string; message: string }>()
);

export const sendMessageSuccess = createAction(
  '[Ticket Effect] Customer Support Success',
  props<{ ticket: Ticket }>()
);

export const sendMessageFailure = createAction(
  '[Ticket Effect] Customer Support Failure',
  props<{ error: any }>()
);

//************************/
export const loadAdminTickets = createAction(
  '[Admin Tickets Component] Load Tickets',
  props<{ role: string }>()
);
export const loadManagerTickets = createAction(
  '[Manager Tickets Component] Load Manager Tickets',
  props<{ role: string }>()
);
export const loadSupportTickets = createAction(
  '[Support Tickets Component] Load Support Tickets',
  props<{ role: string }>()
);
export const loadTicketsSuccess = createAction(
  '[Ticket Effect] Load Tickets Success',
  props<{ tickets: Ticket[]; statistics: any }>()
);
export const loadTicketsFailure = createAction(
  '[Tickets Component] Load Tickets Failure',
  props<{ error: any }>()
);
//******************/
export const loadAdminTicket = createAction(
  '[Admin Ticket Component] Load Ticket',
  props<{ _id: string; role: string }>()
);
export const loadManagerTicket = createAction(
  '[Manager Ticket Component] Load Manager Ticket',
  props<{ _id: string; role: string }>()
);
export const loadSupportTicket = createAction(
  '[Support Ticket Component] Load Support Ticket',
  props<{ _id: string; role: string }>()
);
export const loadTicketSuccess = createAction(
  '[Ticket Effect] Load Ticket Success',
  props<{ ticket: Ticket }>()
);
export const loadTicketFailure = createAction(
  '[Ticket Component] Load Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const deleteTicket = createAction(
  '[Ticket List Component] Delete Ticket',
  props<{ ticketId: any }>()
);
export const deleteTicketSuccess = createAction(
  '[Ticket Effect] Delete Ticket Success'
);
export const deleteTicketFailure = createAction(
  '[Ticket Effect] Delete Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const openAdminTicket = createAction(
  '[Admin Ticket Component] Open Ticket',
  props<{ _id: string }>()
);
export const openManagerTicket = createAction(
  '[Manager Ticket Component] Open Manager Ticket',
  props<{ _id: string }>()
);
export const openSupportTicket = createAction(
  '[Support Ticket Component] Open Support Ticket',
  props<{ _id: string }>()
);
export const openTicketSuccess = createAction(
  '[Ticket Effect] Open Ticket Success',
  props<{ ticket: Ticket }>()
);
export const openTicketFailure = createAction(
  '[Ticket Component] Open Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const updateAdminTicket = createAction(
  '[Admin Ticket Component] Update Ticket',
  props<{
    _id: string;
    comment: string;
    time: number;
    status: string;
    modifiedBy: string;
  }>()
);
export const updateManagerTicket = createAction(
  '[Manager Ticket Component] Update Manager Ticket',
  props<{
    _id: string;
    comment: string;
    time: number;
    status: string;
    modifiedBy: string;
  }>()
);
export const updateSupportTicket = createAction(
  '[Support Ticket Component] Update Support Ticket',
  props<{
    _id: string;
    comment: string;
    time: number;
    status: string;
    modifiedBy: string;
  }>()
);
export const updateTicketSuccess = createAction(
  '[Ticket Effect] Update Ticket Success',
  props<{ ticket: Ticket }>()
);
export const updateTicketFailure = createAction(
  '[Ticket Component] Update Ticket Failure',
  props<{ error: any }>()
);
