# Project-04
Business Bank Account Dashboard using React and Django.


This was a final project for the General Assembly Software Engineering course. It was a solitary project that allowed me to build an app relevant to the finance and small business industry that I have interest in. It was a 5 day project. To view the app, please register here: https://revenoo.herokuapp.com



## Project timeline and technologies used

Build a React application in 5 days to showcase the following:
* My technical skill set
* My web design skill set
* My industry interest

### Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* SCSS
* Git
* GitHub
* React
* Webpack
* Bulma
* Node JS
* Babel
* Insomnia
* Companies House API
* Django
* Python


## Visuals and example code


![Imgur](https://i.imgur.com/riSZvLg.png)

Once the user has logged in and we have their access Token stored, a few functionalities become available to the user. For example more options appear to the user on the navbar, and the login form and message on the right hand side of the homepage will change to service the logged in user more appropriately- ie: with a log out prompt as below:

```javascript
              {Auth.isAuthenticated() && <div>
                <h2>Oh no! Are you leaving already?</h2>
                <br/>
                <button onClick={this.logout} className="button is-warning ">Logout</button>
              </div>}

```

![Imgur](https://i.imgur.com/R5m60rQ.png)

![Imgur](https://i.imgur.com/9a8SsHe.png?1)

![Imgur](https://i.imgur.com/rnvHWcA.png)

![Imgur](https://i.imgur.com/Xuo64Nl.png)
