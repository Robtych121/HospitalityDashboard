# Hospitality Dashboard
This project is for the Interactive Frontend Development Milestone Project By Code Institute.

This website was created to display in an interactive format some sales data provided by a catering equipment in the UK. The aim for the website is provide insights in how they performed for 2018 and 2019 (YTD).

You can view this website via Github Page by click this [link](https://robtych121.github.io/HospitalityDashboard/).
 
## UX
The website was designed with a corporate feel to it as it's going to be used by company sales managers/directors.

Because of this, the web page has a clean layout and everything has it's own section to the users can find the information they need easily.

I created a wireframe of the general layout of the page for both desktop and mobiles. This can be found under the Wireframes folder. The final website has extra charts on the page to enhance the dashboards information that is available to the user.

## Features
This website uses the data visualisation scripts D3, DC, Queue and Crossfilter to display a CSV file in a dashboard like web page. The page is structured using Bootstrap so it can also be used on mobiles without any issues.

### Features Left To Implement
I would like to implement an heat map using postcodes that shows all the different counties within the UK with a count of all the items they purchased.

## Technologies Used
1. HTML
2. CSS
3. Bootstrap
4. D3, DC, Queue, Crossfilter

## Testing
I have achieve the user story for the company managers as i was able to provide them with the following:
* They are able to see the sales data in an easy to read format where they can discern the outcome with a glance
* The charts are grouped by type so that they aren't going to get lost at which data they are looking at
* All the charts crossfilters are working so when you filter on one chart, it filters the rest to be more meaningful for the user
* A glossary was added at the bottom of the page to help those who aren't familar with the terminology used
* The whole page has also been made mobile responsive so that it can be viewed on mobile devices such as phones or tablets

#### Mobile Responsive Testing
The responsiveness of the website was tested using Google Devtools and using my own mobile android device (Using Google Chrome).

#### Cross Browser Testing
The website was tested using the following browsers:
1. Google Chrome
2. Firefox
3. Microsoft Edge

#### Code Validators
The website has been tested through the following:
1. W3C HTML Markup Validation Service
2. W3C CSS Validation Service (Jigsaw)
3. JSHint.com to Validate the JS script

#### User Testing
This page was given to the company Director and he was extremely pleased with how the page was layed out and has even asked me about linking it properly to a database rather a CSV file in the future.

#### Other Testing
Due to the nature of the website, I wasn't able to use automated testing for this project. To ensure that the correct details were correct, i had manually checked the data against what was being displayed. For Example. Count of Items By Product Group completely unfiltered should say 4931 under CR, this was then checked against the CSV file.

## Deployment
This website is hosted using the Github pages, using the master branch. Because of this, everytime i push across changes using Git, the website is automatically updated without any additional input from myself. When creating the website, i had to ensure that the main file for the website was index.html otherwise browsers wouldnt be able to load it properly. To set this up, i did the following:
1. Within the project folder, i started a empty repo using `git init`
2. Created the .gitignore file to ignore certain files
3. Ran the first git commit using `git add .` and `git commit -m "Initial Commit"`
4. Went to Github and created a repo there and then linked it to my local one using the following command `git remote add origin https://github.com/Robtych121/HospitalityDashboard.git`
5. Pushed the first commit to Github using `git push -u origin master`
6. Once it was pushed to Github, i went into Settings > Github Pages and uses the master branch as the source to publish to Github Pages


If you want to run a copy of this website locally, please follow the following instructions:
1. Within your chosen editor/terminal, run the following command `git clone https://github.com/Robtych121/HospitalityDashboard.git`
2. Wait until the files have finished copying into your local folder
3. Once finished, run the following command `git remote rm origin`
4. You can now start changing code and commit changes without making changes to this repo.

## Credits

#### Media
Header Image - Lighted Hallway By Tim Savage [image](https://www.pexels.com/photo/architecture-carpet-chandeliers-design-573552/)

#### Content
Data Provided - The data used in this project was provided by Direct Tableware [link](https://www.directtableware.com)

#### Acknowledgements
I had used stack overflow articles to help with this project (getting data to display properly for the line chart) This article was the most used [link](https://stackoverflow.com/questions/47294588/dc-js-linechart-aggregated-by-month-year)