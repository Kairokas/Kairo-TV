import React from "react";
import { root, Home } from "./App";

// header.render(
//   <React.StrictMode>
//     <CookiesProvider>
//       <Authenticate />
//     </CookiesProvider>
//     <HeaderContent />
//   </React.StrictMode>
// );
root.render(
  //<React.StrictMode>
    <Home />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
