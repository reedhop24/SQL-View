# SQL Data View

### Overview
##### The idea for this project came to me while I was working on finding an analytics platform for IBQ Systems. We wanted the ability to integrate our SQL database with a visual analytics platform (we chose DataPine). However during our internal discussions, it was said that there are security concerns around exposing our databases to these platforms. Therefore, I thought it would be a cool project to still have the visual analytics tools but without it being linked to a DB. Instead you can just export a .csv file from your DB and then query and and generate charts from the .csv file. 

### Run on your local machine
##### install npm/node
##### git clone
##### cd into SQL-View
##### cd into app
##### npm install
##### cd into services
##### npm install
##### install XAMPP
##### make sure you have a root user set up with no password
##### start Apache and MySQL server on the XAMPP control panel

### The Tech Stack
##### Front End: React, TypeScript, CSS, Axios, React-Bootstrap, jQuery-Modal and React-Chart-JS
##### Back End: Node.js, Express, MySQL, Body-Parser, Express-File-Upload

### Functionality
![SQL-View-Start](https://user-images.githubusercontent.com/40578449/103682725-198a6900-4f3e-11eb-84ed-546c8f2780e8.PNG)
##### Users are able to upload a .csv file to query by clicking on the file upload icon in the right hand corner, this displays the below modal:
##### Users then choose what type of chart they would want to generate along with the table selection. The table selection does not have any functionality since the user chooses the table to query it is mainly visual and just used to see available tables when they have uploaded a few:
##### Users can then execute their query:
##### From the executed query users then choose the data they would like displayed on the X-Axis, Y-Axis, and how that data should be broken down:
##### Then they are able to view the resultant graph:



