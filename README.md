### Welp!

## Project Description
Welp is a humorous application which attempts to turn the function of Yelp scores and reccomendations on its head, by allowing users to search a given ZIP code to discover the worst-rated businesses in a given radius, search by category, and view details and reviews of each business.

## Technologies Used
This project is primarily comprised of Javascript, consumes the Yelp Fusion API, utilizes the React library, React Router, and SCSS for styling.

## Features
The user will be able to specify a ZIP code and a search radius in miles. The ZIP code will be converted into latitude/longitude, and the miles converted to meters for the purpose of the API query. THe user can either perform a blanket search by default, or route to a separate page to search by a list of provided categories.

The search will route to a new page which returns a list of paginated results, listing the poorest reviewed businesses first, paired with their accompanying Yelp score. After clicking on a business, the user will be routed to another page which displays certain bits of detailed information about that business, including reviews.

## Milestones
I plan to first build the landing page and ZIP code-based search feature, and leave the default radius for the time being. Following that, I will build out the paginated results page. Next will come the details page and routing, and lastly I will add the search radius feature and focus on styling, possibly implementing a UI library such as Google's Material UI.