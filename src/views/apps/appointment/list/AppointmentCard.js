// ** React Imports
import { useEffect, useState, useRef, memo } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Calendar, Menu, ChevronDown } from 'react-feather'

import { Collapse, Button, Card, CardBody } from 'reactstrap'

import collapseImg from '@src/assets/images/slider/04.jpg'


// ** Full Calendar & it's Plugins
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import toast from 'react-hot-toast'
import th from '@fullcalendar/core/locales/th'

// * Store 
import { getEvent } from '../store'
import { useDispatch } from 'react-redux'


const AppointmentCard = (props) => {
    // ** State

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    // ** Refs
    const calendarRef = useRef(null)
    const {
        store,
        dispatch,
        blankEvent,
        calendarsColor,
    } = props



    /*     // ** UseEffect checks for CalendarAPI Update
          console.log("Event")
          console.log(store.events) */


    // ** calendarOptions(Props)
    const calendarOptions = {
        events: store.events.length ? store.events : [],
        //events: store.events,
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            start: 'prev,next,title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        /*
          Enable dragging and resizing event
          ? Docs: https://fullcalendar.io/docs/editable
        */
        editable: true,

        /*
          Enable resizing event from start
          ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
        */
        eventResizableFromStart: true,

        /*
          Automatically scroll the scroll-containers during event drag-and-drop and date selecting
          ? Docs: https://fullcalendar.io/docs/dragScroll
        */
        dragScroll: true,

        /*
          Max number of events within a given day
          ? Docs: https://fullcalendar.io/docs/dayMaxEvents
        */
        dayMaxEvents: 3,

        /*
          Determines if day names and week names are clickable
          ? Docs: https://fullcalendar.io/docs/navLinks
        */
        navLinks: false,

        displayEventTime: false,

        eventClassNames({ event: calendarEvent }) {
            // eslint-disable-next-line no-underscore-dangle
            // const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
            //const colorName = calendarsColor['ETC']
            const colorName = 'primary'
            return [
                // Background Color
                `bg-light-${colorName}`
            ]
        },

        dateClick(info) {
            const ev = blankEvent
            ev.start = info.date
            ev.end = info.date
            dispatch(selectEvent(ev))  /// load data of each appointment (view-only)
            handleAddEventSidebar() // handle it with open modal
        },

        /*
          Handle event drop (Also include dragged event)
          ? Docs: https://fullcalendar.io/docs/eventDrop
          ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
        */
        eventDrop({ event: droppedEvent }) {
            dispatch(updateEvent(droppedEvent))
            toast.success('Event Updated')
        },

        /*
          Handle event resize
          ? Docs: https://fullcalendar.io/docs/eventResize
        */
        eventResize({ event: resizedEvent }) {
            dispatch(updateEvent(resizedEvent))
            toast.success('Event Updated')
        },

        ref: calendarRef,

        // Get direction from app state (store)
        direction: 'ltr'
    }

    return (
        <div>
            <Button.Ripple className='mb-2 justify-content-end align-items-center d-flex' color='primary' onClick={toggle} outline>
                <ChevronDown size={16} className='mr-10 d-flex' />
                <span className='d-flex ml-10'>
                    แสดงปฏิทิน
                </span>
            </Button.Ripple>
            <Collapse isOpen={isOpen}>
                <Card className='d-flex shadow-none border-0 mb-0 rounded-0' style={{minHeight: "450px"}}  >
                    <CardBody className='pb-0'>
                        <FullCalendar {...calendarOptions}
                            locale={th}
                            height={350}
                        />{' '}
                    </CardBody>
                </Card>

            </Collapse>
        </div>
    )
}


export default memo(AppointmentCard)
