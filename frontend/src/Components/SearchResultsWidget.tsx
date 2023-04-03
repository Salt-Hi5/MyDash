import { useContext, useEffect, useState } from "react";
// import { UserContext } from '../Services/UserContext';
// import { getWeather, patchLocations } from "../Services/ApiClient";
// import { DateTime } from 'luxon';
// import { LocationSearch } from "./WeatherWidgetLocationSearch";
// import { EmailItem } from "../Types/Types";



// export const SearchResultsWidget = () => {
//     const { searchQuery, setActiveDetailView } = useContext(UserContext);

//     const searchUrl = `https://www.google.com/search?q=${searchQuery}`

//     const cancel = () => {
//         setActiveDetailView("");
//     }

//     return (
//         <section id="SearchResultsWidget"
//             className=" w-full opacity-90 
//                         flex flex-col overflow-auto
//                         shadow-md shadow-black" >

//             <div id="SearchResultsWidget--Header"
//                 className="width-full rounded-t-3xl p-5
//                             flex justify-between 
//                             bg-slate-500">

//                 <button onClick={(e) => { cancel() }}
//                     className="rounded-full w-10 h-10 pb-1
//                                 bg-white text-2xl font-light">x
//                 </button>
//             </div>

//             <div id="SearchResultsWidget--Body"
//                 className="p-12 rounded-b-3xl
//                             flex flex-col 
//                             bg-white text-black">

//             <iframe src={searchUrl}></iframe>
//             </div>

//         </section>
//     )
// }
