import { MdWeekend, MdEqualizer, MdOutlineWarning, MdLocalOffer, MdUpdate, MdPayment } from "react-icons/md";
import { BsTwitter, } from "react-icons/bs";


//dashboard card with icons
const iconCards = [
    { tittle: "Total Users", number: '1634', warning: 'See All Users', icon1: MdWeekend, icon2: MdOutlineWarning, bgColor: 'bg-[#C44742]', waringIconColor: 'text-red-500' },
    { tittle: "Total TaxFiles", number: '1064', warning: 'Tracked from Google Analytics', icon1: MdEqualizer, icon2: MdLocalOffer, bgColor: 'bg-[#57B05B]' },
    { tittle: "Completed Files", number: '622', warning: 'Just Updated', icon1: BsTwitter, icon2: MdUpdate, bgColor: 'bg-[#FC940B]' },
]

//dashboard card with link up button
const cardsData = [
    { tittle: 'All Submitted Tax Files', btntext: 'Click To See', btnBgColor: 'bg-green-500', btnbgHover: 'hover:bg-[#47A44B]' ,clickRoute:'taxfiles/'},
    { tittle: 'Application Logs', btntext: 'Click To See', btnBgColor: 'bg-orange-400', btnbgHover: 'hover:bg-[#F08F00]' ,clickRoute:''},
]


export {
    iconCards, cardsData
}