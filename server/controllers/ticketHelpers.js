import Mail from "../models/mailModel.js";

export const statisticsTickets = (tickets) =>
  tickets.reduce(
    (acc, ticket) => {
      acc.qtyClosed += ticket.status === "Closed" ? 1 : 0;
      acc.qtyNew += ticket.status === "New" ? 1 : 0;
      acc.qtyOnHold += ticket.status === "On hold" ? 1 : 0;
      acc.qtyBusiness += ticket.category === "Business" ? 1 : 0;
      acc.qtyMaintenance += ticket.category === "Maintenance" ? 1 : 0;
      acc.qtyDevelopment += ticket.category === "Development" ? 1 : 0;
      acc.qtyAdmin += ticket.modifiedBy === "Admin" ? 1 : 0;
      acc.qtyManager += ticket.modifiedBy === "Manager" ? 1 : 0;
      acc.qtySupport += ticket.modifiedBy === "Support" ? 1 : 0;
      acc.qtyCustomer += ticket.modifiedBy === "Customer" ? 1 : 0;
      acc.timeAdmin += +ticket.timeAdmin;
      acc.timeManager += +ticket.timeManager;
      acc.timeSupport += +ticket.timeSupport;
      return acc;
    },
    {
      qtyClosed: 0,
      qtyNew: 0,
      qtyOnHold: 0,
      qtyBusiness: 0,
      qtyMaintenance: 0,
      qtyDevelopment: 0,
      qtyAdmin: 0,
      qtyManager: 0,
      qtySupport: 0,
      qtyCustomer: 0,
      timeAdmin: 0,
      timeManager: 0,
      timeSupport: 0,
    }
  );

export async function createTeamMail(admin, team, ticket) {
  const mail = new Mail({
    user: admin._id,
    mailTarget: team.email,
    firstNameTarget: team.firstName,
    lastNameTarget: team.lastName,
    subject: "New ticket has been assigned to your team!",
    message: `Hello ${team.firstName}, Ticket ${ticket._id} has been assigned to your team.`,
  });

  await mail.save();
}
