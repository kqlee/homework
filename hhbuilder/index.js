//--------------------------------------------------------------------------------------------------
// Helper Functions
//--------------------------------------------------------------------------------------------------
// Grabs our data from our form fields
function grabFormData() {
  var formData = document.getElementsByTagName('input');
  var relationship = document.getElementsByTagName('select').rel.value;
  return {
    age: formData.age.value,
    relationship: relationship,
    smoker: formData.smoker.checked
  };
}

// Adds the person to the DOM
function addPerson(personData) {
  var elem = document.createElement('li');
  var className = elem.classList.add('person');
  var age = createElem('div', 'Age: ' + personData.age);
  var relationship = createElem('div', 'Relationship: ' + personData.relationship);
  var smoker = personData.smoker ? createElem('div', 'Smoker: Yes') : createElem('div', 'Smoker: No');
  var deleteButton = createButton(
    'remove-relationship',
    'Remove Relationship',
    function() {
      removePerson(elem);
    }
  );

  elem.appendChild(age);
  elem.appendChild(relationship);
  elem.appendChild(smoker);
  elem.appendChild(deleteButton);
  
  document.getElementsByClassName('household')[0].appendChild(elem);
}

// Creates DOM elements
function createElem(type, text) {
  var newElem = document.createElement(type);
  var elemText = document.createTextNode(text);
  newElem.appendChild(elemText);
  return newElem;
}

// Removes the person from the DOM
function removePerson(elem) {
  elem.parentNode.removeChild(elem);
}

function createButton(className, buttonText, func) {
  var button = document.createElement('button');
  var text = document.createTextNode(buttonText);
  button.appendChild(text);
  button.classList.add(className);
  button.addEventListener('click', function() {
    func()
  });
  return button;
}

function submitData(data, callback) {
  // console.log('DATA', data.length);
  if (!data.length) {
    console.error('Form cannot be empty!');
    return null;
  }
  var stringified = JSON.stringify(data);
  console.log('Passing data to the server...');
  setTimeout(function() {
    callback('Data successfully submitted!');
  }, 1500);
}

function resetForm() {
  var form = document.getElementsByTagName('input');
  form.age.value = '';
  form.smoker.checked = false;
  document.getElementsByTagName('select').rel.value = ''; 
}

//--------------------------------------------------------------------------------------------------
// Initial function invocation
//--------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementsByClassName('add')[0];
  var submitButton = document.getElementsByTagName('button')[1];

  // Add click event to add button
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    var personData = grabFormData();
    var error = '';
    if (!personData.age || isNaN(Number(personData.age)) || personData.age < 0) {
      error = 'input age is not valid';
      console.error(error);
      return;
    }
    // Validate relationship
    if (!personData.relationship.length) {
      error = 'please select a relationship';
      console.error(error);
      return;
    }
    // Add person to list if no errors
    addPerson(personData);
    // Clear Form fields
    resetForm();
  });

  // Add click event to submit button
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    var addedData = document.getElementsByClassName('household')[0].childNodes;
    // console.log('added data', addedData, 'length', addedData.length);
    submitData(addedData, function(res) {
      // Clean up DOM after successful submit
      var dom = document.getElementsByClassName('household')[0];
      while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
      }
      // Alert successful message
      alert(res);
    });
  });
});
