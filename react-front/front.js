const header = ReactDOM.createRoot(document.getElementById("header-content"));
const content = ReactDOM.createRoot(document.getElementById("root"));

function HomeContent2() {
  const [movies, changeMovies] = React.useState([]);
  const [searchText, updateSearhText] = React.useState();

  const handleChange = (event) => {
    updateSearhText(event.target.value);
    //console.log(event.target.value);

    if (event.target.value != "") {
      getContentByTitle(event.target.value);
    } else {
      getAllMovies();
    }
  };

  function getAllMovies() {
    fetch("http://localhost:3000/api/v1/movies")
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        //console.log(data);
        changeMovies(data.movies);
      });
  }

  function getContentByTitle(keyword) {
    fetch(`http://localhost:3000/api/v1/movies/${keyword}`)
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        //console.log(data.message);
        if (data.message == "No movie titles match your searched keyword.") {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }
      });
  }

  // teine muutuja defineerib jälgitavad objektid, peale mida tõmmatakse func käima
  React.useEffect(() => {
    getAllMovies();
  }, []);

  let renderedOutput = movies.map((item) => (
    <div className="content-container" key={item.Title}>
      {item.Title}
    </div>
  ));
  const Redirect = window.ReactRouterDOM.Redirect;
  return (
    <div>
      <header id='controls'>
        {/* <div id="controls-parent"> */}
          <a className="menu-button" href="./">Home/Logo</a>
          <div id='controls-right'>
            {/* https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify */}
            <img id="settings-button" src="./icons/cog2_darker.png" alt="my image" onClick={() => window.location.href='./settings.html'} />
            <input onChange={handleChange} value={searchText ? searchText : ""} id="search-input" type="search" placeholder="Mida otsime na?"></input>
          </div>
        {/* </div> */}
      </header>
      <section>
        <div id="content-parent">{renderedOutput}</div>
      </section>
    </div>
  );
}

function HomeContent(props) {
  // const Redirect = window.ReactRouterDOM.Redirect;
  const [movies, changeMovies] = React.useState([]);

  function getAllMovies() {
    fetch("http://localhost:3000/api/v1/movies")
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        //console.log(data);
        changeMovies(data.movies);
      });
  }

  function getContentByTitle(keyword) {
    fetch(`http://localhost:3000/api/v1/movies/${keyword}`)
      .then((response) => {
        let res = response.json();
        //console.log(res);
        return res;
      })
      .then((data) => {
        //console.log(data.message);
        if (data.message == "No movie titles match your searched keyword.") {
          changeMovies([]);
        } else {
          changeMovies(data.movies);
        }
      });
  }
  //console.log(props.keyword);
  if (!props.keyword) {
    //console.log("parsime kõiki");
    //getAllMovies();
    // teine muutuja defineerib jälgitavad objektid, peale mida tõmmatakse func käima
    React.useEffect(() => {
      getAllMovies();
    },[props]);
  } else {
    //console.log("parsime otsitut");
    //getContentByTitle(props.keyword)
    // teine muutuja defineerib jälgitavad objektid, peale mida tõmmatakse func käima
    React.useEffect(() => {
      getContentByTitle(props.keyword)
    },[props]);
  }

  // React.useEffect(() => {
  //   getAllMovies();
  // },[]);

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

function HeaderContent(props) {
  const [searchText, updateSearhText] = React.useState();
  const handleChange = (event) => {
    updateSearhText(event.target.value);
    //console.log(event.target.value);

    if (event.target.value != "" || !event.target.value) {
      content.render(<HomeContent keyword={event.target.value} />);
    } else {
      content.render(<HomeContent />);
    }
  };
  
  return (
    <header id='controls'>
      {/* <div id="controls-parent"> */}
        <a className="home-button" href="./">Home/Logo</a>
          {/* https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify */}
          {props.onScreen == 'Settings'?
              <ul id='controls-right'>
                <li><a id="series-button" className='menu-button fa fa-tv'></a></li>
                <li><a id="movies-button" className='menu-button fa fa-film'></a></li>
                <li><a id="users-button" className='menu-button fa fa-user'></a></li>
                <li>
                  <a className='menu-button' onClick={() => window.location.href='./'}>
                  <svg alt="Home" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
                  </a>
                </li>
              </ul>:
            <ul id='controls-right'>
              <li><a id="stats-button" className='menu-button fa fa-bar-chart' onClick={ () => content.render(<StatsContent />)}></a></li>
              <li>
                <div className='menu-button' onClick={() => window.location.href='./settings.html'}>
                  <img id="settings-button" src="./icons/cog2_darker.png" alt="Settings" />
                </div>
              </li>
              <li><input onChange={handleChange} value={searchText ? searchText : ""} id="search-input" type="search" placeholder="Mida otsime na?"></input></li>
            </ul>
            }
      {/* </div> */}
    </header>
  );
}

function StatsContent() {
  return (
    <div></div>
  );
}

if (settingsScreen) {
  header.render(<HeaderContent onScreen='Settings' />);
} else {
  header.render(<HeaderContent />);
  content.render(<HomeContent />);
}
