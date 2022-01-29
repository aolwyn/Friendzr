# Tech

- For good-looking frontend we are thinking of using Bootstrap.
  - https://getbootstrap.com/docs/5.1/components/buttons/
- For video-transcription:
  - https://www.assemblyai.com/
- Express+CockroachDB+Google for the server.
  - https://expressjs.com/
  - SQL Protocol. https://www.linkedin.com/learning/sql-essential-training-3/
  - We will need to make a choice if we are running CockroachDB ourselves or using the cluster.
    - Let's try running it ourselves:
      - https://www.cockroachlabs.com/docs/stable/secure-a-cluster.html#before-you-begin
      - We will want to run a single node cluster because multiple \
      nodes on a single machine is not sutiable for production.
  - READING AND WRITING TO DATABASE FROM SERVER:
    - Basically an HTTP get request with the SQL command as the query string.
- Token/cookie: For keeping the user logged in
  - See here for Cookies and JWT https://github.com/BluBloos/Collective-Scholars2/blob/master/store/index.js
  - Maybe look here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- Firebase: 
  - Email/password authentication. https://firebase.google.com/docs/auth/web/password-auth#web-version-9  
  - Email verification. https://firebase.google.com/docs/auth/web/email-link-auth
- Oauth2 -> Google/Apple auth flows.
  - Google: https://developers.google.com/identity/sign-in/web/sign-in
  - Apple: https://support.apple.com/en-ca/HT211687
- Telegram Protocol: For Messaging
  - End-to-end encryption: https://core.telegram.org/api/end-to-end
- Writing websites for both mobile and non-mobile
  - https://webup.org/blog/react-device-based-code-split/
  - https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/
  - The classic,
  ```css
  /* Mobile */
    @media (max-width: 768px) {
    .TopBar {
        height: 100px;
        background-color: #ccc;
        ...
    }
  ```
  - Also note,
  ```css
  @media (pointer: fine) {
    /* using a mouse or stylus - ok to use small buttons/controls */
    }
    @media (pointer: coarse) {
    /* using touch - make buttons and other "touch targets" bigger */
    }
    @media (hover: hover) {
    /* ok to use :hover-based menus */
    }
    @media (hover: none) {
    /* don't use :hover-based menus */
    }
  ```


# MVP

## Goals
- Should work on mobile and desktop.
- Should look beautiful.
- Should be performant.
- Should be secure.
- Should be accessible.
  - Because if everyone cannot use our platform, how is it promoting interconnectedness?
- Should be functional.
- Should solve the problem of "matching with the right people as fast as possible".

## Functional Requirements
- Should work on both mobile browser clients and desktop browser clients.
- Auth types: email/password, Google, Apple.
- User profile videos are automatically transcribed.
- Ability to browse other profiles. Swipe either left or right.
- Direct messaging with those you have matched with.
- Guided activity for creating account details.
  - Ability to record 30-second video and upload to profile.

# Task Distribution

## Noah - Backend
- Direct Messaging
- Authentication.
  - creating account
  - tokens in Web browser for staying logged in
  - Email verification
  - OAuth2 for Google and Apple
  - Firebase.
- Let Sinan know the data that we store for each user.
  - Schemas.

## Adam - Frontend
- Recording on the client.
- Swipe Stuff -> main "flow" of the app.

## Sinan - DevOps
- Design of the GUI.
- Frontend CSS styling stuff.
- Managing Firebase.
- Managing Google Cloud.
- Express Server.
- Cockroach DB.

# Research "Corner"

## How to make a Website Accessible
https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility

- Slow Network Connections
- Semantic HTML?

### Targets to Consider
- People with visual impairments
  - These people use:
    - Screen readers https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility#screenreaders
    - Zoom
  - These people are:
    - Blind
    - Low-level vision
    - Color-blind
- People with hearing impairments
  - These people use:
    - Video transcription and captioning
  - These people are:
    - Deaf
    - hard of hearing
- People with mobility impairments
  - These people use:
    - Keyboard control of websites https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility#using_native_keyboard_accessibility
  - These people have:
    - Physical weakness and can therefore not use a mouse
- People with cognitive impairments
  - Designing for these people:
    - Generally good design. i.e. simple, right to the point, etc
  - The people might have:
    - Dyslexia
    - ADHD


## Developing for Mobile and Desktop

## How to Make it Beautiful

## How to make it Secure