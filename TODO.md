# MVP
- Should work on mobile and desktop.
- Should look beautiful.
- Should be performant.
- Should be secure.
- Should be accessible.
  - Because if everyone cannot use our platform, how is it promoting interconnectedness?
- Should be functional.
- Should solve the problem of "matching with the right people as fast as possible".

# TODO

- Authentication.
  - Logging in with email and password -> <span style="color:green;">COMPLETE.</span>
  - Logged-in state is valid on App component -> <span style="color:green;">COMPLETE.</span> 
  - Authentication persistence -> <span style="color:green;">COMPLETE.</span>
  - Creating account with email and password -> <span style="color:green;">COMPLETE.</span>  
  - Users logging out -> <span style="color:green;">COMPLETE.</span>
  - Email verification -> <span style="color:green;">COMPLETE.</span>

- User profile videos are automatically transcribed.
  - Users need to be able to record videos on the client. -> <span style="color:green;">COMPLETE.</span> 
  - Then upload these to the backend for local storage and referecening via a uri in the SQL databse -> <span style="color:red;">SINAN</span>
  - These videos must be automatically transcribed.
  - There must exist a method to play transcripted videos.

- Frontend Work -> <span style="color:red;">NOAH</span>
  - Implement the "Edit my Profile" by the design
  - Implement the "Messenger" by the design 
  - Implement the "Lef/Right Swipe Flow" by the design
  - Implement the "Login/Signup" by the design
  - Implement the "First Time" by the design

- Direct Messaging -> <span style="color:red;">NOAH</span>
  - Load connections from database.
  - Load archived messages with connections from database.
  - Load new messages from active conversations.
  - Send messages to another user.
  - userCurrentlyOnline flag properly set.

- First Time Opening App
  - Guided/sequenced process
    - Recording your 30 second video.
    - Entering in details for your profile.
  - When the user first signs up, put user information in the SQL database -> <span style="color:red;">SINAN</span>


- Swipe Right/Left Flow
  - Load random users from database as potential matches.
    - And their profile data.
  - These are sequenced (video first, then profile)
    - Play video
    - Display profile
  - Control logic for swipe left/right, then adding as a match.
    - Feedback to the user (like a checkmark -> yes, x -> for no).

- UI/UX Design
  - "First Time" Design 
  - "Messenger" Design -> <span style="color:green;">COMPLETE.</span>
  - "Edit my Profile" Design -> <span style="color:green;">COMPLETE.</span>
  - "Left/Right Swipe Flow" Design -> <span style="color:red;">SINAN</span>
  - "Login/Signup" Design -> <span style="color:green;">COMPLETE.</span>
    - Note that for this, there is no explicit deisign. We have decided to go with the current implementation, but with the color pallete applied. 

- Final Touches
  - OAuth2/Firebase for Google authentication. -> <span style="color:red;">NOAH</span>
  - Password reset -> <span style="color:red;">NOAH</span>
  - Change email flow to be more "clean". -> <span style="color:red;">NOAH</span>
    - See: https://firebase.google.com/docs/auth/web/passing-state-in-email-actions
    - Ensure it is sending from custom domain.
    - Are we going to update the email verified step if they are logged in, then verify?

# How to make a Website Accessible
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

