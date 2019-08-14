<br />
<p align="center">
  <a href="https://lovable-survey-creator.firebaseapp.com/">
    <img src="public/img/pictures/Lovable-survey-icon-noBG.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Lovable Survey Creator</h3>

  <p align="center">
    A small tool to create delightful surveys and analyze the results.
    <br />
    <br />
    <a href="https://lovable-survey-creator.firebaseapp.com/">View the website</a>
    |
    <a href="https://github.com/agent00biber/lovable-survey-creator/issues">Report a bug</a>
    |
    <a href="https://feedback-creator.firebaseapp.com/surveyczO0wWfxxlYvouKlzgmk">See a test survey</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Usage](#usage)
- [Roadmap](#roadmap)

<!-- ABOUT THE PROJECT -->

## About The Project

![Screenshot of the survey-app](https://lovable-survey-creator.firebaseapp.com/)

This is a vue-coded learning project and a future method of testing upcoming apps/features to get feedback early.

I was annoyed by the lack of good looking surveys + their builders and the lack of a mobile first thinking. Here I saw a learning opportunity.

<!-- USAGE -->

## Usage

Before creating a survey you have to signup (I know this is a barrier of entry but sadly, there is no way around it. Stuff has to be saved somewhere)

The app is structured in 3 tabs:

- View: Where you can see all your surveys and copy links from these surveys to clipboard
- Analyze: Here you can see how your App is performing
- Create: In a 3-step process you create a survey feature by (1) adding URLs and basic information, (2) adding questions and (3) previewing your feature. This step is repeated until you have sufficient features and publish it as a survey.

This will give you a survey like this: [Test-survey](https://feedback-creator.firebaseapp.com/surveyczO0wWfxxlYvouKlzgmk)
(I hope you like salad :)

<!-- ROADMAP -->

## Roadmap

If you find anything in this code, which is not a best practice or at least acceptable in any way, please tell me and open an [issue](https://github.com/agent00biber/lovable-survey-creator/issues). This is at this state a learning app and I need the feedback to grow.

### Features

- At least one more question type (net promotor score (NPS) seems like a good fit for this)
- More auth-related features
  - like password-reset
  - password-requirements
  - a show password toggle
  - account-deletion

### Bugs to fix

This could be a very long list but I will just state the most prominent bugs:

- _after navigation between the different sub-tabs of "Analyze", the navigation to the other routes fails_ (and I don't know why)
- jumping navigation of the hamburger menu icon
- survey state object needs to be cleared after publishing
- "copy to clipboard" should only color the selected survey and not all of them

### Rewriting/refactoring

Because of so much progress during this project, some strategies and inputs came late into it and need to be established through out the whole app:

- different types of passing data between components (state vs props)
- incoherent CSS naming
- prop validation
- some components are to massive to properly maintain

<!-- LICENSE -->

## License

Distributed under the MIT License.
