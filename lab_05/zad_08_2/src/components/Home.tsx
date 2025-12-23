import { Link } from "react-router-dom";

function Home() {
  return (<>
  <h1>Witaj na stronie z blogami!</h1>
  <Link to="/blog">Blog</Link>
  </>)
}

export default Home