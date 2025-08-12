// frontendData.js
module.exports = [
  // ================= HTML =================
  {
    topic: "html-elements",
    title: "HTML Elements",
    description: "HTML elements are the building blocks of any web page. They define the structure and meaning of content.",
    learnPoints: [
      { point: "Basic Tags", subDescription: "Understanding <html>, <head>, and <body> tags and their roles." },
      { point: "Headings & Paragraphs", subDescription: "Using <h1> to <h6> for headings and <p> for paragraphs." },
      { point: "Lists", subDescription: "Creating ordered (<ol>) and unordered (<ul>) lists with list items (<li>)." },
      { point: "Images", subDescription: "Displaying images using <img> tag with src and alt attributes." }
    ],
    realWorld: "Used to create the basic layout and structure of every website.",
    project: "Build a 'About Me' page with headings, images, and lists.",
    videoEmbed: "https://www.youtube.com/embed/qz0aGYrrlhU",
    links: [
      { label: "HTML Basics - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" }
    ]
  },
  {
    topic: "semantic-tags",
    title: "Semantic HTML Tags",
    description: "Semantic HTML tags clearly describe their meaning in a way that is readable by both developers and browsers.",
    learnPoints: [
      { point: "<header>", subDescription: "Represents introductory content, typically a group of navigational aids." },
      { point: "<main>", subDescription: "Specifies the main content unique to the document." },
      { point: "<section>", subDescription: "Defines thematic grouping of content." },
      { point: "<footer>", subDescription: "Represents a footer for its nearest sectioning content." }
    ],
    realWorld: "Helps with SEO and accessibility by giving structure to web pages.",
    project: "Rebuild your 'About Me' page using semantic tags for better structure.",
    videoEmbed: "https://www.youtube.com/embed/g2sTxdxXQ2w",
    links: [
      { label: "Semantic HTML Guide", url: "https://www.w3schools.com/html/html5_semantic_elements.asp" }
    ]
  },
  {
    topic: "forms",
    title: "HTML Forms",
    description: "HTML forms are used to collect user input. Forms can contain various input elements like text fields, checkboxes, radio buttons, and submit buttons.",
    learnPoints: [
      { point: "Form Tag", subDescription: "The <form> element wraps all form controls." },
      { point: "Input Types", subDescription: "Text, email, password, number, date, and more." },
      { point: "Labels", subDescription: "Improves accessibility by connecting text with form controls." },
      { point: "Form Validation", subDescription: "Using required, pattern, and other attributes." }
    ],
    realWorld: "Used in login/signup, checkout pages, surveys, and contact forms.",
    project: "Create a sign-up form with validation.",
    videoEmbed: "https://www.youtube.com/embed/fNcJuPIZ2WE",
    links: [
      { label: "HTML Forms - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" }
    ]
  },
  {
    topic: "links",
    title: "Hyperlinks in HTML",
    description: "Hyperlinks allow navigation from one page to another or to different parts of the same page.",
    learnPoints: [
      { point: "<a> tag", subDescription: "Used to define hyperlinks with href attribute." },
      { point: "Target Attribute", subDescription: "Controls where the link opens (_blank, _self, etc)." },
      { point: "Anchor Links", subDescription: "Linking to specific sections within a page." }
    ],
    realWorld: "Essential for website navigation, SEO linking, and external references.",
    project: "Create a multi-section page with internal anchor links.",
    videoEmbed: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    links: [
      { label: "HTML Links - W3Schools", url: "https://www.w3schools.com/html/html_links.asp" }
    ]
  },
  {
    topic: "tables",
    title: "HTML Tables",
    description: "Tables allow you to display tabular data in rows and columns.",
    learnPoints: [
      { point: "<table>", subDescription: "The wrapper element for all table content." },
      { point: "Rows & Columns", subDescription: "Defining <tr>, <td>, and <th> elements." },
      { point: "Table Headers", subDescription: "Using <thead>, <tbody>, and <tfoot> for structure." },
      { point: "Styling Tables", subDescription: "Applying CSS for better presentation." }
    ],
    realWorld: "Used for data presentation such as reports, schedules, and statistics.",
    project: "Create a product price list using a table.",
    videoEmbed: "https://www.youtube.com/embed/biI9OFH6Nmg",
    links: [
      { label: "HTML Tables - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table" }
    ]
  },

  // ================= CSS =================
  {
    topic: "selectors",
    title: "CSS Selectors",
    description: "CSS selectors define which HTML elements the styles should apply to. Mastering selectors lets you target elements precisely.",
    learnPoints: [
      { point: "Basic Selectors", subDescription: "Select elements by tag name, class (.className), or ID (#idName)." },
      { point: "Combinators", subDescription: "Use descendant, child (>), adjacent (+), and sibling (~) selectors for complex targeting." },
      { point: "Attribute Selectors", subDescription: "Target elements based on attributes like [type='text'] or [href*='https']." }
    ],
    realWorld: "Used for styling specific elements without adding extra HTML markup or classes.",
    project: "Build a styled contact form using only attribute and combinator selectors.",
    videoEmbed: "https://www.youtube.com/embed/l1mER1bV0N0",
    links: [
      { label: "CSS Selectors - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors" }
    ]
  },
  {
    topic: "box-model",
    title: "CSS Box Model",
    description: "The CSS box model describes how the size of every element is calculated: content, padding, border, and margin.",
    learnPoints: [
      { point: "Content", subDescription: "The actual text or image inside the element." },
      { point: "Padding", subDescription: "Space between the content and the element's border." },
      { point: "Border & Margin", subDescription: "Border surrounds the padding, and margin is the space outside the border." }
    ],
    realWorld: "Essential for layout design, spacing consistency, and preventing overlapping elements.",
    project: "Create a product card layout focusing on padding, border, and margin adjustments.",
    videoEmbed: "https://www.youtube.com/embed/rIO5326FgPE",
    links: [
      { label: "CSS Box Model - W3Schools", url: "https://www.w3schools.com/css/css_boxmodel.asp" }
    ]
  },
  {
    topic: "flexbox",
    title: "CSS Flexbox",
    description: "Flexbox is a layout mode in CSS that arranges elements in rows or columns with flexible sizing and alignment.",
    learnPoints: [
      { point: "Main Axis vs Cross Axis", subDescription: "Main axis is defined by flex-direction, cross axis is perpendicular to it." },
      { point: "Justify & Align", subDescription: "Control alignment with justify-content and align-items." },
      { point: "Flex Properties", subDescription: "Use flex-grow, flex-shrink, and flex-basis for flexible sizing." }
    ],
    realWorld: "Used for responsive navigation bars, grids, and aligning content vertically/horizontally.",
    project: "Create a responsive navbar and card grid using Flexbox.",
    videoEmbed: "https://www.youtube.com/embed/fYq5PXgSsbE",
    links: [
      { label: "Flexbox Guide - CSS Tricks", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
    ]
  },
  {
    topic: "grid",
    title: "CSS Grid",
    description: "CSS Grid Layout is a two-dimensional system for building complex web layouts with rows and columns.",
    learnPoints: [
      { point: "Grid Container & Items", subDescription: "Use display: grid to start; define grid-template-rows and grid-template-columns." },
      { point: "Grid Areas", subDescription: "Name areas for easy layout management." },
      { point: "Gap Property", subDescription: "Add space between rows and columns without margins." }
    ],
    realWorld: "Used for dashboards, image galleries, and complex layouts.",
    project: "Design a photo gallery layout with CSS Grid, responsive for mobile and desktop.",
    videoEmbed: "https://www.youtube.com/embed/EFafSYg-PkI",
    links: [
      { label: "Grid Layout - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" }
    ]
  },
  {
    topic: "media-queries",
    title: "Media Queries",
    description: "Media queries allow you to apply CSS rules depending on device size, resolution, or orientation.",
    learnPoints: [
      { point: "Min-width and Max-width", subDescription: "Create breakpoints for responsive design." },
      { point: "Orientation", subDescription: "Apply styles based on portrait or landscape modes." },
      { point: "Device-Specific Styling", subDescription: "Target high-resolution screens with min-resolution." }
    ],
    realWorld: "Crucial for making websites responsive across mobile, tablet, and desktop.",
    project: "Create a responsive landing page that adjusts for mobile, tablet, and desktop screens.",
    videoEmbed: "https://www.youtube.com/embed/yU7jJ3NbPdA",
    links: [
      { label: "Media Queries - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" }
    ]
  },
  // ================= JavaScript =================
{
  topic: "variables",
  title: "JavaScript Variables",
  description: "Variables store data values that can be used and manipulated throughout your JavaScript code.",
  learnPoints: [
    { point: "var, let, const", subDescription: "Understand the differences in scope, redeclaration, and reassignment." },
    { point: "Data Types", subDescription: "Strings, numbers, booleans, objects, arrays, null, undefined, and symbols." },
    { point: "Hoisting", subDescription: "How variable declarations are moved to the top of their scope." }
  ],
  realWorld: "Variables are essential for storing user input, API responses, and calculated values.",
  project: "Create a simple calculator that stores and updates values using variables.",
  videoEmbed: "https://www.youtube.com/embed/Bv_5Zv5c-Ts",
  links: [
    { label: "JavaScript Variables - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables" }
  ]
},
{
  topic: "functions",
  title: "JavaScript Functions",
  description: "Functions are reusable blocks of code that perform specific tasks.",
  learnPoints: [
    { point: "Function Declaration", subDescription: "Traditional way to define a function using the function keyword." },
    { point: "Arrow Functions", subDescription: "A shorter syntax introduced in ES6, often used for inline functions." },
    { point: "Parameters & Arguments", subDescription: "Pass data into functions and use it inside." },
    { point: "Return Values", subDescription: "Send data back from a function to where it was called." }
  ],
  realWorld: "Functions are used everywhere, from handling button clicks to processing data from APIs.",
  project: "Write a function that filters an array of numbers to only even values.",
  videoEmbed: "https://www.youtube.com/embed/8dWL3wF_OMw",
  links: [
    { label: "JavaScript Functions - W3Schools", url: "https://www.w3schools.com/js/js_functions.asp" }
  ]
},
{
  topic: "dom",
  title: "Document Object Model (DOM)",
  description: "The DOM represents the structure of a web page, allowing JavaScript to access and modify HTML elements.",
  learnPoints: [
    { point: "Selecting Elements", subDescription: "Use getElementById, querySelector, and querySelectorAll." },
    { point: "Modifying Content", subDescription: "Change innerHTML, textContent, and attributes." },
    { point: "Creating Elements", subDescription: "Use createElement and appendChild to add new elements." }
  ],
  realWorld: "Used for interactive websites where content changes without reloading the page.",
  project: "Create a to-do list app where items can be added and removed dynamically.",
  videoEmbed: "https://www.youtube.com/embed/0ik6X4DJKCc",
  links: [
    { label: "DOM Introduction - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" }
  ]
},
{
  topic: "events",
  title: "JavaScript Events",
  description: "Events are actions that occur in the browser, like clicks, key presses, or page loads, which can trigger JavaScript code.",
  learnPoints: [
    { point: "Event Listeners", subDescription: "Use addEventListener to respond to user actions." },
    { point: "Common Events", subDescription: "click, input, submit, mouseover, keydown, etc." },
    { point: "Event Object", subDescription: "Contains information about the event, such as target and type." }
  ],
  realWorld: "Essential for building interactive web applications.",
  project: "Make a button that changes the background color randomly when clicked.",
  videoEmbed: "https://www.youtube.com/embed/EaRrmOtPYTM",
  links: [
    { label: "JavaScript Events - W3Schools", url: "https://www.w3schools.com/js/js_events.asp" }
  ]
},
{
  topic: "es6plus",
  title: "ES6+ Features",
  description: "Modern JavaScript introduces powerful features that make code more concise and easier to read.",
  learnPoints: [
    { point: "Template Literals", subDescription: "Use backticks for multi-line strings and variable interpolation." },
    { point: "Destructuring", subDescription: "Extract values from arrays and objects easily." },
    { point: "Spread & Rest Operators", subDescription: "... for copying and combining data." },
    { point: "Modules", subDescription: "Use import and export for modular code." }
  ],
  realWorld: "These features are standard in modern web development.",
  project: "Refactor an old JavaScript project to use ES6+ features.",
  videoEmbed: "https://www.youtube.com/embed/NCwa_xi0Uuc",
  links: [
    { label: "ES6 Features - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" }
  ]
},
// ================= React =================
{
  topic: "jsx",
  title: "JSX - JavaScript XML",
  description: "JSX is a syntax extension for JavaScript that allows writing HTML-like code inside JavaScript, making UI creation more intuitive.",
  learnPoints: [
    { point: "Basic Syntax", subDescription: "Looks like HTML but gets compiled to React.createElement calls." },
    { point: "Embedding Expressions", subDescription: "Use curly braces {} to insert JavaScript expressions inside JSX." },
    { point: "Attributes in JSX", subDescription: "Use camelCase for attributes like className and htmlFor." }
  ],
  realWorld: "JSX is used in almost all React applications for creating components' structure.",
  project: "Create a profile card component using JSX with dynamic name and photo.",
  videoEmbed: "https://www.youtube.com/embed/SqcY0GlETPk",
  links: [
    { label: "JSX - React Docs", url: "https://react.dev/learn/writing-markup-with-jsx" }
  ]
},
{
  topic: "props",
  title: "Props in React",
  description: "Props (short for properties) are used to pass data from parent to child components in React.",
  learnPoints: [
    { point: "Passing Props", subDescription: "Send data as attributes when rendering a component." },
    { point: "Accessing Props", subDescription: "Read props inside a component using props.name." },
    { point: "Default Props", subDescription: "Set default values for props when not provided." }
  ],
  realWorld: "Props make components reusable by customizing their data and behavior.",
  project: "Create a button component that changes text and style based on props.",
  videoEmbed: "https://www.youtube.com/embed/MhkGQAoc7bc",
  links: [
    { label: "Props - React Docs", url: "https://react.dev/learn/passing-props-to-a-component" }
  ]
},
{
  topic: "state",
  title: "State in React",
  description: "State is a built-in object that stores component-specific data that can change over time.",
  learnPoints: [
    { point: "useState Hook", subDescription: "Allows functional components to have state variables." },
    { point: "Updating State", subDescription: "Call the state updater function to change values." },
    { point: "State vs Props", subDescription: "Props are read-only, state is mutable inside the component." }
  ],
  realWorld: "State is used for interactive features like forms, modals, counters, etc.",
  project: "Create a counter app that increments, decrements, and resets state.",
  videoEmbed: "https://www.youtube.com/embed/O6P86uwfdR0",
  links: [
    { label: "State - React Docs", url: "https://react.dev/learn/state-a-components-memory" }
  ]
},
{
  topic: "hooks",
  title: "React Hooks",
  description: "Hooks are functions that let you use React features like state and lifecycle in functional components.",
  learnPoints: [
    { point: "useEffect", subDescription: "Run side effects like fetching data after render." },
    { point: "useContext", subDescription: "Access global state without prop drilling." },
    { point: "Custom Hooks", subDescription: "Create reusable logic using custom hooks." }
  ],
  realWorld: "Hooks replaced many class-based lifecycle methods and made code cleaner.",
  project: "Build a weather app that fetches API data using useEffect.",
  videoEmbed: "https://www.youtube.com/embed/TNhaISOUy6Q",
  links: [
    { label: "Hooks - React Docs", url: "https://react.dev/learn/hooks-intro" }
  ]
},
{
  topic: "component-tree",
  title: "React Component Tree",
  description: "The component tree represents the hierarchy of components in a React app.",
  learnPoints: [
    { point: "Parent & Child Components", subDescription: "Components can be nested and pass data down." },
    { point: "Data Flow", subDescription: "Data flows from top to bottom via props." },
    { point: "Reusability", subDescription: "Breaking UI into small components improves maintainability." }
  ],
  realWorld: "Used for organizing large-scale React projects.",
  project: "Create a dashboard with nested components for header, sidebar, and content.",
  videoEmbed: "https://www.youtube.com/embed/Ke90Tje7VS0",
  links: [
    { label: "Component Tree - React Docs", url: "https://react.dev/learn/thinking-in-react" }
  ]
}



];
// This file contains frontend data for HTML and CSS topics, including learn points, real-world applications, projects, and resources.