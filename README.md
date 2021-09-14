# HorseRegistration
The horse registration app is meant to be used in order to be used for planning races. Within it we have three types: Tracks, at each track there are multiple races, within these races there are multiple horses. From the main screen a user will be able to select one of three tracks. From there they will navigated to a page displaying information about the races taking place at that track. A user can enter a read only view wherein they can view all races or select an individual race which will allow for editing. On this page there are multiple options editing including: Add a horse to a race, edit a horse already in a race, delete a horse from a race, add a race, edit a race, and delete a race. All add/edit features take the user to a different page while delete will leave them on the race page and update directly from there. The add/edit pages our set in form structures and will warn the user if they leave without saving. Once the user saves they will be routed back to the view all section of the races page. 

## Technologies used
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.
JS
## Set up instructions
clone repo from https://github.com/CrabMeeple/Capstone
run npm install
Verify that angular is installed (ng --version)
Run `ng serve` in the capstone-project\client\horse-registration for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `node server.js` in the capstone-project\server in order to run the backend service found at `http://localhost:8082/`
Navigate to http://localhost:4200

## API Endpoints
* Get Endpoints
  * Get Race By Id: localhost:8082/api/groups/:id
  * Get All Tracks: localhost:8082/api/organizations
  * Get Many Groups By Organization: localhost:8082/api/groups/byorganization/:id
  * Get All Races: localhost:8082/api/groups/
  * Get a Specific Horse in a Specific Race: localhost:8082/api/groups/:groupid/members/:memberid
  * Get All Organizations: localhost:8082/api/organizations

* Post Endpoints
  * Add a Horse to a Race: localhost:8082/api/groups/:id/members
  * Add a Race: localhost:8082/api/groups

* Put Endpoints
  * Edit a Race: localhost:8082/api/groups
  * Edit a Horse in a Race: localhost:8082/api/groups/:id/members

* Delete Endpoints
  * Delete a Horse in a Race: localhost:8082/api/groups/:groupid/members/:memberid
  * Delete a Race: localhost:8082/api/groups/:id

## TODO
* Implement user roles and login methods
* Combine horse edit/horse add, race edit/race add
* Change add/edit methods to modal rather than entirely new page
* Add route guards to prevent users from getting to add/edit screens without going through proper channels
* Add more CSS (implement primeng?)
* Clean up unsubscribe methods

