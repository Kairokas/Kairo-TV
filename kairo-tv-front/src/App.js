import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import Popup from 'reactjs-popup';

export const header = ReactDOM.createRoot(document.getElementById("header-content"));
export const root = ReactDOM.createRoot(document.getElementById("root"));

 // setter
// localStorage.setItem('my-key', textForStorage);

// // getter
// const textFromStorage = localStorage.getItem('my-key');
// localStorage.setItem('items', JSON.stringify(items));  

//   render () {
//     return (
//       <JWTToken.Provider value={auth()}>
//         <HeaderContent />
//       </JWTToken.Provider>
//     )
//   };
// }

export function Home(props) {
  const [isTokenOK, changeIsTokenOK] = React.useState(false);

  async function checkIsTokenOK() {
    const token = localStorage.getItem('JWTToken');
    let result;
  
    if (!token) {
      console.log('Not Authorized');
      return false;
    } else {
      await fetch(
        "http://localhost:3000/api/v1/token", {
          method: 'GET', 
            headers: {
            'Authorization': token,
          }
        })
        .then((response) => {
          let res = response.json();
          //console.log(res);
          return res;
        })
        .then((data) => {
          //console.log(data);
          result = data;
        });
      //console.log(result);
      // console.log(token);
      if (result.success) {
        console.log('Authorized');
        return true;
      } else {
        console.log('Not Authorized');
        return false;
      }
    }
  }

  async function checkToken() {
    changeIsTokenOK(await checkIsTokenOK());
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      {isTokenOK?<AuthenticatedHome />:<UnAuthenticatedHome />}
    </div>
  )
}

// export class Home extends React.Component {
//   // constructor() {
//   //   super();
//   //   this.state = {isAuthenticated: false};
//   // }

//   //this.setState({isAuthenticated: true});
  
//   // checkToken = async () => {
//   //   return await isTokenOK();
//   // };

//   // async checkToken() {
//   //   return await isTokenOK();
//   // }

//   render() {
//     return (
//       <div>
//         {console.log(isTokenOK())}
//         {isTokenOK()?<AuthenticatedHome />:<UnAuthenticatedHome />}
//       </div>
//     )
//   }
// }

export function UnAuthenticatedHome(props) {
  const [errorMessage, changeErrorMessage] = React.useState('');
  const [username, changeUsername] = React.useState('');
  const [password, changePassword] = React.useState('');

  // const [showLogin, updateShowLogin] = React.useState(false);

  // function showLoginC() {
  //   updateShowLogin(true);
  // }

  function handleChange(event) {
    //console.log(event);
    if (event.target.name === 'password') {
      changePassword(event.target.value);
    } else if (event.target.name === 'username') {
      changeUsername(event.target.value);
    }
    //this.setState({value: event.target.value});
  }

  //anehls0
  //VSjkzibw

  async function handleSubmit() {
    const authentication = await authenticate(username, password);
    console.log("login vastus, mis siia ei jõua vahepeal?: " + JSON.stringify(authentication));
    if (authentication.authenticated) {
      localStorage.setItem('JWTToken', authentication.token);
      window.location.reload(false);
    } else {
      changeErrorMessage('Viga kasutajanimes või paroolis');
    }
  }

  // <Popup trigger={<button> Trigger</button>} position="right center">
  //   <div>Popup content here !!</div>
  // </Popup>

  return (
    <div>
      <header id="controls">
        {/* <div id="controls-parent"> */}
        <a className="home-button" href="./">
          Home/Logo
        </a>
        <ul id="controls-right">
          <li>
            <a
              id="stats-button"
              className="menu-button fa fa-bar-chart"
              //onClick={() => StatsController()}
            ></a>
          </li>
          <li>
            <Popup
              trigger={<a id="users-button" className="menu-button fa fa-user"></a>}
              modal>
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  {/* <div className="header">Login</div> */}
                  <div className="content">
                    <label>
                      Username:
                      <input onChange={handleChange} type="username" placeholder="Enter Username" name="username" required/>
                    </label>
                    <label>
                      Password:
                      <input onChange={handleChange} type="password" placeholder="Enter Password" name="password" required/>
                    </label>
                    <input type="submit" value="Login" onClick={handleSubmit} />
                    <p id='error-text'>{errorMessage}</p>
                    {/* <button
                      className="button"
                      onClick={() => {
                        if (authenticate()) {
                          <ContentController />
                          close();
                        } else {
                          <p id='error-text'>Viga kasutajanimes või paroolis</p>
                        }
                      }}>
                      Login
                    </button> */}
                  </div>
                  {/* <div className="actions">
                    
                  </div> */}
                </div>
              )}
            </Popup>
          </li>
        </ul>
      </header>
      {/* {showLogin?
      
        <div id="login-screen">
          <div id="login-screen-content">
            <span className="close">&times;</span>
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required/>

            <button type="submit">Login</button>
          </div>
        </div>
      :''} */}
    </div>
  );
}

// export function AuthenticatedHome(props) {

// }

class AuthenticatedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};
  }

  handleChange (e) {
    this.setState({searchText: e.target.value});
  }
  
  render() {
    return (
      <div>
      <header id="controls">
        {/* <div id="controls-parent"> */}
        <a className="home-button" href="./">
          Home/Logo
        </a>
        <ul id="controls-right">
            <li>
              <a
                id="stats-button"
                className="menu-button fa fa-bar-chart"
                //onClick={() => StatsController()}
              ></a>
            </li>
            <li>
              <div className="menu-button" /*onClick={() => SettingsController()}*/>
                <img
                  id="settings-button"
                  src="./icons/cog2_darker.png"
                  alt="Settings" />
              </div>
            </li>
            <li>
              <i className="menu-button fa fa-sign-out" aria-hidden="true" onClick={()=>{
                localStorage.removeItem('JWTToken');
                window.location.reload(false);
              }}></i>
            </li>
            <li>
              <input
                onChange={(e) => {this.handleChange(e)}}
                value={this.state.value}
                id="search-input"
                type="search"
                placeholder="Mida otsime na?"
              ></input>
            </li>
          </ul>
        {/* https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify */}
        {/* {props.onScreen === "Settings" ? (
          <ul id="controls-right">
            <li>
              <a id="series-button" className="menu-button fa fa-tv"></a>
            </li>
            <li>
              <a id="movies-button" className="menu-button fa fa-film"></a>
            </li>
            <li>
              <a id="users-button" className="menu-button fa fa-user"></a>
            </li>
            <li>
              <a
                className="menu-button"
                //onClick={() => root.render(<HomeContent />)}
              >
                <svg
                  alt="Home"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
              </a>
            </li>
          </ul>
        ) : (
        )} */}
        {/* </div> */}
      </header>
      {/* {console.log(this.state.searchText)} */}
      <HomeContent keyword={this.state.searchText} />
    </div>
    )
  }
}

// export function ContentController(props) {
//   const isAuthenticated = useContext(isAuthenticatedContext);
//   console.log(isAuthenticated);
//   console.log("asdasd");
//   if (isAuthenticated) {
//     // return (<AuthenticatedControls />);
//     return '';
//   } else {
//     return (<UnAuthenticatedControls />);
//   }
// }

// export function AuthenticatedHome(props) {
//   const [searchText, updateSearchText] = React.useState();

//   const handleChange = (event) => {
//     updateSearchText(event.target.value);
//   };

//   return (
//     <div>
//       <header id="controls">
//         {/* <div id="controls-parent"> */}
//         <a className="home-button" href="./">
//           Home/Logo
//         </a>
//         {/* https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify */}
//         {props.onScreen === "Settings" ? (
//           <ul id="controls-right">
//             <li>
//               <a id="series-button" className="menu-button fa fa-tv"></a>
//             </li>
//             <li>
//               <a id="movies-button" className="menu-button fa fa-film"></a>
//             </li>
//             <li>
//               <a id="users-button" className="menu-button fa fa-user"></a>
//             </li>
//             <li>
//               <a
//                 className="menu-button"
//                 //onClick={() => root.render(<HomeContent />)}
//               >
//                 <svg
//                   alt="Home"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
//                 </svg>
//               </a>
//             </li>
//           </ul>
//         ) : (
//           <ul id="controls-right">
//             <li>
//               <a
//                 id="stats-button"
//                 className="menu-button fa fa-bar-chart"
//                 //onClick={() => StatsController()}
//               ></a>
//             </li>
//             <li>
//               <div className="menu-button" /*onClick={() => SettingsController()}*/>
//                 <img
//                   id="settings-button"
//                   src="./icons/cog2_darker.png"
//                   alt="Settings" />
//               </div>
//             </li>
//             <li>
//               <input
//                 onChange={handleChange}
//                 value={searchText ? searchText : ""}
//                 id="search-input"
//                 type="search"
//                 placeholder="Mida otsime na?"
//               ></input>
//             </li>
//           </ul>
//         )}
//         {/* </div> */}
//       </header>
//       {searchText?<HomeContent keyword={searchText} />:<HomeContent />}
//     </div>
//   );
// }

async function authenticate(username, password) {
  // default väärtus juhul kui fetch ei tagasta midagi
  let result = {authenticated: false};

  let data = {
    username: username,
    password: password
  }
  //console.log(data);
  // const [isAuthenticated, changeIsAuthenticated] = React.useState(false);
  // const [token, changeToken] = React.useState();
  //const token = useContext(JWTToken);
  //const isAuthenticated = useContext(isAuthenticated);
  // const username = 'anehls0';
  // const data = { username: username, password: 'VSjkzibw' };
  
  await fetch(
  "http://localhost:3000/api/v1/login", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then((response) => {
    let res = response.json();
    //console.log(res);
    return res;
  })
  .then((data) => {
    //console.log(data);
    result = data;
  });

  console.log("fetch login vastus: " + JSON.stringify(result));

  if (result.error === "Username or password missing") {
    //changeIsAuthenticated(false);

    return {authenticated: false};
  } else if (result.success) {
    //console.log(data);
    // changeUser(username);
    //changeToken(data.token);
    //changeIsAuthenticated(true);

    return {authenticated: true, token: result.token};
  }
}

// function LoginScreen() {
//   return(
  
//   // return (
//   //   <div id="login-screen">
//   //     <label for="username"><b>Username</b></label>
//   //     <input type="text" placeholder="Enter Username" name="username" required/>

//   //     <label for="password"><b>Password</b></label>
//   //     <input type="password" placeholder="Enter Password" name="password" required/>

//   //     <button type="submit">Login</button>
//   //   </div>
//   // );
// }

export function HomeContent(props) {
  const keyword = props.keyword;

  const [movies, changeMovies] = React.useState([]);
  const token = localStorage.getItem("JWTToken");

  function getAllMovies() {
    fetch("http://localhost:3000/api/v1/movies", {
      headers: {
      'Authorization': token,
    }})
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        if (data.error === "Invalid token") {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }        
      });
  }

  function getContentByTitle() {
    fetch(`http://localhost:3000/api/v1/movies/${keyword}`, {
      headers: {
      'Authorization': token,
    }})
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        if (data.message === "No movie titles match your searched keyword.") {
          changeMovies([]);
        } else if ((data.error === "Invalid token")) {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }
      });
  }
  
  React.useEffect(() => {
    //console.log(token);
    //console.log(keyword);
    // if (token) {
      //console.log(keyword);
      if (keyword === '') {
        //console.log("pärime kõik");
        getAllMovies();
      } else {
        //console.log("pärime keywordiga");
        getContentByTitle();
      }
    // }
  }, [keyword]);
  // console.log(movies);
  // console.log(token);
  let renderedOutput = movies.map((item) => (
    <div className="content-container" key={item.Title}>
      {item.Title}
    </div>
  ));

  return (
    <section>
      <div id="content-parent">{renderedOutput}</div>
    </section>
  );
}

// export function HomeContent(props) {
//   const token = useContext(JWTToken);
//   console.log(token);
//   // const Redirect = window.ReactRouterDOM.Redirect;
//   const [movies, changeMovies] = React.useState([]);

//   function getAllMovies() {
//     fetch("http://localhost:3000/api/v1/movies", {
//       headers: {
//       'Authorization': token,
//     }})
//       .then((response) => {
//         let res = response.json();
//         //console.log(res);
//         return res;
//       })
//       .then((data) => {
//         console.log(data.message);
//         changeMovies(data.movies);
//       });
//   }

//   function getContentByTitle(keyword) {
//     fetch(`http://localhost:3000/api/v1/movies/${keyword}`, {
//       headers: {
//       'Authorization': token,
//     }})
//       .then((response) => {
//         let res = response.json();
//         //console.log(res);
//         return res;
//       })
//       .then((data) => {
//         console.log(data);
//         if (data.message === "No movie titles match your searched keyword.") {
//           changeMovies([]);
//         } else {
//           changeMovies(data.movies);
//         }
//       });
//   }

//   if (!props.keyword) {
//     //console.log("parsime kõiki");
//     //getAllMovies();
//     // teine muutuja defineerib jälgitavad objektid, peale mida tõmmatakse func käima
//     React.useEffect(() => {
//       getAllMovies();
//     }, [props]);
//   } else if (props.keyword) {
//     //console.log("parsime otsitut");
//     //getContentByTitle(props.keyword)
//     // teine muutuja defineerib jälgitavad objektid, peale mida tõmmatakse func käima
//     React.useEffect(() => {
//       getContentByTitle(props.keyword);
//     }, [props]);
//   }

//   React.useEffect(() => {
//     getAllMovies();
//   },[]);

//   let renderedOutput = movies.map((item) => (
//     <div className="content-container" key={item.Title}>
//       {item.Title}
//     </div>
//   ));

//   return (
//     <section>
//       <div id="content-parent">{renderedOutput}</div>
//     </section>
//   );
// }

// function SettingsController() {
//   header.render(
//     <React.StrictMode>
//       <HeaderContent onScreen="Settings" />
//     </React.StrictMode>
//   );

//   root.render(
//     <div></div>
//   );
// }

// function StatsController() {
//   root.render(
//     <div></div>
//   );
// }
