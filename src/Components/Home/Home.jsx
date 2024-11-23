import React,{useState, useEffect} from 'react';
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "5ff99e670d0c835e4cebff2f5e74e58a";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({img})=>(<img className="card" src={img} alt="Moviecover" />);

const Row = ({title, card_arr=[]})=>(
    <div className="row">
        <h2>{title}</h2>
        <div>
            {
                card_arr.map((item, index)=>(
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }
        </div>
    </div>
);

const Home = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [nowplaying, setNowplaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [toprated, setToprated] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
      const fetchUpcoming = async()=>{
        const {data:{results}} = await axios.get(`${url}/upcoming?api_key=${apiKey}`);
        setUpcoming(results);
      }

      const fetchNowPlaying = async()=>{
        const {data:{results}} = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
        setNowplaying(results);
      }

      const fetchPopular = async()=>{
        const {data:{results}} = await axios.get(`${url}/popular?api_key=${apiKey}&page=2`);
        setPopular(results);
      }

      const fetchToprated = async()=>{
        const {data:{results}} = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
        setToprated(results);
      }

      const getGenres = async()=>{
        const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        setGenres(genres);
      }

      fetchUpcoming();
      fetchNowPlaying();
      fetchPopular();
      fetchToprated();
      getGenres();
    }, [])

  return (
    <section className="home">
        <div className="banner">
            {popular[0] && (
                <img
                src={`${imgUrl}/${popular[0].poster_path}`}
                alt={popular[0].original_title}
                />
            )}
            {popular[0] && <h1>{popular[0].original_title}</h1>}
            {popular[0] && <p>{popular[0].overview}</p>}

            <div>
                <button> <BiPlay/> Play</button>
                <button> <AiOutlinePlus/> My List</button>
            </div>
        </div>

        <Row title={"Upcoming"} card_arr={upcoming}/>
        <Row title={"Now Playing"} card_arr={nowplaying}/>
        <Row title={"Popular"} card_arr={popular}/>
        <Row title={"Top Rated"} card_arr={toprated}/>

        <div className="genreBox">
            {
                genres.map((item)=>(
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))
            }
        </div>
    </section>
  )
};

export default Home