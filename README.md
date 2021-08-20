# sb_43-00-00_React-Jobly
 
## Technology Stack
- **Front-end**: ReactJS
- **Back-end**: NodeJS, provided

## Assignment Details

Build a react front-end to the provided Jobly backend. 

[Jobly](http://clean-plane.surge.sh) was **deployed** with the backend on heroku and the front end on surge.sh at [http://clean-plane.surge.sh](http://clean-plane.surge.sh).

**Step Zero: Setup**

**Step One: Design Component Hierarchy**

Interesting. The step was completed, but it's helpfulness is debatable. The *Jobly Component Map* (below)followed the backend routes more. It helped to see the breadth of the routes that exist in the backend and it caused code exploration and familiarization. The components built do not resemble the component hierarchy.

![Jobly Component Map](./frontend/src/static/JoblyComponentMap_60.png) 

**Step Two: Make an API Helper**

The API handler is a class that holds the methods that make the requests from the Jobly backend. 

The Jobly backend has a lot of functionality that will not get implemented in the frontend -- examples are adding a company, adding a position, altering the admin flag. The approach for this piece was to indentify all possbible routes from the backend and add them to the api class as comments / placecholders. The code was impletmented as the respective route was needed.

**Step Three: Make Your Routes File**

**Step Four: Companies & Company Detail**

**Step Five: Jobs**

**Step Six: Current User**

Ability for a user to sign up and for an existing user to sign in were created. Some error messaging was added to the sign up and sign in form. The only front-end validation that exists is the check that password and confirmation password match. The error messaging added is a start but by no means a complete solution.

Navigation components were adjusted and Sign In / Sign Up links only appear for unauthenticated users. The current username and a Sign Out link / button appear in the navigation once the user is authenticated (either by signing up or signing in).

Authenticated users are placed on the jobs listing page. 


**Step Seven: Using localStorage and Protecting Routes**

One of those tasks that sounds deceptively simple. A `useLocalStorage` hook was created and the user is correctly saved to localStorage with the `joblyUser` key. Problems occurred when the existing handling of state in `App` and `NavBar` were changed to the state maintained through `useLocalStorage`. `App` needs a state change in order to render and `NavBar` gets the user from `App`. A function to set use state in `App` is still passed to `AuthSignIn` and `AuthSignUp` components - and they now set the user in localStorage via `useLocalStorage`, set the user in `App` state with the passed function and finally redirect. 

Route Protection implemented on `companies/`, `companies/:handle`, and `jobs/` routes through the use of `useRouteProtection` hook. The `useRouteProtection` uses `useLocalStorage` hook to determine whether the visitor is authenticated and redirects unauthenticated visitors to the login page. The `useRouteProtection` hook was added as one of the first lines in components that require route protection.

`login` and `signup` pages are protected differently -- the pages are protected from visitors who are already authenticated.


**Step Eight: Profile Page**

Skipped this one. A form to edit a user and save the changes are just more api calls.

**Step Nine: Job Applications**

Again, something that seems innocuous and NOT! The basis structure to see an Apply button, next to the job, then adding in logic to make the Apply button work again were straight forward. The tricky part was state management and how to get the page to refresh and show that an apply occurred. State already existed for all jobs, but state is needed for the jobs the logged in user applied. The issue was getting the page to refresh when an apply successfully occurs. I did not have much luck adding the newly applied job to the existing job list. A third state was added for the just applied to job. When the api returns `{applied: jobId}`, the `jobId` is placed in the applied to job state. The `useEffect` to load the jobs the user has applied has the applied to jobs state as a dependency, so when the applied to job changes, the useEffect to load the applied list executes. NOT IDEAL, since it would be better to use the list of applied jobs already in state and just append the new job to it.

Happily, the Jobs component where all the above work was performed is also called from the CompanyDetails component, so an apply can happen from both spots as specified in the assignment.

**Step Ten: Deploy your Application on Heroku**
Backend was deployed on heroku. The frontend is deployed on surge at [http://clean-plane.surge.sh](http://clean-plane.surge.sh).

The deployment steps were accurate. Postgres could not get added via the CLI from windows and the push of the local database to postgres failed. Luckily the tables were created and the seed file, `jobly-seed.sql`, added users, companies, and jobs.

For the frontend, it was not clear that I could assign the sub-domain name, soo we gots `clean-plane` instead of `jimg-jobly`!


## Additional Details

**Enhancements**
- There were some. The common `Jobs` component helped.

**Difficulties**
- A different way of thinking. Not only do I need to consider state, but also `await`ing a response and not putting critical logic AFTER the `await`. 
- Getting the NavBar to refresh. If I have 2 browser of the same browsers open to Jobly and I Sign Out of one, the second browser becomes aware of the logout when I change routes, but the NavBar still shows my name as if I am logged in. Probably other items, but those were top of mind.
