import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import Popup from 'reactjs-popup';
import {Bar} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

async function userExists(username) {
  let result;
  
  await fetch(
    `http://localhost:3000/api/v1/userexists/${username}`, {
      method: 'GET',
    }
  ).then((response) => {
      let res = response.json();

      return res;
    }
  ).then((data) => {
      result = data;
    }
  );

  if (result.success) {
    console.log("Kasutaja on juba olemas!" + JSON.stringify(result));
    return true;
  } else {
    console.log("Kasutajat ei eksisteeri" + JSON.stringify(result));

    return false;
  }
}

async function registerUser(email, username, password) {
  let result;
  const data = {
    email: email,
    username: username,
    password: password
  }

  await fetch(
    `http://localhost:3000/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      let res = response.json();

      return res;
    })
    .then((data) => {
      result = data;
    });

  if (result.success) {
    console.log("Kasutaja lisatud" + JSON.stringify(result));
    return result;
  } else {
    console.log("Kasutaja EI lisatud" + JSON.stringify(result));
    return result;
  }
}

export function Home(props) {
  const [isTokenOK, changeIsTokenOK] = React.useState(false);
  const [username, changeUsername] = React.useState();
  
  async function checkIsTokenOK() {
    const token = localStorage.getItem('JWTToken');
    let result;
  
    if (!token) {
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
          return res;
        })
        .then((data) => {
          result = data;
        });

      if (result.success) {
        console.log('Authorized');
        changeUsername(result.user);
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
      {isTokenOK?<AuthenticatedHome user={username} />:<UnAuthenticatedHome />}
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
//         {isTokenOK()?<AuthenticatedHome />:<UnAuthenticatedHome />}
//       </div>
//     )
//   }
// }

async function login(username, password) {
  const authentication = await authenticate(username, password);

  if (authentication.authenticated) {
    localStorage.setItem('JWTToken', authentication.token);

    return true;
  } else {
    return false;
  }
}

export function UnAuthenticatedHome(props) {
  const [errorMessage, changeErrorMessage] = React.useState('');
  const [username, changeUsername] = React.useState('');
  const [password, changePassword] = React.useState('');

  // const [showLogin, updateShowLogin] = React.useState(false);

  // function showLoginC() {
  //   updateShowLogin(true);
  // }

  function handleChange(event) {
    if (event.target.name === 'password') {
      changePassword(event.target.value);
    } else if (event.target.name === 'username') {
      changeUsername(event.target.value);
    }
    //this.setState({value: event.target.value});
  }

  async function handleSubmit() {
    if (!await login(username, password)) {
      console.log('login failed');
      changeErrorMessage('Viga kasutajanimes või paroolis');
    } else {
      window.location.reload(false);
    }
  }

  // <Popup trigger={<button> Trigger</button>} position="right center">
  //   <div>Popup content here !!</div>
  // </Popup>
  //console.log(page);
  return (
    <div>
      <header id="controls">
        {/* <div id="controls-parent"> */}
        <a className="home-button" href="./">
          Home/Logo
        </a>
        <ul id="controls-right">
          <li>
            <Popup trigger={<a id="users-button" className="menu-button fa fa-user"></a>} modal>
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
      <UnAuthenticatedHomeContent />
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

class UnAuthenticatedHomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', username: '', password: '', error: '', registerSucess: false, countdownSeconds: 5};

    this.handleCountdown = this.handleCountdown.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'password') {
      this.setState({password: e.target.value});
    } else if (e.target.name === 'username') {
      this.setState({username: e.target.value});
    } else if (e.target.name === 'email') {
      this.setState({email: e.target.value});
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (await userExists(this.state.username)) {
      this.setState({error: "Selline kasutajanimi on juba olemas!"});

      // if (authenticate(this.state.username, this.state.password)) {

      // } else {
      //   this.setState({error: ""});
      // }
    } else {
      const addUserTrueOrMessage = await registerUser(this.state.email, this.state.username, this.state.password);

      if (addUserTrueOrMessage.success === true) {
        this.setState({registerSucess: true});
        this.handleCountdown();

        //login(this.state.username, this.state.password);

        //window.location.reload(false);
      } else {
        this.setState({error: addUserTrueOrMessage.message});
      }
    }

    // if (pwregex.test(this.state.password)) {

    // } else {
    //   this.setState({error: "Parool ei vasta nõuetele!"});
    // }
  }

  handleCountdown() {
    setInterval(
      () => {
        this.setState({error: `Registreerimine õnnestus, Teid suunatakse ${this.state.countdownSeconds}... sekundi pärast edasi`});

        this.setState({countdownSeconds: this.state.countdownSeconds - 1});
        
        if(this.state.countdownSeconds === 0) {
          window.location.reload(false);
        }
      },
      1000
    );
  };

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email address:
            <input onChange={this.handleChange} value={this.state.email} type="text" name="email" placeholder="Email address"></input>      
            Username:
            <input onChange={this.handleChange} value={this.state.username} type="text" name="username" placeholder="Kasutajanimi"></input>      
            Password:
            <input data-toggle="tooltip" data-placement="top" title="8 tähemärki, 1 suur täht, 1 sümbol" onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="Parool">
              
            </input>
          </label>
          <input type="submit" value="Rega!" />
        </form>
        {this.state.error!=''?this.state.error:''}
      </div>
    );
  }
}

// export function AuthenticatedHome(props) {

// }

class AuthenticatedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: '', page: '', roles: '', username: props.user};
  }

  handleChange (e) {
    this.setState({searchText: e.target.value});
  }

  // componentDidMount() is invoked immediately after a component is mounted 
  //(inserted into the tree). Initialization that requires DOM nodes should go here. 
  //If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  async componentDidMount() {
    const token = localStorage.getItem('JWTToken');

    await fetch(`http://localhost:3000/api/v1/userroles/${this.state.username}`, {
    //fetch("http://localhost:3000/api/v1/users", {
      headers: {
      'Authorization': token,
    }}).then((response) => {
        let res = response.json();

        return res;
      }).then((data) => {
        if (data.success) {
          this.setState({roles: data.roles});
        }
      });
  }

  // küsime rolle ja vastavalt sellele näitame kas admin paneeli valikus v mitte
  
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
              onClick={() => this.setState({page: "Stats"})}
            ></a>
          </li>
          <li>
            <i 
              className="menu-button fa fa-cog" 
              aria-hidden="true" 
              onClick={() => this.setState({page: "Settings"})}
            >
            </i>
          </li>
          {this.state.roles.includes('admin')?
          <li>
            <i 
              className="menu-button fa icon-dashboard" 
              aria-hidden="true" 
              onClick={() => this.setState({page: "AdminPanel"})}
            >
            </i>
          </li>
          :
          ''}
          <li>
            <i className="menu-button fa fa-sign-out" aria-hidden="true" onClick={()=>{
                localStorage.removeItem('JWTToken');
                window.location.reload(false);
              }}>
            </i>
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
      {/* {console.log(this.state.page)} */}
      {this.state.page === ''?<HomeContent keyword={this.state.searchText} />:
        this.state.page === 'Stats'?<Stats />:
          this.state.page === 'Settings'?<Settings />:<AdminPanel loggedUsername={this.state.username} searchkeyword={this.state.searchText} />
      }
      
    </div>
    )
  }
}

async function authenticate(username, password) {
  // default väärtus juhul kui fetch ei tagasta midagi
  let result;

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

  //if (result.error === "Username or password missing") {
  if (result.success === false) {
    //changeIsAuthenticated(false);

    return {authenticated: false};
  } else {
    //console.log(data);
    // changeUser(username);
    //changeToken(data.token);
    //changeIsAuthenticated(true);

    return {authenticated: true, token: result.token};
  }
}

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
        if (!data.success) {
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
        return res;
      })
      .then((data) => {
        if (!data.success) {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }
      });
  }
  
  React.useEffect(() => {
    // if (token) {
      if (keyword === '') {
        //console.log("pärime kõik");
        getAllMovies();
      } else {
        //console.log("pärime keywordiga");
        getContentByTitle();
      }
    // }
  }, [keyword]);
  
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

export function Stats(props) {
  const [movies, changeMovies] = React.useState([]);
  const token = localStorage.getItem("JWTToken");
  let movieYearsCount = {};

  function getAllMovies() {
    fetch("http://localhost:3000/api/v1/movies", {
      headers: {
      'Authorization': token,
    }})
      .then((response) => {
        let res = response.json();
        
        return res;
      })
      .then((data) => {
        if (!data.success) {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }        
      });
  }

  React.useEffect(() => {
    getAllMovies();
  }, []);

  movies.map((item) => {
    if (movieYearsCount[item.ReleaseYear] === undefined) {
      movieYearsCount[item.ReleaseYear] = 1;
    } else {
      movieYearsCount[item.ReleaseYear] += 1;
    }
  });

  return (
    <div>
      <Bar data={{
        datasets: [
          {
            label: "filmid",
            data: Object.values(movieYearsCount),
            backgroundColor: "rgba(192, 192, 192, 0.8)",
          },
        ],
        labels:Object.keys(movieYearsCount) 
      }}  />
    </div>
  );
}

export function AdminPanel(props) {
  const keyword = props.searchkeyword;
  const [users, changeUsers] = React.useState([]);
  const token = localStorage.getItem("JWTToken");

  function getAllUsersRoles() {
    fetch("http://localhost:3000/api/v1/usersroles", {
    //fetch("http://localhost:3000/api/v1/users", {
      headers: {
      'Authorization': token,
    }})
      .then((response) => {
        let res = response.json();

        return res;
      })
      .then((data) => {
        if (!data.success) {
          changeUsers([]);
        } else {
          changeUsers(data.users);
        }        
      });
  }

  async function handleRoleChange(user, event) {
    let newRoles;

    if (event.target.name === 'promote') {
      newRoles = ['user', 'admin'];
    } else {
      // if (user === props.loggedUsername) {
      //   window.alert('Iseendalt ei saa admin õigusi eemaldada!')
      //   return;
      // }

      newRoles = ['user'];
    }
    
    fetch(`http://localhost:3000/api/v1/userroles/${user}`, {
    //fetch("http://localhost:3000/api/v1/users", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({username: user, roles: newRoles})
    }).then((response) => {
      let res = response.json();

      return res;
    }).then((data) => {
      if (data.success) {
        getAllUsersRoles();
      }
      //   changeUsers([]);
      // } else {
      //   changeUsers(data.users);
      // }        
    });
  }
  
  React.useEffect(() => {
    getAllUsersRoles();
  }, []);
  
  let renderedOutput = users.map((item) => (
    <div className="content-container" key={item.username}>
      {item.username}
      {item.roles.includes('admin')?
      <div>
        <p>Administraator</p>
        {item.username === props.loggedUsername?'':
        <input type="button" value="Alanda tavaks" name='demote' onClick={(e) => handleRoleChange(item.username, e)}/>}
      </div>
      :
      <div>
        <p>Tavakasutaja</p>
        <input type="button" value="Ülenda adminiks" name='promote' onClick={(e) => handleRoleChange(item.username, e)}/>
      </div>
        }
    </div>
  ));

  return (
    <section>
      <div id="content-parent">{renderedOutput}</div>
    </section>
  );
}

export function Settings(props) {

}

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

// TODO
// iga x aja tagant vaadatakse tagataustal kas token kehtib - kui mitte, siis logitakse välja
// regamisel olemasolev kasutaja asemel soovitatakse ka teisi nimesid, mis saadaval
// username võiks ära eemaldada ja jätta aind emaili
