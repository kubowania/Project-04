# Project-04
Business Bank Account Dashboard using React and Django.

## Overview
This was a final project for the General Assembly Software Engineering course. It was a solitary project that allowed me to build an app relevant to the finance and small business industry that I have interest in. It was a 5 day project. 

Revenoo is a B2b revenue tracking dashboard that allowed me to use Python and Django to handle backend structure and Authorisation, with React for the frontend. I enjoyed adding Companies House API to improve my apps service, as well as exercise my previously gained design and UX skills. 

I like to think I have quite a business-minded attitude towards the innovation of products. Ontop of tracking revenue, my next step would be to find like for like business customers based on their SIC Codes, using Companies House API. This feature would make my app not only for tracking revenue, but for increasing revenue and would add stickiness to the product. 

( revenoo.herokuapp.com )



## Project timeline and technologies used

Build a React application in 5 days to showcase the following:
* My technical skill set
* My web design skill set
* My industry interest

## Technologies Used

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


## Approach Taken
I started out my writing out my three Models and figuring out their relationships to each other (Many to Many or otherwise, as well as what they take - string, boolean etc). I settled on transaction, Counterparty and SIC Codes. Once the Models were written and tested that I can make put, get, delete requets on the backend using localhosr:4000, I then started to build out the frontend using React. Lastly I did the Authorisation, which simply meant I wrote code to make certian pages and features not available to the user unless the register to the app.


## Wins and Blockers

### Wins
I particularly enjoyed the number handling functions I had to write and displaying data in a visual way that is easy to consume for the app user.

### Blockers
If I was to make the app again I would give myself more time in writing the functions that allow for the main pie chart to be responsive. This was a very last-minute feature and despite working perfectly well, the code is unnecessarily long and does not allow for new customers.

## Visuals and Featured Code 


![Imgur](https://i.imgur.com/riSZvLg.png)

### Featured piece of code no.1

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
