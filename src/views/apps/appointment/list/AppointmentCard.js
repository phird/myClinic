// ** React Imports
import { useEffect, useState, useRef, memo } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Calendar, Menu } from 'react-feather'

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


const AppointmentCard = () => {
    // ** State
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    // ** Refs
    const calendarRef = useRef(null)

    // ** Props


    // ** UseEffect checks for CalendarAPI Update

    // ** calendarOptions(Props)
    const calendarOptions = {
        events: [],
        plugins: [interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
            start: 'prev,title,next,',
            end: 'timeGridWeek'
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
        dayMaxEvents: 2,

        /*
          Determines if day names and week names are clickable
          ? Docs: https://fullcalendar.io/docs/navLinks
        */
        navLinks: true,

        eventClassNames({ event: calendarEvent }) {
            // eslint-disable-next-line no-underscore-dangle
            const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

            return [
                // Background Color
                `bg-light-${colorName}`
            ]
        },

        eventClick({ event: clickedEvent }) {
            dispatch(selectEvent(clickedEvent))
            handleAddEventSidebar()

            // * Only grab required field otherwise it goes in infinity loop
            // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
            // event.value = grabEventDataFromEventApi(clickedEvent)

            // eslint-disable-next-line no-use-before-define
            // isAddNewEventSidebarActive.value = true
        },

        customButtons: {
            sidebarToggle: {
                text: <Menu className='d-xl-none d-block' />,
                click() {
                    toggleSidebar(true)
                }
            }
        },

        dateClick(info) {
            const ev = blankEvent
            ev.start = info.date
            ev.end = info.date
            dispatch(selectEvent(ev))
            handleAddEventSidebar()
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
                <Calendar size={16} className='mr-10 d-flex' />
                <span className='d-flex ml-10'>
                    ปฏิทิน
                </span>
            </Button.Ripple>
            <Collapse isOpen={isOpen}>
                <div className='d-flex p-1 border' style={{minHeight: "400px"}}>
                    {/* <img className='me-2' src={collapseImg} alt='collapse-img' height='400' />
                <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is
                    that it has a more-or-less normal distribution of letters.
                </span> */}
                    <Card className='shadow-none border-0 mb-0 rounded-0' style={{minHeight: "400"}}>
                        <CardBody className='pb-0'>
                            <FullCalendar {...calendarOptions}
                                locale={th}
                                height={40}
                            />{' '}
                        </CardBody>
                    </Card>
                </div>
            </Collapse>
        </div>
    )
}


export default AppointmentCard
