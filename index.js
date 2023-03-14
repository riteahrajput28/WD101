const form = document.getElementById('registration-form');
const entriesTable = document.getElementById('entries-table');
const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];

// Define a function to add an entry to the table
function addEntryToTable(name, email, password, dob, terms) {
  // Create a new table row
  const row = entriesTable.insertRow();

  // Insert table cells for each form field value
  const nameCell = row.insertCell();
  const emailCell = row.insertCell();
  const passwordCell = row.insertCell();
  const dobCell = row.insertCell();
  const termsCell = row.insertCell();
  nameCell.innerHTML = name;
  emailCell.innerHTML = email;
  passwordCell.innerHTML = password;
  dobCell.innerHTML = dob;
  termsCell.innerHTML = terms ? "true" : "false";
}

// Define a function to validate email addresses
function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// Define a function to calculate age based on date of birth
function calculateAge(dob) {
  const dobDate = new Date(dob);
  const nowDate = new Date();
  const age = nowDate.getFullYear() - dobDate.getFullYear();
  const monthDiff = nowDate.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && nowDate.getDate() < dobDate.getDate())) {
    return age - 1;
  }
  return age;
}

// Load existing entries from localStorage
storedEntries.forEach(entry => {
  addEntryToTable(entry.name, entry.email, entry.password, entry.dob, entry.acceptedTerms);
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const dob = form.elements['dob'].value;
  const terms = form.elements['acceptedTerms'].checked;

  // Validate email address
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Calculate age
  const age = calculateAge(dob);

  // Check age limit
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  // Create a new entry object and add to table and localStorage
  const entry = { name, email, password, dob, terms };
  storedEntries.push(entry);
  localStorage.setItem('entries', JSON.stringify(storedEntries));
  addEntryToTable(name, email, password, dob, terms);

  form.reset();
});
