/**
 * Creates a new event in a specific Google Calendar.
 *
 * ERROR STRATEGY: Top-level AppSheet-facing function — always returns { error } on failure.
 *
 * @param {string}        calendarId  The ID of the target calendar.
 * @param {string}        title       Event title.
 * @param {Date|string}   startTime   Event start time.
 * @param {Date|string}   endTime     Event end time.
 * @param {Object|string} optionsObj  Optional: { description, location, guests, sendInvites }.
 * @returns {{ eventId: string, eventURL: string }|{ error: string }}
 */
function createEvent(calendarId, title, startTime, endTime, optionsObj) {
  const ctx = 'createEvent';

  if (!calendarId || !title || !startTime || !endTime) {
    const msg = 'Missing required arguments: calendarId, title, startTime, endTime.';
    log('ERROR', ctx, msg);
    return { error: msg };
  }

  startTime = new Date(startTime);
  endTime   = new Date(endTime);

  if (isNaN(startTime) || isNaN(endTime)) {
    const msg = 'Invalid date — startTime or endTime could not be parsed.';
    log('ERROR', ctx, msg);
    return { error: msg };
  }

  let options = {};
  if (optionsObj) {
    if (typeof optionsObj === 'string') {
      try {
        options = safeParse(optionsObj, 'options');
      } catch (e) {
        log('WARN', ctx, `Could not parse options — proceeding without them. Reason: ${e.message}`);
      }
    } else {
      options = optionsObj;
    }
  }

  try {
    const calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      const msg = `Calendar not found — ID: "${calendarId}"`;
      log('ERROR', ctx, msg);
      return { error: msg };
    }

    const newEvent = calendar.createEvent(title, startTime, endTime, options);
    log('SUCCESS', ctx, `Event created — "${title}"`);

    return {
      eventId:  newEvent.getId(),
      eventURL: `https://calendar.google.com/calendar/event?eid=${newEvent.getId()}`
    };

  } catch (e) {
    log('ERROR', ctx, `Failed to create "${title}" — ${e.message}`);
    return { error: e.message };
  }
}
