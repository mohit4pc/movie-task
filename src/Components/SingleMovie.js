import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const SingleMovie = () => {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        const filteredData = response.data.filter(task => task.show.id.toString() === id);
        setData(filteredData)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(data)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="movie-section">
      {data.map((row) => (
        <div className="movie-card">
          {/* <figure> */}
          <img src={row?.show?.image?.original} alt="" />
          {/* </figure> */}
          <div className="card-content">
            <p className="title">{row?.show?.name}</p>
            <p className=""></p>
            {/* <p className="card-text">{row?.show?.summary}</p> */}
            <div dangerouslySetInnerHTML={{ __html: row?.show?.summary.slice(0, 400) }} className="details-p" />
            <p className="card-p"><b>Language :</b> {row?.show?.language}</p>
            <p className="card-p"><b>Average Runtime:</b> {row?.show?.averageRuntime} minutes</p>
           
              <p className="card-p genre"><b>Genres:</b>
                <ul className="genre-list">
                  {row?.show?.genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </p>

       
            <p className="card-p"><b>Rating :</b> {row?.show?.rating?.average} / 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>))}

    </section>
  );
};

export default SingleMovie;
