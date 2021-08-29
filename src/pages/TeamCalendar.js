// - Календарь одной команды - список матчей команды
///v2/teams/{id}/matches/
//Show all matches for a particular team

import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils';


export default function TeamCalendar(props) {

    return (
        <div className="container">
            <h1>Team Calendar</h1>
        </div>
    )

}