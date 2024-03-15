import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TicketService } from 'src/app/modules/tickets/resources/ticket.service';
import * as TicketActions from 'src/app/modules/tickets/state/ticket.actions';

@Injectable()
export class TicketEffects {
  ticket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketActions.sendMessage),
      concatMap((action) =>
        this.ticketService
          .ticket(action.name, action.email, action.category, action.message)
          .pipe(
            map((ticket) => TicketActions.sendMessageSuccess({ ticket })),
            catchError((error) =>
              of(TicketActions.sendMessageFailure({ error }))
            )
          )
      )
    );
  });

  loadAdminTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        TicketActions.loadAdminTickets,
        TicketActions.loadManagerTickets,
        TicketActions.loadSupportTickets
      ),
      mergeMap((action) =>
        this.ticketService.getTickets(action.role).pipe(
          map(({ tickets, statistics }) =>
            TicketActions.loadTicketsSuccess({ tickets, statistics })
          ),
          catchError((error) => of(TicketActions.loadTicketsFailure({ error })))
        )
      )
    );
  });

  loadAdminTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TicketActions.loadAdminTicket,
        TicketActions.loadManagerTicket,
        TicketActions.loadSupportTicket
      ),
      mergeMap((action) =>
        this.ticketService.getTicket(action._id, action.role).pipe(
          map((ticket) => TicketActions.loadTicketSuccess({ ticket })),
          catchError((error) =>
            of(TicketActions.loadTicketFailure({ error: error }))
          )
        )
      )
    )
  );

  updateAdminTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TicketActions.updateAdminTicket,
        TicketActions.updateManagerTicket,
        TicketActions.updateSupportTicket
      ),
      mergeMap((action) =>
        this.ticketService
          .updateTicket(
            action._id,
            action.comment,
            action.time,
            action.status,
            action.modifiedBy
          )
          .pipe(
            map((ticket) => TicketActions.updateTicketSuccess({ ticket })),
            catchError((error) =>
              of(TicketActions.updateTicketFailure({ error }))
            )
          )
      )
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.deleteTicket),
      mergeMap((action) =>
        this.ticketService.removeTicket(action.ticketId).pipe(
          map(() => TicketActions.deleteTicketSuccess()),
          catchError((error) =>
            of(TicketActions.deleteTicketFailure({ error }))
          )
        )
      )
    )
  );

  openTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TicketActions.openAdminTicket,
        TicketActions.openManagerTicket,
        TicketActions.openSupportTicket
      ),
      mergeMap((action) =>
        this.ticketService.openTicket(action._id).pipe(
          map((ticket) => TicketActions.openTicketSuccess({ ticket })),
          catchError((error) => of(TicketActions.openTicketFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}
}
