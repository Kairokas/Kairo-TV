import React from "react";
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

async function tokenChecker() {
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
      }).then((response) => {
        let res = response.json();
  
        return res;
      }).then((data) => {
        result = data;
      });

    if (result.success) {
      console.log('Authorized');
      
      return result;
    } else {
      console.log('Not Authorized');
      return false;
    }
  }
}

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

  React.useEffect(() => {
    async function fuckToken() {
      const response = await tokenChecker();

      if (response.success) {
        changeUsername(response.user);

        changeIsTokenOK(true);
      } else {
        changeIsTokenOK(false);
      }
    }

    fuckToken();
  }, []);

  return (
    <div>
      {isTokenOK?<AuthenticatedHome user={username} />:<UnAuthenticatedHome />}
    </div>
  )
}

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

  function handleChange(event) {
    if (event.target.name === 'password') {
      changePassword(event.target.value);
    } else if (event.target.name === 'username') {
      changeUsername(event.target.value);
    }
    //this.setState({value: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!await login(username, password)) {
      console.log('login failed');
      changeErrorMessage('Viga kasutajanimes või paroolis');
    } else {
      window.location.reload(false);
    }
  }

  return (
    <div>
      <header id="controls">
        {/* <div id="controls-parent"> */}
        <a className="home-button" href="./">
          Home/Logo
        </a>
        <ul id="controls-right">
          <li>
            <Popup trigger={<i id="users-button" className="menu-button fa fa-user"></i>} modal>
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  {/* <div className="header">Login</div> */}
                  <div className="content">
                    <form onSubmit={handleSubmit}>
                      {/* <label htmlFor="username">Kasutaja nimi:</label><br/> */}
                      <input className="reg-input neumo-input" onChange={handleChange} type="username" placeholder="Enter Username" name="username" required/>
                      {/* <label htmlFor="password">Parool:</label><br/> */}
                      <input className="reg-input neumo-input" onChange={handleChange} type="password" placeholder="Enter Password" name="password" required/>

                      <input id="reg-button" type="submit" value="Login" />
                    </form>
                    <p id='error-text'>{errorMessage}</p>
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
  }

  handleCountdown() {
    // lahendab bugi, et 1 sekund peab ootama enne kui countdown hakkab
    this.setState({error: `Registreerimine õnnestus, Teid suunatakse ${this.state.countdownSeconds}... sekundi pärast edasi`});

    login(this.state.username, this.state.password);
    
    this.setState({countdownSeconds: this.state.countdownSeconds - 1});
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
      <div className="body">
        <div className="registration neumo-div">
          <h2>REGISTREERUMINE</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              {/* Emaili aadress: */}
              <input required className="reg-input neumo-input" onChange={this.handleChange} value={this.state.email} type="email" name="email" placeholder="Email aadress"></input>      
              <br/>
              {/* Kasutajanimi: */}
              <input required className="reg-input neumo-input" onChange={this.handleChange} value={this.state.username} type="text" name="username" placeholder="Kasutajanimi"></input>      
              <br/>
              {/* Parool: */}
              <input required className="reg-input neumo-input" data-toggle="tooltip" data-placement="top" title="8 tähemärki, 1 suur täht, 1 sümbol" onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="Parool"></input>
            </label>
            <input id="reg-button" type="submit" value="Rega!" />
          </form>
          {this.state.error !== ''?this.state.error:''}
        </div>
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
            <i
              id="stats-button"
              className="menu-button fa fa-bar-chart"
              onClick={() => this.setState({page: "Stats"})}
            ></i>
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
              className="neumo-input"
              type="search"
              placeholder="Mida otsime na?"
            ></input>
          </li>
        </ul>
      </header>

      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/HkRjIq8Cp2A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      
      {/* {console.log(this.state.page)} */}
      {this.state.page === ''?<HomeContent keyword={this.state.searchText} />:
        this.state.page === 'Stats'?<Stats />:
          this.state.page === 'Settings'?<Settings loggedUsername={this.state.username} />:<AdminPanel loggedUsername={this.state.username} searchkeyword={this.state.searchText} />
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

    return '';
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
  const user = props.loggedUsername;
  const [email, changeEmail] = React.useState('');
  const [oldPassword, changeOldPassword] = React.useState('');
  const [newPassword, changeNewPassword] = React.useState('');
  const [confNewPassword, changeConfNewPassword] = React.useState('');
  const [error, changeError] = React.useState('');

  function handleChange(event) {
    if (event.target.name === 'email') {
      changeEmail(event.target.value);
    } else if (event.target.name === 'old_password') {
      changeOldPassword(event.target.value);
    } else if (event.target.name === 'new_password') {
      changeNewPassword(event.target.value);
    } else if (event.target.name === 'conf_new_password') {
      changeConfNewPassword(event.target.value);
    }
    //this.setState({value: event.target.value});
  }

  async function uploadChangedData(event) {
    let data = {email: email, oldPassword: oldPassword, newPassword: confNewPassword};
    event.preventDefault();

    if (newPassword !== confNewPassword) {
      changeError('Uued paroolid peavad ühtima!');

      return;
    }

    fetch(`http://localhost:3000/api/v1/users/${user}`, {
    //fetch("http://localhost:3000/api/v1/users", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('JWTToken')
      },
      body: JSON.stringify(data)
    }).then((response) => {
      let res = response.json();

      return res;
    }).then((data) => {
      if (data.success) {
        changeError('Kasutajaandmed muudetud!');
      } else {
        changeError(data.message);
      }    
    });
  }

  return (
    <section>
      <div>
        <form onSubmit={uploadChangedData}>
          <label htmlFor="email">Email:</label>
          <input onChange={handleChange} value={email} type="email" placeholder="Enter Email" name="email"/>

          <input type="submit" value="Muuda emaili" />
        </form>
      </div>
      <div>
        <form onSubmit={uploadChangedData}>
          <label htmlFor="old_password">Vana parool:</label>
          <input onChange={handleChange} value={oldPassword} type="password" placeholder="Vana parool" name="old_password" required/>
          
          <label htmlFor="new_password">Uus parool:</label>
          <input onChange={handleChange} value={newPassword} type="password" placeholder="Uus parool" name="new_password" required/>
          
          <label htmlFor="conf_new_password">Uus parool uuesti:</label>
          <input onChange={handleChange} value={confNewPassword} type="password" placeholder="Uus parool uuesti" name="conf_new_password" required/>
          
          <input type="submit" value="Vaheta parool" />
        </form>
        <p>{error}</p>
      </div>
    </section>
  );
}

// TODO
// iga x aja tagant vaadatakse tagataustal kas token kehtib - kui mitte, siis logitakse välja
// regamisel olemasolev kasutaja asemel soovitatakse ka teisi nimesid, mis saadaval
// telefonis klahvilukku peale panna saaks
// treileri näitamine hoverdades
// teaserid pealehel või kõige popimad filmid/sarjad
// tunglause: me lubame, et meie saidilt ei kao asjad NS ära!!
// natuke parem tunglause: Teiste tuntud loojate sisu on meil olemas!!
// pakub sisu, mida saab ka näha
// kui sisu ei ole, siis on suurelt tekst, et seda pole ja alles siis soovitused
// ise saaks settingutes muuta pealehe välimust?
// minu tellimused - näha kaua kestab sisu tellimus
// näha kuna läks subscription maha
// privaatsuspoliitika
// sisu keele valimine
// admin paneelist sisu lisamine
// reset fields on changing user info
// parooli vahetamisel vana parooli valesti panek ei anna errorit
// adminiks tegemine vahetab kasutajate kohad ära kuvamisel
