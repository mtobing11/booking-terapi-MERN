import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCartShopping, faPeopleGroup, faUserCheck, faCalendar, faSquarePollVertical, faPenToSquare, faFillDrip, faChartLine, faChartArea, faChartColumn, faChartPie, faCoins, faChartSimple, faTriangleExclamation, faChartBar, faMicrophone } from '@fortawesome/free-solid-svg-icons'

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: <FontAwesomeIcon icon={faBagShopping} />,
        link: 'ecommerce',
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'New Booking Date',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        link: 'newdate',
      },
      {
        name: 'customers today',
        icon: <FontAwesomeIcon icon={faPeopleGroup} />,
        link: 'bookdate',
      },
      {
        name: 'customers tomorrow',
        icon: <FontAwesomeIcon icon={faUserCheck} />,
        link: 'bookdate',
      },
      {
        name: 'Announce Message',
        icon: <FontAwesomeIcon icon={faMicrophone} />,
        link: 'announce',
      },
    ],
  },
];

export const linksOriginal = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: <FontAwesomeIcon icon={faBagShopping} />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'orders',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
      },
      {
        name: 'employees',
        icon: <FontAwesomeIcon icon={faPeopleGroup} />,
      },
      {
        name: 'customers',
        icon: <FontAwesomeIcon icon={faUserCheck} />,
      },
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'calendar',
        icon: <FontAwesomeIcon icon={faCalendar} />,
      },
      {
        name: 'kanban',
        icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
      },
      {
        name: 'editor',
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
      },
      {
        name: 'color-picker',
        icon: <FontAwesomeIcon icon={faFillDrip} />,
      },
    ],
  },
  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: <FontAwesomeIcon icon={faChartLine} />,
      },
      {
        name: 'area',
        icon: <FontAwesomeIcon icon={faChartArea} />,
      },

      {
        name: 'bar',
        icon: <FontAwesomeIcon icon={faChartColumn} />,
      },
      {
        name: 'pie',
        icon: <FontAwesomeIcon icon={faChartPie} />,
      },
      {
        name: 'financial',
        icon: <FontAwesomeIcon icon={faCoins} />,
      },
      {
        name: 'color-mapping',
        icon: <FontAwesomeIcon icon={faChartSimple} />,
      },
      {
        name: 'pyramid',
        icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
      },
      {
        name: 'stacked',
        icon: <FontAwesomeIcon icon={faChartBar} />,
      },
    ],
  },
];