import express from 'express';
import { assignUser } from '../middlewares/assignUser.js';
import { createEvent } from '../events/create.js';
import { getOpenEvents } from '../events/openEvents.js';
import { getSingleEvent } from '../events/single.js';
import { updateEvent } from '../events/update.js';
import { deleteEvent } from '../events/delete.js';
import { joinEvent } from '../events/join.js';
import { leaveEvent } from '../events/leave.js';
import { getMyRegistrations } from '../events/getMyRegs.js';
import { getEventLogs } from '../events/eventLogs.js';

const router = express.Router();

router.get('/', getOpenEvents); // add pagination later

router.get('/:id', getSingleEvent);
router.put('/:id', assignUser, updateEvent);
router.delete('/:id', assignUser, deleteEvent);

// These routes contain logs
router.post('/:id/join', assignUser, joinEvent);
router.delete('/:id/leave', assignUser, leaveEvent);

router.get('/me/registrations', assignUser, getMyRegistrations);
router.get('/:id/logs', assignUser, getEventLogs);

router.post('/create', assignUser, createEvent);

export { router as eventsRouter };
