import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

const imgUrl = "https://via.placeholder.com/250/250";

const Movie = () => {
  const [data, setData] = useState(null);
  console.log(data)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {data.map((row) => (
            <NavLink to={`/movie/${row?.show?.id}`} >
              <div className="card">
                <div className="card-info">
                  <h2>
                    {row?.show?.name}
                  </h2>
                  <img src={row?.show?.image === null ? imgUrl : row?.show?.image?.original} alt="#" />
                </div>
              </div>
            </NavLink>
          ))}

        </div>
      </section>
    </>
  );
};

export default Movie;
