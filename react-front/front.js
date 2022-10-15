function HomeContent() {
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

  React.useEffect(() => {
    getAllMovies();
  }, []);

  let renderedOutput = movies.map((item) => (
    <div className="content-box" key={item.Title}>
      {item.Title}
    </div>
  ));

  return <div className="content-parent">{renderedOutput}</div>;
}

function ControlsContent() {
  const [searchText, updateSearhText] = React.useState();
  const [movies, changeMovies] = React.useState([]);

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

  // vb kunagi kasutame
  function hideContent() {
    document.getElementById("content").style.display = "none";
  }

  function showContent() {
    document.getElementById("content").style.display = "block";
    changeMovies([]);
  }

  const handleChange = (event) => {
    updateSearhText(event.target.value);

    if (event.target.value != "") {
      document.getElementById("content").style.display = "none";

      getContentByTitle(event.target.value);
    }
  };

  let renderedOutput = movies.map((item) => (
    <div className="content-box" key={item.Title}>
      {" "}
      {item.Title}{" "}
    </div>
  ));

  return (
    <div>
      <div id="controls-parent">
        <input
          placeholder='Mida otsime na?'
          onBlur={showContent}
          /*onFocus={hideContent}*/
          onChange={handleChange}
          /*onChange={(e) => updateSearhText(e.target.value)}*/
          type="search"
          value={searchText ? searchText : ""}
          id="search-input"
        /><i className="fa fa-search"></i>
      </div>
      <div id="searched-content">{renderedOutput}</div>
    </div>
  );
}

const content_div = ReactDOM.createRoot(document.getElementById("content"));
content_div.render(<HomeContent />);

const controls_div = ReactDOM.createRoot(document.getElementById("controls"));
controls_div.render(<ControlsContent />);
