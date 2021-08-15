// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";
import Jobs from "./Jobs";
import Auth from "./Auth";
import "./App.css";




function App() {

  document.title = "Jobly"

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/companies">
              <Companies />
            </Route>
            <Route path="/companies/:handle">
              <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
              <Jobs />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
            <Route path="/signup">
              <Auth signIn={false} />
            </Route>
            <Route>
              <p>...and you still . . . haven't found . . . what you're looking for!</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>

  );


  //   <div className="App">
  //   <BrowserRouter>
  //     <NavBar nbrOfSnacks={snacks.length} nbrOfDrinks={drinks.length} />
  //     <main>
  //       <Switch>
  //         <Route exact path="/">
  //           <Home snacks={snacks} />
  //         </Route>
  //         <Route exact path="/snacks">
  //           <Menu itemsList={snacks} path="snacks" menuDesc={menuDescriptions.snacks} />
  //         </Route>
  //         <Route path="/snacks/:id">
  //           <FoodItem itemsList={snacks} cantFind="/snacks" />
  //         </Route>
  //         <Route exact path="/drinks">
  //           <Menu itemsList={drinks} path="drinks" menuDesc={menuDescriptions.drinks} />
  //         </Route>
  //         <Route path="/drinks/:id">
  //           <FoodItem itemsList={drinks} cantFind="/drinks" />
  //         </Route>
  //         <Route path="/add">
  //           <MenuAddItem addSnackFx={addSnack} addDrinkFx={addDrink} />
  //         </Route>
  //         <Route>
  //           <p>Hmmm. I can't seem to find what you want.</p>
  //         </Route>
  //       </Switch>
  //     </main>
  //   </BrowserRouter>
  // </div>



}

export default App;
