# Checkturio

## Project Overview

Checkturio is a React Native application that allows users to interact with a form. The form data is fetched from a [small mock server](https://oreakintobi.github.io/mockdata/formData.json) and stored locally using AsyncStorage for offline use. The application is built using Expo, which provides a set of tools and services for building, deploying, and quickly iterating on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.

## Running the Project

To run the project, you will need to have the Expo Go app installed on your iOS or Android device. Once you have that set up, you can install the dependencies with `yarn` and run `yarn start` to start the project from your terminal.

You can then open the Expo Go app on your device and scan the QR code provided in the terminal or in the opened browser window.

## Weaknesses

While the project is functional, there are a few areas that could be improved:

- **Error handling:** Currently, the error handling is basic and could be improved to provide a better user experience.
- **Testing:** The project lacks comprehensive integration and end-to-end tests. Also, I think one or two of the tests are currently failing.
- **UI/UX:** The user interface is quite basic and could benefit from a more engaging design.

## Future Improvements

If I had more time, I would focus on the following areas:

- **Improve error handling:** I would implement a more robust error handling system to ensure the app can gracefully handle any issues that arise. This could include displaying error messages to the user and logging errors for debugging purposes.
- **Increase test coverage:** I would write more tests to ensure all parts of the application are working as expected.
- **Enhance the UI/UX:** I would spend time improving the user interface and user experience to make the app more engaging and easier to use. I could improve the layout using a design library like React Native Paper, and I could add support for theming as well as usability of the app on larger devices like tablets.

## Extending the Project

There are several ways this project could be extended in the future:

- **Add more features:** There are many potential features that could be added, such as user accounts, data syncing across devices, and more.
- **Improve performance:** There are always opportunities to make the app run faster and more efficiently.
- **Expand platform support:** While the app currently supports iOS and Android, it could be extended to support web and other platforms.
- **Localization:** The app could be localized to support multiple languages and regions.
- **Extend Forms:** I could also use a library like Formik to improve handling of inputs and dynamic state for the forms.
- **CMS:** Serving the forms dynamically is possible using a content management system like Contentful, since it is static content at the end of the day.
