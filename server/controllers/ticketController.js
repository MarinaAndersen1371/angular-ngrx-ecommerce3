import asyncHandler from "express-async-handler";
import { statisticsTickets, createTeamMail } from "./ticketHelpers.js";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";

//Desc: Create a new ticket
//Route: POST/api/tickets
//Access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { name, email, category, message } = req.body;

  const ticket = new Ticket({
    name,
    email,
    category,
    message,
    lastModified: Date.now(),
  });

  const teamEmail =
    category === "Maintenance"
      ? "support@web.de"
      : category === "Business"
      ? "manager@web.de"
      : null;
  const admin = await User.findOne({ email: "admin@web.de" });
  const team = teamEmail ? await User.findOne({ email: teamEmail }) : null;

  if (admin && team) {
    await createTeamMail(admin, team, ticket);
  }

  await ticket.save();
  res.status(201).json(ticket);
});

//Desc:Get ticket by Id
//Route: GET/api/tickets/:id/admin
//Access: Private / Admin / Manager /Support
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc:Get all tickets
//Route: GET/api/tickets/admin
//Access: Private/ Admin / Manager /Support
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});

  const statistics = statisticsTickets(tickets);

  res.json({ tickets, statistics });
});

//Desc: Delete ticket
//Route: DELETE/api/tickets/:id/admin
//Access: Private / Admin
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    await ticket.remove();
    res.json({ message: "Ticket has been deleted" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Open ticket
//Route: PUT/api/tickets/:id/open
//Access: Private / Admin /  Manager /Support
const openTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    ticket.open = true;
    await ticket.save();
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Update ticket
//Route: PUT/api/tickets/:id/admin
//Access: Private / Admin / Manager / Support
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  let commentField, timeField;

  switch (req.body.modifiedBy) {
    case "Admin":
      commentField = "commentAdmin";
      timeField = "timeAdmin";
      break;
    case "Manager":
      commentField = "commentManager";
      timeField = "timeManager";
      break;
    case "Support":
      commentField = "commentSupport";
      timeField = "timeSupport";
      break;
    default:
      res.status(403);
      throw new Error("Unauthorized role");
  }

  ticket[commentField] = req.body.comment || ticket[commentField];
  ticket[timeField] = +ticket[timeField] + (+req.body.time || 0);
  ticket.status = req.body.status || ticket.status;
  ticket.open = false;
  ticket.lastModified = Date.now();
  ticket.modifiedBy = req.body.modifiedBy;

  await ticket.save();
  res.json(ticket);
});

export {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  openTicket,
  updateTicket,
};
