# react-auth-example
Auth0 React Calling an API
This sample demonstrates how to make secure calls to an API after authenticating a user with Auth0. The calls to the API are made with the user's access_token. The sample makes use of Auth0's hosted login page which provides centralized authentication.

There is a short screencast available: https://www.youtube.com/watch?v=ti2zMJm34Cw
Auth0 documentation: https://auth0.com/docs/quickstart/spa/react
Demo: 

Getting Started
If you haven't already done so, sign up for your free Auth0 account and create a new client in the dashboard. Find the domain and client ID from the settings area and add the URL for your application to the Allowed Callback URLs box. The default URL is http://localhost:3000/callback. Also configure Allowed Web Origins to the default application URL http://localhost:3000.

Clone the repo or download it from the React quickstart page in Auth0's documentation.

Open the demo.

cd 03-Calling-an-API
Install the dependencies for the app.

npm install
Set up a new API
More complete documentation is available at React Calling an API.

From the Auth0 dashboard, select the APIs section and select "Create API":

Add a name for the API. A friendly name for the API.
Select an identifier for the endpoint. A logical identifier for this API. We recommend using a URL but note that this doesn’t have to be a publicly available URL, Auth0 will not call your API at all. Important! This field cannot be modified.
For purposes of this demo, you may want to consider using http://localhost:3001 as your identifier.

You will also need to add in a new scope. Scopes allow you to define the data that will be accessed through the applications to your API. Set a name for them and its description for better understanding.

Select the Scopes tab from the API section.
In the name textbox, enter in read:messages.
Add a description for this scope ex: permission to read messages and click the 'add' button.
Set the Client ID, Domain, and API identifier
If you download the sample from the quickstart page, it will come pre-populated with the client ID and domain for your application. If you clone the repo directly from Github, rename the auth0-variables.js.example file to auth0-variables.js and provide the client ID and domain there. This file is located in src/Auth/.

You should also provide the identifier for the API you create in the Auth0 dashboard as your apiUrl.

Set Up the .env File
In addition to the above-mentioned auth0-variables.js file, a .env file is provided at the root of the application. This file provides your application's credentials to the small Node server located in server.js.

This file has two values, AUTH0_AUDIENCE and AUTH0_DOMAIN. If you download this sample from the quickstart page, the value for AUTH0_DOMAIN will be populated automatically, but you will still need to populate AUTH0_AUDIENCE manually. The value for AUTH0_AUDIENCE is the identifier used for an API that you create in the Auth0 dashboard.

Run the Application
The demo comes ready to serve locally using react-scripts.

npm start

For More Auth0 react-examples: https://github.com/YuridiaLarios/auth0-react-samples
