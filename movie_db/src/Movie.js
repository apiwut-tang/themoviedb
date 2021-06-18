import React, { Component } from 'react';
import './App.css';
import App from './Main';
import {Router,Route,Link,browserHistory} from 'react-router';
import axios from 'axios';
import Header from './Header';
// import './css/templatemo-comparto.css'
// import './fontawesome/css/all.min.css'
// import Eximg from './img/comparto-image-01.jpg'

const MovieId = localStorage.getItem('MovieId')
const API_GET = "https://api.themoviedb.org/3/movie/id?api_key=d2865b1433557a7176ac697d7aba876f&language=en-US"
const API_PIC = "https://image.tmdb.org/t/p/w500"

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieid : "",
            title : "",
            description : "",
            poster : "",
            adult : "",
            budget : "",
            genres : [],
            original_language : "",
            popularity : "",
            production_companies : [],
            release_date:  "",
            revenue: "",
            runtime: "",
            tagline: "",
            status: ""
        };
        this.GetMovie();
      }

    

      GetMovie=()=>{
          const ID = localStorage.getItem('MovieId');
          console.log(ID);
          return axios.get("https://api.themoviedb.org/3/movie/"+ID+"?api_key=d2865b1433557a7176ac697d7aba876f&language=en-US")
          .then((Response)=>{
              //console.log(Response.data);
              let URL_PIC = API_PIC + Response.data.poster_path
              let child
              let Datagenre = []
              if(Response.data.adult==true)
              {
                child = "NOT ALLOWED"
              }else{
                child = "ALLOWED"
              }           
              console.log(Datagenre)
              this.setState({
                movieid : Response.data.id,
                title : Response.data.original_title,
                description : Response.data.overview,
                poster : URL_PIC,
                adult : child,
                budget : Response.data.budget,
                genres : Response.data.genres,//array
                original_language : Response.data.original_language,
                popularity : Response.data.popularity,
                production_companies : Response.data.production_companies,//array
                release_date:  Response.data.release_date,
                revenue: Response.data.revenue,
                runtime: Response.data.runtime,
                tagline: Response.data.tagline,
                status: Response.data.status
              });              
          })
      }

    

  render() {


    return (
            <div class="container-fluid">
                <nav class="navbar navbar-light bg-light">
                <Header/>
                </nav>
                <div class="tabs-content" id="blog">
                    <div class="container">
                        <div class="row">
                            <div class="wrapper">
                            <div class="col-md-4">
                        <div class="section-heading">
                            <h4> {this.state.title}  </h4>
                                <div class="line-dec"></div>
                                <p>{this.state.description} </p>
                                <ul class="tabs clearfix" data-tabgroup="first-tab-group">
                                    <p> Budget : {this.state.budget}</p>
                                    <p> Child : {this.state.adult}</p>
                                    <p> Original_Language : {this.state.original_language} </p>
                                    <p> Popularity : {this.state.popularity}</p>
                                    <p> Release_Data : {this.state.release_date}</p>
                                    <p> Revenue : {this.state.revenue}</p>
                                    <p> Runtime : {this.state.runtime}</p>
                                    <p> Status : {this.state.status}</p>
                                </ul>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <section id="first-tab-group" class="tabgroup">
                            <div>
                                <img src={this.state.poster} class="center" alt="Move Poster"></img>
                                
                            </div>
                        </section>
                    </div>
                            </div>
                        </div>
                     </div>
                </div>
                            
                <div class="container">
                    <h1> Movie Details</h1>
                    <div class="content">
                        <img src={this.state.poster} class="center" alt="Move Poster"></img>
                        <h2>  {this.state.title}   </h2>
                        <h4> Description : {this.state.description}   </h4>
                        <h4>  
                        {
                            this.state.genres.map((genre)=>{
                                return(
                                    <div class="contentgenre">
                                        {genre.name}
                                    </div>
                                );
                            })
                        }
                        </h4>
                        <h4 class="center"> Production </h4>
                        {
                            this.state.production_companies.map((production)=>{
                                //console.log(production.logo_path)
                                let product_pic = API_PIC + production.logo_path
                                if(production.logo_path!=null)
                                {
                                    return(
                                        <div>
                                            <h5> {production.name} </h5>
                                            <h5> {production.origin_country} </h5>
                                            <img src={product_pic} class="rounded mx-auto d-block"alt="production_details"></img>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    
                </div>
                
            </div>
            


    );
  }
}



export default Movie;
