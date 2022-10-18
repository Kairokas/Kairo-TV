import React from "react";
import { HomeContent, HeaderContent, header, content } from "./App";

header.render(
  <React.StrictMode>
    <HeaderContent />
  </React.StrictMode>
);
content.render(
  <React.StrictMode>
    <HomeContent />
  </React.StrictMode>
);

// if (settingsScreen) {
//   header.render(
//     <React.StrictMode>
//       <HeaderContent onScreen='Settings' />
//     </React.StrictMode>
//   );
// } else {
//   header.render(
//     <React.StrictMode>
//       <HeaderContent />
//     </React.StrictMode>
//   );
//   content.render(
//     <React.StrictMode>
//       <HomeContent />
//     </React.StrictMode>
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
