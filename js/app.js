// USER CLASS
class User {
    constructor(name, email, phone, city) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
    }
}


// UI CLASS
class UI {
    addUsers(user) {
        const list = document.getElementById('user-list');

        // Create tr element
        const row = document.createElement('tr');
        // Insert col in tr
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.city}</td>
            <td class="text-center"><a href="#" class="delete btn btn-danger">X</a></td>
        `;

        // append row to list
        list.appendChild(row);
    }

    // Show alert
    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text inside div
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#user-form');
        // Place alert before form
        container.insertBefore(div, form);

        // Timeout the alert after 3s
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2500);
    }

    // Clear Input fields after inserting user
    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('city').value = '';
    }

    // Delete user
    deleteUser(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }
}

// LOCAL STORAGE CLASS
class Store {
    // Get user from local storage
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    // Display users from local storage to UI
    static displayUsers() {
        const users = Store.getUsers();

        users.forEach(function(user) {
            // Instantiate UI
            const ui = new UI

            // Add book to UI
            ui.addUsers(user);
        });
    }

    // Add user to local storage
    static addUser(user) {
        const users = Store.getUsers();

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    // Remove user from local storage
    static removeUser(city) {
        const users = Store.getUsers();


        users.forEach(function(user, index) {
            if (user.city === city) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayUsers());


// EVENT LISTENER TO ADD USERS
document.getElementById('user-form').addEventListener('submit', function(e) {
    // Get input values
    const name = document.getElementById('name').value,
        email = document.getElementById('email').value,
        phone = document.getElementById('phone').value,
        city = document.getElementById('city').value;


    // Instantiate user
    const user = new User(name, email, phone, city);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (name === '' || email === '' || phone === '' || city === '') {
        // Show Error
        ui.showAlert('Please fill up all the fields', 'alert-danger');
    } else {
        // Add user to list
        ui.addUsers(user);

        // Add user to local storage
        Store.addUser(user);

        // Show success message
        ui.showAlert('User has been added', 'alert-success');

        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();

});


// EVENT LISTENER TO DELETE USER
document.getElementById('user-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();

    // Delete User
    ui.deleteUser(e.target);



    // Remove user from local storage
    Store.removeUser(e.target.parentElement.previousElementSibling.textContent);

    // Show delete message
    ui.showAlert('User has been deleted!', 'alert-info');

    e.preventDefault();
});