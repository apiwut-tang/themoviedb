import React, { Component } from 'react';
import './css/bootstrap.min.css'
import './css/bootstrap-theme.min.css'
import './css/fontAwesome.css'
import './css/hero-slider.css'
import './css/owl-carousel.css'
import './css/templatemo-style.css'
import './css/lightbox.css'

class Header extends Component{
    render() {
          return (
            <body>
    <div class="header">
        <div class="container">
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="navbar-header">
                    <button type="button" id="nav-toggle" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="/" class="navbar-brand scroll-top"><em>M</em>ovie Database</a>
                </div>
               
                <div id="main-nav" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                       
                    </ul>
                </div>
              
            </nav>
           
        </div>
      
    </div>
   
   </body> 

          );
        }

}

export default Header;