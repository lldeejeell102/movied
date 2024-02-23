# MOVIED

- **Name:** Daniel Ji
- **App Name:** Movied
- **Description:** This app will allow users to create an account and track which movies they've watched by Movie title.
- **Deployed Website:** https://dj-unit2-project2.onrender.com/


## List of Dependencies
#### Node Dependicies (package.json)
- alpinejs
- bcryptjs
- connect-mongo
- dotenv
- ejs
- express
- express-session
- method-override
- mongoose
- morgan

#### Frontend (ie jquery, alpine, bootstrap, htmx, etc.)
- htmx
- alpine

## Route Map

| Route Name | Endpoint | Method | Description |
| -----------| ---------| -------| ------------|
| Movie Index | /movies | GET | Renders all movies by user |
| Movie New | /movies/add | GET | Shows a form for a user to add movies to their list |
| Movie Create | /movies | POST | Adds movie to user's list |
| Movie Edit | /movies/:id/edit | GET | Ability to change added movie to user's list |
| Movie Update | /movies/:id | PUT | Ability to change added movie to user's list |
| Movie Delete | /movies/:id | DELETE | Allowing the user to delete any movies on the user's list |