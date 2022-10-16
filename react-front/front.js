function HomeContent() {
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

// const content_div = ReactDOM.createRoot(document.getElementById("content"));
// content_div.render(<HomeContent />);

// const controls_div = ReactDOM.createRoot(document.getElementById("controls"));
// controls_div.render(<ControlsContent />);

// const header = ReactDOM.createRoot(document.getElementById("header"));
// header.render(<HeaderContent />);

// const main_page = ReactDOM.createRoot(document.getElementById("content"));
// main_page.render(<HomeContent />);

const main_page = ReactDOM.createRoot(document.getElementById("root"));
main_page.render(<HomeContent />);
