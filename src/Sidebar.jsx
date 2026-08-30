import { Link, useLocation } from "react-router-dom";

function Sidebar(props) {
  const location = useLocation();

  return (

    <aside className="sidebar">

        <h1 className="logo">
          🎬 ReelDiary
        </h1>

        <nav>
<Link
  to="/"
  className={
    location.pathname === "/"
      ? "sidebar-btn active-sidebar"
      : "sidebar-btn"
  }
  onClick={() => {

    if (location.pathname === "/") {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }}
>
  🏠 Home
</Link>

<Link
  to="/top-picks"
  className={
    location.pathname === "/top-picks"
      ? "sidebar-btn active-sidebar"
      : "sidebar-btn"
  }
>
  ⭐ Top Picks
</Link>

<Link
  to="/watchlist"
  className={
    location.pathname === "/watchlist"
      ? "sidebar-btn active-sidebar"
      : "sidebar-btn"
  }
>
  🎞 Watchlist
</Link>

<Link
  to="/watched"
  className={
    location.pathname === "/watched"
      ? "sidebar-btn active-sidebar"
      : "sidebar-btn"
  }
>
  ✅ Watched
</Link>

<Link
  to="/insights"
  className={
    location.pathname === "/insights"
      ? "sidebar-btn active-sidebar"
      : "sidebar-btn"
  }
>
  📊 Insights
</Link>
          
          <select
  className="sidebar-sort sort-dropdown"

   

  value={props.sortType}

  onChange={(e) =>
    props.setSortType(
      e.target.value
    )
  }
>

  <option value="default">
   Sort by . . .🛸
</option>

<option value="newest">
  🕒 Recently Added
</option>

<option value="rating">
  💜 Highest Rated
</option>

<option value="alphabetical">
  🎬 A-Z Titles
</option>

</select>

        </nav>

      </aside>

  );

}

export default Sidebar;