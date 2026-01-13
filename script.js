// # OPERATIONS TO RUN ON PAGE LOAD

// Get the elements of interest from the page
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Create a key for local storage
const STORAGE_KEY = '__bool_todo__';

// Prepare an activities list
let activities = [];

// Check if there were activities in local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);
}

// Ask JS to decide what to show
showContent();

// # DYNAMIC OPERATIONS
// React to button click
button.addEventListener('click', function () {
  // Ask to add the activity
  addActivity();
});

// # FUNCTIONS

// Function that decides what to show on the page
function showContent() {
  // First of all, clear everything
  todoList.innerText = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {
    // If there is at least one activity...
    // for each activity...
    activities.forEach(function (activity) {
      // Create an HTML template
      const template = createActivityTemplate(activity);

      // Insert it into the page
      todoList.innerHTML += template;
    });

    // Make the checks clickable
    makeCheckClickable();

  } else {
    // OTHERWISE
    // Show the empty list message
    emptyListMessage.innerText = 'It looks like there are no activities';
  }
}

// Function to make checks clickable
function makeCheckClickable() {
  // Find all the checks and make them clickable
  const checks = document.querySelectorAll('.todo-check');

  // For each check...
  checks.forEach(function (check, index) {
    // Add a click reaction
    check.addEventListener('click', function () {
      // Remove the element from the list
      activities.splice(index, 1);

      // Update localStorage as well
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

      // Update the list on the page
      showContent();
    });
  });
}

// Function to add an activity
function addActivity() {
  // Get the text from the input field
  const newActivity = inputField.value.trim();

  // If the field is not empty...
  if (newActivity.length > 0) {

    // Add the activity to the list
    activities.push(newActivity);

    // Update storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

    // Decide again what to show
    showContent();

    // Clear the input field
    inputField.value = '';
  }
}

// Function that creates an HTML template for an activity
function createActivityTemplate(activity) {
  // Return this piece of HTML
  return `
   <li class="todo-item">
     <div class="todo-check">
       <img src="images/check.svg" alt="Check Icon">
     </div>
     <p class="todo-text">${activity}</p>
   </li>
   `;
}
