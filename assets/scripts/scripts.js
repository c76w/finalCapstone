// Insert the header
fetch("./partials/header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
  });

// Insert the footer
fetch("./partials/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
  });


// Wait for script to laod the header and footer and then add the year in the footer
setTimeout(() => {
  document.getElementById("cdate").innerHTML = (new Date().getFullYear());
}, 400);

// Contact Form Validation---------------------------------------------------------------------------

const contactBtn = document.getElementById('contactBtn');

const contactFromValidate = (e) => {
  e.preventDefault();

  // Get the input values
  const formName = document.getElementById('name').value; // Name
  const formEmail = document.getElementById('email').value; // Email
  const formMessage = document.getElementById('message').value; // Message

  //const validEmail = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  // Validate Name
  if (formName.length < 5) {
    alert('Please enter a valid name');
    return
  }
  // Validate Email
  if (!formEmail.match(validEmail)) {
    alert('Please enter a valid email');
    return
  }
  // Validate Message
  if (formMessage.length < 10) {
    alert('Please enter a valid message');
    return
  }

  // Clear the input values
  document.getElementById('name').value = ''; // Name
  document.getElementById('email').value = ''; // Email
  document.getElementById('message').value = ''; // Message

  alert('The form was submitted sucessfully!');
}

// Check if the contact button is on the page and then add a click event listener
if (contactBtn) {
  contactBtn.addEventListener('click', contactFromValidate);
}



// Likes ---------------------------------------------------------------------------------------------

// Set the likes array
let likesList = [];

// Get the likesList from the session, convert it to an array and then return it
const getLikes = () => {
  // Check if the likes list is in the session, if exists then parse to an array
  if (localStorage.getItem('likes') !== null) {
      likesList = JSON.parse(localStorage.getItem('likes'));
  }
  // Return the list of likes
  return likesList;
}

// Create a new likes object
function Like(liked) {
  this.Id = liked
}

// Add a click event to all the like buttons and add to local storage
const likeButtons = document.querySelectorAll('.btn-like');

// Function to get any previously liked like buttons
const getLiked = () => {

  // Get the likesList
  likesList = getLikes();

  // Get all all the like buttons and reset to not liked status
  likeButtons.forEach(item => {
    item.classList.remove('btn-liked'); // For items already liked but now removed then remove the class 'btn-liked' to the button
    item.setAttribute('title', 'Like'); // Change the title back to the original 'Like'
  });

  // Check if there are any likes in the likes array
  // If the button has already been liked then get the button ID local storage and add a class of 'btn-liked'
  // to each liked button
  if (likesList.length > 0 || likesList !== null || likesList !== []) {
    
    // Loop through likesList
    likesList.forEach(btn => {

      // Get the element by id
      let elementToChange = document.getElementById(btn.Id);

      // Check if the current element id is on the page
      if (elementToChange) {
        elementToChange.classList.add('btn-liked'); // For items already liked then add the class 'btn-liked' to the button
        elementToChange.setAttribute('title', 'You have already liked this'); // Change the title to show that they have already liked it
      }
    });
  }
}

// Function to add a liked button by parent ID to local storage
const addLike = (event) => {
  event.preventDefault();

  // Get the likesList
  likesList = getLikes();

  // Get the like button parent card ID
  const likeId = event.target.parentNode.id;

  // Create a new like
  const newLike = new Like(likeId);

  // Use findIndex to check the likesList to check if it has already been liked and in the list
  const foundInList = likesList.findIndex(Like => Like.Id === newLike.Id);

  // Check if the likesList is not empty or has at leat one entry
  if (likesList.length !== [] || likesList.length > 0) {
    // Check if the index of the newLike in the likesList
    if (foundInList >= 0) {
      likesList.splice(foundInList, 1); // If found then remove the item from the likesList by the index number
    } else {
      // If the newLike is not in the likesList then push the liked parent id to likes array
      likesList.push(newLike);
    }
  } else {
    // If the likesList is empty or not created push the liked parent id to likes array
    likesList.push(newLike);
  }

  // Add to local storage
  localStorage.setItem('likes', JSON.stringify(likesList));

  // Call the getliked function to get any liked items
  getLiked();
}

// Call the getliked function and check if there are any likes in the likes array
getLiked();



// Comments  (found on the teams page)-------------------------------------------------------------------------

// Declare the comments array
let commentsList = [];

// Get the commentsList from the session, convert it to an array and then return it
const getComments = () => {
  // Check if the comments list is in the session, if exists then parse to an array
  if (localStorage.getItem('comments') !== null) {
      commentsList = JSON.parse(localStorage.getItem('comments'));
  }
  // Return the list of comments
  return commentsList;
}

// Function to show commets to the teams page
const showComments = () => {
  // Get the commentsList
  commentsList = getComments();

  const commentsSection = document.getElementById('comments'); // Get the comments section by id

  // Check the comments section is on the page
  if (commentsSection) {
    commentsSection.innerHTML = ''; // Clear the comments before loading them again

    // Check if there are any comments in loccal storage
    if (localStorage.getItem('comments') !== null) {

      const newTitle = document.createElement('h2'); // Create the new h2 for the title

      newTitle.innerHTML = 'Previous Comments' // Set the h2 inner HTML

      commentsSection.appendChild(newTitle); // Append to the main comments div

    }

    // Loop throught the comments, create a new div element, add the comment as innerHTML then append to the page
    commentsList.forEach(comment => {
      const newDiv = document.createElement('div'); // Create the new div

      // Set the div inner HTML
      newDiv.innerHTML = `<div class="card p-3 my-4 commentMain bg-light"><div class="card-boby p-4 bg-light commentName">${comment.comment}</div><div class="card-footer ms-auto text-muted bg-light" style="border-top: none; font-style: italic;"><span>Added by - </span>${comment.name}</div></div>`;

      commentsSection.appendChild(newDiv); // Append to the main comments div
    });
  }
}

// Create a new comments object
function Comment(name, comment) {
  this.name = name,
  this.comment = comment
}

// Function to add a new comment
const addComment = (e) => {
  e.preventDefault();

  const name = document.getElementById('commentsName').value; // Get the name input value
  const comment = document.getElementById('commentsComment').value; // Get the comments input value

  // Comment form validation
  if (name.length < 5) {
    alert('Please enter a vaild name');
    return
  }
  if (comment.length < 10) {
    alert('Please enter a vaild comment');
    return
  }

  // Get the commentsList
  commentsList = getComments();

  // Create a new comment
  const newComment = new Comment(name, comment);

  // Push the new comment to commentsList array
  commentsList.push(newComment);

  // Add comment to local storage
  localStorage.setItem('comments', JSON.stringify(commentsList));

  // Clear the comments form input values
  document.getElementById('commentsName').value = '';
  document.getElementById('commentsComment').value = '';

  // Call the showComments function to display comments on the page
  showComments();
}

// Get the comments form button by ID
const commentBtn = document.getElementById('commentsBtn');

// Check if the commentBtn is on the page and add an click event listener to the button
if (commentBtn) {
  commentBtn.addEventListener('click', addComment);
}

// Call the showComments function to display comments on the page on page load
showComments();


// Saved for Later ---------------------------------------------------------------------------------------------

// Declare the Saved for Later array
let savedList = [];
// Declare the Saved for Later Count
let savedCount = 0;

// Get the savedList from the session, convert it to an array and then return it
const getSaved = () => {
  // Check if the saved list is in the session, if exists then parse to an array
  if (localStorage.getItem('savedItems') !== null) {
      savedList = JSON.parse(localStorage.getItem('savedItems'));
  }
  // Return the list of saved for later items
  return savedList;
}

// Get the savedList from the session, convert it to an array and then return it
const getSavedCount = () => {
  // Check if the saved list is in the session, if exists then parse to an array
  if (localStorage.getItem('savedCount') !== null) {
      savedCount = JSON.parse(localStorage.getItem('savedCount'));
  }
  // Return the saved Count
  return savedCount;
}

const showSaved = () => {
  // Get the savedList
  savedList = getSaved();

  const savedForLaterSection = document.getElementById('savedForLater'); // Get the savedForLater section by id

  // Check the savedForLater section is on the page
  if (savedForLaterSection) {
    savedForLaterSection.innerHTML = ''; // Clear the SavedForLater before loading them again

    // Check if there are any saved items in local storage, if there aren't then show a message on the page
    if (localStorage.getItem('savedItems') === null || localStorage.getItem('savedItems') === []) {

      const noSavedItemsMessage = document.createElement('h3'); // Create the new h3 for the message

      noSavedItemsMessage.classList.add('savedForLaterMessage'); // Add a class to the h3

      noSavedItemsMessage.innerHTML = 'You have not saved any items yet!' // Set the h3 inner HTML

      savedForLaterSection.appendChild(noSavedItemsMessage); // Append to the main savedForLater div

    } else {
      // Loop throught the comments, create a new div element, add the comment as innerHTML then append to the page
      savedList.forEach(savedItem => {

        const newDiv = document.createElement('div'); // Create the new div

        newDiv.classList.add('col-md-6', 'col-lg-4', 'p-2'); // Add classes to the new div

        // Set the div inner HTML
        newDiv.innerHTML = `<div class="savedItem">${savedItem.item}</div>`;

        savedForLaterSection.appendChild(newDiv); // Append to the main savedForLater div

        // Remove all the like buttons and save for later buttons as they are not need in the saved for later items
        const elementsToRemove = document.querySelectorAll('.likeSaveBtnContainer');
        
        // Loop through all the elementstoRemove and remove them
        elementsToRemove.forEach(element => {
          element.parentNode.removeChild(element);
        });

      });
    }

  }
}

// Create a new saved for later object
function Saved(item) {
  this.item = item
}

const addSaveItem = (e) => {
  e.preventDefault();

  let itemToSave = e.target.parentElement.parentElement.parentElement.parentElement.innerHTML; // Get the inner HTML of button clicked parents parent

  // Check if just an image has been clicked to save for later
  if (e.target.parentElement.classList.contains('btn-img-container') || e.target.parentElement.parentElement.classList.contains('btn-img-container')) {
    itemToSave = e.target.parentNode.parentNode.parentNode.getElementsByTagName('img')[0].outerHTML; // Get only the img tag
  }

  // Get the savedList
  savedList = getSaved();

  // Get the Saved Count
  savedCount = getSavedCount();

  // Check if there are any items in the saved list, if ther are then
  // check if the item to save is already saved, notify the user if it is already saved or save it to prevent duplicates
  if (savedList !== null) {
    for (let i = 0; i < savedList.length; i++) {
      if (savedList[i].item === itemToSave) {
        alert('This is already in your saved for later folder.');
        return;
      }
    }
  }

  // Create a new saved for later item
  const newItem = new Saved(itemToSave);

  // Push the new item to savedList array
  savedList.push(newItem);

  // Increase the saved count by 1
  savedCount += 1;

  // Add saved for later item to local storage
  localStorage.setItem('savedItems', JSON.stringify(savedList));

  // Add the update save count to local storage
  localStorage.setItem('savedCount', JSON.stringify(savedCount));

  // Notify the user of how many saved items they have
  alert(`You have ${savedCount} items in your saved for later folder.`);

  // Call the showSaved function to display saved items on the page
  showSaved();
}

// Get all the Save For Later for buttons by class
const saveForLaterBtns = document.querySelectorAll('.btn-favourite');

// Check if the btn-favourite is on the page and add an click event listener to the button
if (saveForLaterBtns) {
  // Loop though all the buttons and add a click event listener
  saveForLaterBtns.forEach(btn => {
    btn.addEventListener('click', addSaveItem);
  });
}

// Call the showSaved function to display any saved items on the page on page load
showSaved();

