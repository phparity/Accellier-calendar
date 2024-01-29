
import { IoIosPeople } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdSupervisorAccount } from "react-icons/md";
import { CgList } from "react-icons/cg";
import { FaStoreAlt, FaChartLine } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BarChartIcon from '@mui/icons-material/BarChart';

export const MenuIcons= ()=>{
 const main_menu_icons = [
   {
          id: "1",
          icr: <AiFillHome />,
          lnk: "#/home/customer",
        },
        {
          id: "2",
          icr: <GroupsIcon />,
          lnk: "#/home/venue",
        },
        {
          id: "3",
          icr: <FaMoneyBillWave />,
          lnk: "#",
        },
        {
          id: "4",
          icr: <ShoppingCartIcon />,
          lnk: "#",
        },
        {
          id: "5",
          icr: <EventIcon />,
          lnk: "#/home/contact",
        },
        {
          id: "6",
          icr: <CalendarMonthIcon />,
          lnk: "#",
        },
        {
          id: "7",
          icr: <SettingsIcon />,
          lnk: "#",
        },
        {
          id: "8",
          icr: <InventoryIcon />,
          lnk: "#",
        },
        {
          id: "9",
          icr: <SupervisedUserCircleIcon />,
          lnk: "#",
        },
        {
          id: "10",
          icr: <FaChartLine />,
          lnk: "#",
        },
      ];
      return[ main_menu_icons];
}

 