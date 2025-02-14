import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";
import Spinner from "../components/layout/Spinner";

const User = () => {
  const { getUser, user, loading } = useContext(GithubContext);
  const params = useParams();

  // State to handle error messages
  const [error, setError] = useState(null);

  // Use `getUser` in the dependency array to avoid missing dependencies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from GitHub API
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${params.login}/repos`);

        // Check if the response is not okay
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response data (repositories)
        const data = await response.json();
        
        // Optionally, update the state if required
        getUser(data);  // Assuming `getUser` handles updating user data in context or local state

      } catch (error) {
        console.error("Error fetching data:", error);
        // Update error state to display error message
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchData();  // Call the async function
  }, [params.login, getUser]);  // Dependency array ensures it only runs when `params.login` changes
  console.log("Query Params:", params.toString());

  // Handle loading state
  if (loading) {
    return <Spinner />;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // Destructure user data from context (ensure you have this data in the `user` object)
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back To Search
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title mb-0">{name}</h2>
                <p className="flex-grow-0">{login}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>

            <div className="w-full rounded-lg shadow-md bg-base-100 stats">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">Location</div>
                  <div className="text-lg stat-value">{location}</div>
                </div>
              )}
              {blog && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="text-lg stat-value">
                    <a href={blog} target="_blank" rel="noreferrer">
                      {blog}
                    </a>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">Twitter</div>
                  <div className="text-lg stat-value">
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUsers className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Followers</div>
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {followers}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUserFriends className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Following</div>
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {following}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaCodepen className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Public Repos</div>
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {public_repos}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaStore className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Public Gists</div>
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {public_gists}
              </div>
            </div>
          </div>
        </div>

        {/* <RepoList repos={repos} /> */}
      </div>
    </>
  );
};

export default User;
