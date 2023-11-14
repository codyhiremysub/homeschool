import {
  RiSettings3Line,
  RiCoupon3Line,
  RiMoneyDollarBoxLine,
  RiCoupon5Line,
  RiContactsBook2Line,
} from 'react-icons/ri';
// import { AiOutlineBell } from 'react-icons/ai';
import {
  // MdOutlineAnalytics,
  MdOutlineContactSupport,
  // MdAttachMoney,
  MdOutlineEditLocation,
} from 'react-icons/md';
import { BiCheckShield } from 'react-icons/bi';
import { CgClipboard } from 'react-icons/cg';
import { TiDocumentText } from 'react-icons/ti';
import { FiMessageSquare } from 'react-icons/fi';

export const contractorSideBar = [
  // {
  //   name: 'Earn Rewards',
  //   link: '/contractors/earn-rewards',
  //   icon: MdAttachMoney,
  // },
  // {
  //   name: 'Notifications',
  //   link: '/contractors/notifications',
  //   icon: AiOutlineBell,
  // },
  // { name: 'KPIs', link: '/contractors/kpis', icon: MdOutlineAnalytics },
  {
    name: 'Leads',
    link: '/contractors/leads',
    icon: TiDocumentText,
    dropdownOptions: [
      {
        name: 'New Lead',
        link: '/contractors/leads/create',
      },
      { name: 'My Leads', link: '/contractors/leads' },
    ],
  },
  {
    name: 'Service Areas',
    link: '/contractors/service-areas',
    icon: MdOutlineEditLocation,
    dropdownOptions: [
      {
        name: 'Add New Service Area',
        link: '/contractors/service-areas/subscribe',
      },
      { name: 'My Service Areas', link: '/contractors/service-areas' },
    ],
  },
  {
    name: 'Discounts',
    link: '/contractors/discounts',
    icon: RiCoupon3Line,
    dropdownOptions: [
      { name: 'Create New Discount', link: '/contractors/discounts/create' },
      { name: 'My Discounts', link: '/contractors/discounts' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/contractors/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/contractors/contacts',
  },
  {
    name: 'Messaging',
    link: '/contractors/messaging',
    icon: FiMessageSquare,
  },
];

export const advertiserSideBar = [
  {
    name: 'Display Ads',
    link: '/advertisers/display-ads',
    icon: RiCoupon5Line,
  },
  {
    name: 'Coupon Ads',
    link: '/advertisers/coupon-ads',
    icon: RiCoupon3Line,
  },
  {
    name: 'Billing',
    link: '/advertisers/billing',
    icon: RiMoneyDollarBoxLine,
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/advertisers/messaging',
  },
];

export const generalContractorSidebar = [
  {
    name: 'Projects',
    icon: CgClipboard,
    link: '/general-contractors/projects',
    dropdownOptions: [
      { name: 'Create Project', link: '/general-contractors/projects/create' },
      { name: 'My Projects', link: '/general-contractors/projects' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/general-contractors/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/general-contractors/contacts',
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/general-contractors/messaging',
  },
];

export const homeownerSidebar = [
  {
    name: 'Projects',
    icon: CgClipboard,
    link: '/homeowners/projects',
    dropdownOptions: [
      { name: 'Create Project', link: '/homeowners/projects/create' },
      { name: 'My Projects', link: '/homeowners/projects' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/homeowners/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/homeowners/contacts',
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/homeowners/messaging',
  },
];

export const insuranceAgentSidebar = [
  {
    name: 'Projects',
    icon: CgClipboard,
    link: '/insurance-agents/projects',
    dropdownOptions: [
      { name: 'Create Project', link: '/insurance-agents/projects/create' },
      { name: 'My Projects', link: '/insurance-agents/projects' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/insurance-agents/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/insurance-agents/contacts',
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/insurance-agents/messaging',
  },
];

export const propertyManagerSidebar = [
  {
    name: 'Projects',
    icon: CgClipboard,
    link: '/property-managers/projects',
    dropdownOptions: [
      { name: 'Create Project', link: '/property-managers/projects/create' },
      { name: 'My Projects', link: '/property-managers/projects' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/property-managers/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/property-managers/contacts',
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/property-managers/messaging',
  },
];

export const realtorSidebar = [
  {
    name: 'Projects',
    icon: CgClipboard,
    link: '/realtors/projects',
    dropdownOptions: [
      { name: 'Create Project', link: '/realtors/projects/create' },
      { name: 'My Projects', link: '/realtors/projects' },
    ],
  },
  {
    name: 'Insurance',
    icon: BiCheckShield,
    link: '/realtors/insurance',
  },
  {
    icon: RiContactsBook2Line,
    name: 'Contacts',
    link: '/realtors/contacts',
  },
  {
    icon: FiMessageSquare,
    name: 'Messaging',
    link: '/realtors/messaging',
  },
];

export const defaultSidebar = [
  {
    name: 'Support',
    link: '/support',
    icon: MdOutlineContactSupport,
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: RiSettings3Line,
  },
];
