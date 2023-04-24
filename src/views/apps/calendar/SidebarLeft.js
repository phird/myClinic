// ** React Import
import { Fragment, useEffect, useRef, memo } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input, Label, Row, Col } from 'reactstrap'
import { Menu } from 'react-feather'
// ** illustration import
import illustration from '@src/assets/images/pages/calendar-page-cartoon.png'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import toast from 'react-hot-toast'
import th from '@fullcalendar/core/locales/th'

const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  const calendarRef = useRef(null)



  const calendarOptions = {
    events: store.events.length ? store.events : [],
    plugins: [interactionPlugin, timeGridPlugin],
    initialView: 'timeGridDay',
    headerToolbar: {
      start: 'prev ,title,  next,',
      end: ''
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

  const containerStyle = {
    height: '400px !important',
    width: '300px !important'
  };

  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        {/* <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3' style={{minWidth: "250px", maxWidth: "250px"}}>
          <Button color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'> เพิ่มการนัดหมาย </span>
          </Button>
        </CardBody> */}
        <CardBody xs="12" >
          <Row xs="12">
            <Col>
              <div /* style={{ height: '150px !important' }} */>
                <FullCalendar {...calendarOptions}
                  locale={th}
                  height={"200px !important"}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment >
  )
}

export default SidebarLeft
