# S.M.T - Sistema de Monitoramento de Tutores
This project was created for the subjects of `Mobile Development` and `Information and Communication Technology Project 1` at IFSP-BRA.

## 💻 Requirements

- [node.js](https://nodejs.org/pt)
- [yarn classic](https://classic.yarnpkg.com/en/docs/install#windows-stable), be sure to install it before all.
- [smt-server](https://github.com/tavinhossaur/smt-server) this is the back-end this app is integrated with.

## 🚀 Installing <S.M.T>

To install <S.M.T> simply download it, open it on your favorite code editor and run ```yarn```.
After that go to the [connector](/app/common/axios/connector.ts#L4) configurations and change the ip address to your local, with the port that the [smt-server](https://github.com/tavinhossaur/smt-server) is running.

## ☕ Using <S.M.T>

To run the app you can use any of the commands bellow:

```
yarn start       -> for starting on expo go or emulators
yarn clean-start -> for cleaning cache and starting on expo go or emulators
yarn android     -> recommended for starting on a physical android device
yarn ios         -> recommended for starting on a physical iOS device
```

To use <S.M.T>, for the first time, since we don't have a register screen for non admin users, you'll have to use the one created with the database seed ```admin@admin.com // password: @ifsp2025``` ⚠️ We STRONGLY recommend that once you've logged in once, create a new admin user and delete the default one at the database, for more info see [smt-server](https://github.com/tavinhossaur/smt-server)'s README.

### ⚠️ Warning
Because this project uses [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/#usage), push notifications WON'T WORK without a physical device, so be sure to use one and run the proper ```yarn``` starting command.

# 📱 Mobile Development Grading Requirements:

## 🧩 Criteria, Functional Requirements, and Integration with Web API

### ⚠️ Disclaimer
In this project there are multiple roles, the CRUDs are only accessible if the user is an Admin, then the [AdminModule](/app/modules/Profile/modules/AdminModule.tsx) will be shown at the [ProfileScreen](/app/modules/Profile/ProfileScreen.tsx#L39).

### 📝 Introduction
It was created a generic [CRUDScreen](/app/modules/Profile/modules/CRUD/CRUDScreen.tsx) that populate itself with the correct entities based on which one was selected and passed to the screen via route params, with this info when the screen is loaded it checks the [entityRESTMap](/app/modules/Profile/modules/CRUD/helpers/entityRESTMap.ts) Record (typescript version of an dictionary), where the key is the entity type and the value is an object containing the function to `GET` and `DELETE` objects of that entity, making it way simpler to map entities entry in the [CRUDScreen](/app/modules/Profile/modules/CRUD/CRUDScreen.tsx) with a list of [CRUDItem](/app/modules/Profile/Helpers/CRUDItem.tsx) and handling deletion with the [DeleteModal](/app/modules/Profile/modules/CRUD/components/DeleteModal/DeleteModal.tsx), the `POST` and `PUT` are separated because they're handled by the entity's designated form, that can't be generic.

### 💾 [CR1] Implementation of CRUD integrated with Entity 1's Web API
#### 👨‍🏫 Professor CRUD
As the introduction said, both [GET](/app/common/axios/admin/professors/professors.ts#L22) and [DELETE](/app/common/axios/admin/professors/professors.ts#L34) functions are handled in the creation of the [CRUDScreen](/app/modules/Profile/modules/CRUD/CRUDScreen.tsx), for the [POST](/app/common/axios/admin/professors/professors.ts#L8) and [PUT](/app/common/axios/admin/professors/professors.ts#L46) they're handled in the [ProfessorForm](/app/modules/Profile/modules/CRUD/components/ProfessorForm/ProfessorForm.tsx), more precisely in the [useProfessorFormViewModel](/app/modules/Profile/modules/CRUD/components/ProfessorForm/useProfessorFormViewModel.ts) that is the hook responsible for the logic part of the `ProfessorForm`, the `useProfessorFormViewModel` when called receives two parameters, a boolean isEditing and the item that in this case is of the [Professor](/app/common/types/Professor.ts) type, the isEditing parameter is used for changing some titles from "Add/Create" to "Edit/Update" in the `ProfessorForm` and for selecting if the form should call the `POST` or the `PUT` function on submit, the item is used to get the `id` for the `PUT` function.

### 💾 [CR2] Implementation of CRUD integrated with Entity 2's Web API
#### 📅 Events CRUD
As the introduction said, both [GET](/app/common/axios/admin/events/events.ts#L37) and [DELETE](/app/common/axios/admin/events/events.ts#L49) functions are handled in the creation of the [CRUDScreen](/app/modules/Profile/modules/CRUD/CRUDScreen.tsx), for the [POST](/app/common/axios/admin/events/events.ts#L8) and [PUT](/app/common/axios/admin/events/events.ts#L58) they're handled in the [EventsForm](/app/modules/Profile/modules/CRUD/components/EventsForm/EventsForm.tsx), more precisely in the [useEventsFormViewModel](/app/modules/Profile/modules/CRUD/components/EventsForm/useEventsFormViewModel.ts) that is the hook responsible for the logic part of the `EventsForm`, the `useEventsFormViewModel` when called receives two parameters, a boolean isEditing and the item that in this case is of the [Events](/app/common/types/Events.ts) type, the isEditing parameter is used for changing some titles from "Add/Create" to "Edit/Update" in the `EventsForm` and for selecting if the form should call the `POST` or the `PUT` function on submit, the item is used to get the `id` for the `PUT` function.

### 🔐 [CR3] Implementation of User Creation and Authentication Screen integrated with the Web API
At this point you've already understood how the CRUDs work on this project, for the authentication flow an admin has to create an user using the [UserForm](/app/modules/Profile/modules/CRUD/components/UserForm/UserForm.tsx), there he will input the user's name, email and choose if that user is also and admin or not, then with the user created you can log-in with it at the [LoginScreen](/app/modules/Login/LoginScreen.tsx), when the user tries to log-in it is called the [loginUser](/app/common/axios/Auth/login.ts#L6), this function will receive the email and password, and also two other function for handling completion, onSuccess and onError, both are implemented at the [useLoginViewModel](/app/modules/Login/useLoginViewModel.ts#L31) the onError is simply for showing errors to the user, and the onSuccess will handle the auth flow, it [saves the JWT token](/global/SecureStore.ts#L4) and the [user's ID](/global/SecureStore.ts#L17) on the user's device with [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) which is an encrypted storage solution, it also [updates the connector](/app/common/axios/connector.ts#L11)'s `Authorization` header (the connector is the [axios](https://axios-http.com/ptbr/docs/intro) instance in this project) with the user's token, then it calls the [getUserProfile](/app/common/axios/profile/profile.ts#L8) function that is the `GET` of the user profile data from the REST API, and lastly it sets the global [Zustand](https://zustand-demo.pmnd.rs)'s [user state](/global/UserData/useUserStore.ts#L10) that will be used at the `ProfileScreen` for listing the user infos. When the app is initialized, if the user already logged-in once and haven't logged-out (since the token expiration time is quite big) we get the `token` and `userID` from the `expo-secure-store` at the [App.tsx](/App.tsx#L51) and do all the logic previously explained of setting the connector headers, getting and setting the user data and lastly setting the first screen to be the tab navigator instead of the login screen.

### ➕ [CR4] Implementation of Additional Requirement 1 integrated with the Web API
#### 🔍 Search for Professor / Classroom
The search bar is just a text input that redirects and send the typed string via route params to the [SearchResultScreen](/app/modules/SearchResult/SearchResultScreen.tsx), when this screen is being loaded it tries to get data from the REST API using the [searchProfessorsAndClassrooms](/app/common/axios/dashboard/dashboard.ts#L62) function that returns both classrooms and professors, in this screen we have two `FlatList` components, one for classrooms and other for professors, both are only rendered if the search returns data of that type instead of an empty array. When pressed, any of the cards will redirect for the correct "more infos" screen, being the [ProfessorScreen](/app/modules/Professor/ProfessorScreen.tsx) or the [RoomsMoreInfo](/app/modules/Rooms/RoomsMoreInfo.tsx).

### ➕ [CR5] Implementation of Additional Requirement 2 integrated with the Web API
#### 📆 Daily Listing of Professors
This will be at the [HomeScreen](/app/modules/Home/HomeScreen.tsx), it consists of an [HorizontalScroller](/app/common/components/HorizontalScroller/HorizontalScroller.tsx) (that handles the selected and selectable days, and also the logic to highlight "today") and a `FlatList` that maps all the data returned by the REST API into [ProfessorCard](/app/common/components/Cards/ProfessorCard/ProfessorCard.tsx) components. To get the data based on the day it is used an useEffect to get the data and reload the screen once it is loaded and everytime the selected day changes using the function [getProfessorsListByWeekdayAndCourse](/app/common/axios/dashboard/dashboard.ts#L21) to get the data from the REST API.

### ➕ [CR6] Implementation of Additional Requirement 3 integrated with the Web API
#### 🏢 Classroom Listing by Floor
This will be at the [RoomsScreen](/app/modules/Rooms/RoomsScreen.tsx), it consists of an [HorizontalScroller](/app/common/components/HorizontalScroller/HorizontalScroller.tsx) (that handles the selected and selectable floors) and a `FlatList` that maps all the data returned by the REST API into [RoomCard](/app/common/components/Cards/RoomCard/RoomCard.tsx) components. To get the data based on the floor it is used an useFocusEffect and a useCallback to get the data everytime the screen gains focus and everytime the selected floor changes using the function [getAllClassroomsListByFloor](/app/common/axios/dashboard/dashboard.ts#L10) to get the data from the REST API.

## 📱 Native Platform Features

### 📸 [CR1] Use of Camera in the Application Implementation
We achieved this one using [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) to open the camera and gallery, in the [ProfileScreen](/app/modules/Profile/ProfileScreen.tsx) when the user taps on the picture, it'll open the [ProfileImageModal](/app/modules/Profile/Helpers/ProfileImageModal.tsx), this is where we use the ImagePicker functions to ask for [permission to use the gallery](/app/modules/Profile/Helpers/ProfileImageModal.tsx#L71), [open the gallery to select a photo](/app/modules/Profile/Helpers/ProfileImageModal.tsx#L78), ask for [permission to use the camera](/app/modules/Profile/Helpers/ProfileImageModal.tsx#L94) and [open the camera to select a photo](/app/modules/Profile/Helpers/ProfileImageModal.tsx#L100).

### 🔔 [CR2] Use of Push Notifications in the Application Implementation
For this one we made it really simple using [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/), in the `App.tsx` is configured the [notification handler](/App.tsx#L18), then it is asked for [permissions to send push](/App.tsx#L77) and lastly we check if it is an android device so we can create the [notification channel](/App.tsx#L18) that is required for sending pushes on android. In the Extras tab, that renders the [RequiredResources](/app//modules/RequiredResources/RequiredResources.tsx) component we have the [Send notification section](/app//modules/RequiredResources/RequiredResources.tsx#L84) that lets the user type and send a simple push notification, if the button is pressed without anything typed on the text inputs it'll send a default generic message.

### 📍 [CR3] Use of Geolocation in the Application Implementation
For this one we also made it really simple using [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) in the `App.tsx` it is asked for [permissions to use geolocation](/App.tsx#L76). In the same [RequiredResources](/app//modules/RequiredResources/RequiredResources.tsx) component of the Push Notifications we have the [Current Location section](/app//modules/RequiredResources/RequiredResources.tsx#L92) that uses geolocation to get and show the user's precise location as Latitude and Longitude coordinates, and also offer a copy to clipboard button.