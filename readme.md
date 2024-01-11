# MOVIED

- **Name:** Daniel Ji
- **App Name:** Movied
- **Description:** This app will allow users to create an account and track which movies they've watched by Movie title.
- **Github URL:** https://github.com/lldeejeell102/unit2-project2
- **Deployed Website:** https://dj-unit2-project2.onrender.com/
- **Trello Board:** https://trello.com/invite/b/Hysb1kbK/ATTId039f7ed01c0cc863ed8ff69544e3e50403A367A/unit2-project2

## List of Dependencies
#### Node Dependicies (package.json)
- alpinejs
- bcryptjs
- connect-mongo
- dotenv
- ejs
- express
- express-session
- mongoose
- morgan

#### Frontend (ie jquery, alpine, bootstrap, htmx, etc.)
- htmx
- jquery?
- alpine

## Route Map

<!-- Below should be a table listing the different routes in your app and their purposes -->

| Route Name | Endpoint | Method | Description |
| -----------| ---------| -------| ------------|
| Movie Index | /movies | GET | Renders all movies by user |
| Movie New | /movies/add | GET | Shows a form for a user to add movies to their list |
| Movie Create | /movies | POST | Adds movie to user's list |
| Movie Edit | /movies/:id/edit | GET | Ability to change added movie to user's list |
| Movie Update | /movies/:id | PUT | Ability to change added movie to user's list |
| Movie Delete | /movies/:id | DELETE | Allowing the user to delete any movies on the user's list |

## Design Mockup (Desktop & Mobile)

#### Mobile Design
![Mobile Design Mokcup](https://i.imgur.com/KUeCmTp.png)

#### Desktop Design
![Desktop Design Mokcup](https://i.imgur.com/SWOqYph.png)


## ERD (Entity Relationship Diagram)
<!-- This should be a diagram showing your models and any relationships between them. -->
![Entity Relationship Diagram](https://i.imgur.com/wgc4Ru4.png)