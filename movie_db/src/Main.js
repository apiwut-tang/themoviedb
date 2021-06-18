import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Redirect } from "react-router";
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';




const API_URL = "https://api.themoviedb.org/3"
const API_KEY = "d2865b1433557a7176ac697d7aba876f"
const API_Genre = "https://api.themoviedb.org/3/genre/movie/list?api_key=d2865b1433557a7176ac697d7aba876f&language=en-US"
const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'id', label: 'ID', minWidth: 100 },
  {
    id: 'genre_name',
    label: 'Genre',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'release_date',
    label: 'Release_Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'vote_average',
    label: 'Vote_Average',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'original_language',
    label: 'original_language',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

// const clickMovie = function (id) {
//   localStorage.setItem("eidtId", id);
//   browserHistory.push("/movie")
// };

const clickMovie = (id) =>{
  localStorage.setItem("MovieId", id);
  browserHistory.push("/movie")
};


class Main extends Component{

  constructor() {
    super();
    this.state = {
      data:{},
      items: [],
      datagenre: [],
      id: "1",
      genre: "",
      page : 0,
      rowsPerPage : 10,
    };
   
  }
  async componentDidMount(){
    this.setData();
    try {
      const res = await this.GetMovieGenre();
      if(res.data){       
          this.setState( { datagenre: res.data});
      }else{
          this.setState({datagenre: []});
      }    
    } catch (error) {
      console.log(error);
    }
    //console.log(this.state.datagenre.genres);
  }
  
  handleChangePage = (event, newPage) => {
    this.setState({page : newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage : +event.target.value})
    this.setState({page : 0});
  };

  GetMovieData=(id)=>{
    return axios.get("https://api.themoviedb.org/3/list/"+id+"?api_key=d2865b1433557a7176ac697d7aba876f&language=en-US")
  }

  GetMovieGenre=()=>{
    return axios.get(API_Genre);
  }

  setData = async () => {
    let id = this.state.id;
    try {
      const res = await this.GetMovieData(id);
     // console.log(res.data);
      if(res.data){   
          let Datamovie = res.data.items.filter(item => {
            let genre = [];
            item.genre_ids.map((id)=>{
              this.state.datagenre.genres.map((data)=>{
                if(data.id==id)
                {
                  genre.push(data.name);
                }
              })
            })
            item.genre_name = genre.join(", ");
            return item;
            // return {...item, genre_ids: genre }
          });
          if(this.state.genre!="")
          {
              Datamovie = Datamovie.filter(item => {
              return item.genre_ids.includes(parseInt(this.state.genre))
            })
          }
          console.log(Datamovie)
          this.setState( { data: res.data, items: Datamovie });          
      }else{
          this.setState({data: {}, item: []});
      }    
    } catch (error) {
      console.log(error);
    }
  }


  autor=()=>{
    if(this.state.data.items!=null)
    {
      return(
        <div>
          <h4>Aurtor : {this.state.data.created_by}</h4>
          <h4>Description : {this.state.data.description}</h4>
        </div>
      );
    }

  }

  onChangeGenre = e => {
    this.setState({ genre: e.target.value })
    //this.setData();
  }

  renderMovie = () => {
    if(this.state.data.items){
      return this.state.data.items.map((movie)=>{
        const url = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
        return(
          <div>
             <h4>Name {movie.title}</h4>
             <h3>popluparity : {movie.popularity}</h3>
             <img src={url} alt="Movie"></img>
          </div>
        );
      })
    }
  }

  renderGenre=(genreID)=>{
    let ganreName;
    if(this.state.data.items&&this.state.genre!=""){
        this.state.datagenre.genres.map((genre)=>{
        if(genreID==genre.id){
          ganreName = genre.name
        }
      })

      return(
        <div  class="textcolor">
          <h4>Genre Movie : {ganreName}</h4>
        </div>
      );
    }
  }

  
  render(){
   
     return(
    <div class="container-fluid">
              <Header/>
    <div class="parallax-content baner-content" id="home">
        <div class="container">
            <div class="text-content">
                <h2><em>Developers</em> <span>THE MOVIEDB</span> </h2>
                <h4>Test</h4>
                <p>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, iflix, Amazon Prime Video, and Mubi.</p>
            </div>
        </div>
    </div>
    <section id="about" class="page-section">
        <div class="container">
            <div class="row">
            <div>
              <h3 class="textcolor">Enter Movie ID </h3>
              <input type="number" min="1" max="100" value={this.state.id} onChange={e=> this.setState({ id : e.target.value})}></input>
            </div>
            <h4 class="dropdown-menu">Choose Genre</h4>
                                    <select class="input" onChange={this.onChangeGenre}>
                                        <option value="" disabled selected>Choose Genre</option>
                                        <option value="">All Genre</option>
                                        <option value="28">Action</option>
                                        <option value="12">Adventure</option>
                                        <option value="16">Animation</option>
                                        <option value="35">Comedy</option>
                                        <option value="80">Crime</option>
                                        <option value="99">Documentary</option>
                                        <option value="18">Drama</option>
                                        <option value="10751">Family</option>
                                        <option value="14">Fantasy</option>         
                                        <option value="36">History</option>
                                        <option value="27">Horror</option>
                                        <option value="10402">Music</option>
                                        <option value="9648">Mystery</option>
                                        <option value="10749">Romance</option>
                                        <option value="878">Science Fiction</option>
                                        <option value="10770">TV Movie</option>
                                        <option value="53">Thriller</option>
                                        <option value="10752">War</option>
                                        <option value="37">Western</option>
                                     </select>
            </div>
            <div>
            <button type="button" class="btn btn-dark" onClick={(e)=>this.setData()} >Get Data</button>
            </div>
            <div  class="textcolor">
             {
              this.autor()
             }
           </div >
              {
                this.renderGenre(this.state.genre)
              }
              <div>
              </div>
 
            <div>
            </div>
            <div>
              <Paper>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow >
                        {columns.map((column) => (
                          <TableCell 
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth , fontSize: 15}}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>              
                    <TableBody>
                      {this.state.items.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((movierow) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={movierow.code}> 
                            {columns.map((moviecolumn) => {
                              const value = movierow[moviecolumn.id];
                              return (
                                <TableCell key={moviecolumn.id} align={moviecolumn.align} style={{ fontSize: 14 }}>
                                  <Link  class="pointer" onClick={(e) => clickMovie(movierow.id)}>
                                  {moviecolumn.format && typeof value === 'number' ? moviecolumn.format(value) : value}
                                  </Link>
                                </TableCell>
                              );
                            })}
                          </TableRow>   
                        );
                      })}         
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  style={{ fontSize: 15}}
                  rowsPerPageOptions={[10, 25, 100]} 
                  component="div"
                  count={this.state.items.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            </div>
        </div>
    </section>
          <div class="container">
          </div>
         </div>
       
         
      
    );

  }

}

export default Main;
