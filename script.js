window.addEventListener('load', function () {
    document.getElementById('chatContent').innerHTML = '';
    populateChats();
    setupWebhook();
});

var chatData = {
    1: {
        customer: 'John Doe - Buy Car',
        intention: 'Purchase New Sportage',
        details: {
            firstName: 'John',
            lastName: 'Doe',
            phone: '123-456-7890',
            email: 'john.doe@example.com'
        },
        messages: [
            { sender: 'Customer', text: 'Gday! Ive been eyeing up a new Kia Sportage to help me get around the farm and into town. Can you shed some light on it??', time: '10:05 AM' },
            { sender: 'Chatbot', text: ' Gday! Youve got a good eye – the Kia Sportage is a solid choice for both farm tracks and city streets. Its got a comfy cabin and enough room for the dogs or the shopping. What are you keen to know first? The dollars and cents, or the bells and whistles?', time: '10:06 AM' },
            { sender: 'Customer', text: 'Yeah, reckon it’d be good to know the finance side of things', time: '10:07 AM' },
            { sender: 'Chatbot', text: 'No worries! Kia has got a few ways to help you split the bill. Traditional financing, leasing, or some special offers that might tickle your fancy. Theyve got online calculators too, so you can see what the monthly dent in the wallet would look like. Fancy a squiz at any of these options?', time: '10:08 AM' },
            { sender: 'Customer', text: 'Good on ya. How’s she go on the juice?', time: '10:07 AM' },
            { sender: 'Chatbot', text: 'The Sportage is pretty fair dinkum on fuel. It guzzles around 9.8 litres per 100 kilometres in the city, and sips about 6.9 litres per 100 kilometres on the open road. Actual thirst might vary with how heavy your foot is. Ready to dive into the next topic?', time: '10:08 AM' },
        ]
    },
    2: {
        customer: 'Jane Smith - Rent House',
        intention: 'Rent House',
        details: {
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '987-654-3210',
            email: 'jane.smith@example.com'
        },
        messages: [
            { sender: 'Customer', text: 'How do I return an online order?', time: '11:10 AM' },
            { sender: 'Chatbot', text: 'You can return online orders by visiting our Returns page.', time: '11:11 AM' },
            { sender: 'Customer', text: 'What is your return policy?', time: '11:12 AM' },
            { sender: 'Chatbot', text: 'Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.', time: '11:13 AM' }
        ]
    },
    3: {
        customer: 'Michael Johnson - Book Flight',
        intention: 'Book Flight',
        details: {
            firstName: 'Michael',
            lastName: 'Johnson',
            phone: '456-789-0123',
            email: 'michael.johnson@example.com'
        },
        messages: [
            { sender: 'Customer', text: 'How can I track my order?', time: '12:15 PM' },
            { sender: 'Chatbot', text: 'You can track your order by logging into your account and clicking on Order History.', time: '12:16 PM' },
            { sender: 'Customer', text: 'What if my order is delayed?', time: '12:17 PM' },
            { sender: 'Chatbot', text: 'If your order is delayed, you can contact our customer service for further assistance.', time: '12:18 PM' }
        ]
    },  // <-- Added comma here to separate the objects  

    4: {
        customer: 'Emily Davis - Reserve Hotel',
        intention: 'Reserve Hotel',
        details: {
            firstName: 'Emily',
            lastName: 'Davis',
            phone: '456-789-0124',
            email: 'emily.davis@example.com'
        },
        messages: [
            { sender: 'Customer', text: 'Do you offer gift wrapping?', time: '01:20 PM' },
            { sender: 'Chatbot', text: 'Yes, we offer complimentary gift wrapping.', time: '01:21 PM' },
            { sender: 'Customer', text: 'Great! How can I add it to my order?', time: '01:22 PM' },
            { sender: 'Chatbot', text: 'You can add gift wrapping at the checkout page.', time: '01:23 PM' }
        ]
    },
    5: {
        customer: 'Alex Martinez - Schedule Appointment',
        intention: 'Schedule Appointment',
        details: {
            firstName: 'Alex',
            lastName: 'Martinez',
            phone: '456-789-0125',
            email: 'alex.martinez@example.com'
        },
        messages: [
            { sender: 'Customer', text: 'When will the item be back in stock?', time: '02:25 PM' },
            { sender: 'Chatbot', text: 'We expect the item to be back in stock next month.', time: '02:26 PM' },
            { sender: 'Customer', text: 'Can I pre-order it?', time: '02:27 PM' },
            { sender: 'Chatbot', text: 'Yes, you can pre-order it on our website.', time: '02:28 PM' }
        ]
    }
};


//
function populateChats() {
    var chatList = '';
    for (var chatbotId in chatData) {
        chatList += '<div class="chatbotItem" onclick="openChat(' + chatbotId + ')">' + chatData[chatbotId].customer + '</div>';
    }
    document.getElementById('chatbotList').innerHTML = chatList;
}

function filterChats() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var chatItems = document.querySelectorAll('.chatbotItem');
    chatItems.forEach(function (item) {
        var textValue = item.textContent || item.innerText;
        if (textValue.toLowerCase().indexOf(searchInput) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}


function logout() {
    // Handle logout functionality
    // For example, you could use:
    // window.location.href = 'login.html';
}


function navigateTo(page) {
    switch (page) {
        case 'home':
            window.location.href = 'home.html';
            break;
        case 'chatbots':
            window.location.href = 'index.html';  // This line redirects to index.html when 'chatbots' is the case
            break;
        case 'settings':
            window.location.href = 'settings.html';  // This line redirects to settings.html when 'settings' is the case
            break;
        case 'analytics':
            window.location.href = 'analytics.html';  // This line redirects to analytics.html when 'analytics' is the case
            break;
        default:
            console.error('Unknown page:', page);
    }
}



function openChat(chatbotId) {
    document.getElementById('chatInterface').style.display = 'flex';
    document.getElementById('sidebar').style.display = 'block';  // Show the sidebar when a chat is clicked
    chatbotId = String(chatbotId);  // Ensure chatbotId is a string
    var chatContent = '';
    chatData[chatbotId].messages.forEach(function (message) {
        var className = message.sender.toLowerCase();
        chatContent += '<div class="message ' + className + '">' + message.text + '<span class="time-stamp">' + message.time + '</span></div>';
    });
    document.getElementById('chatContent').innerHTML = chatContent;

    var details = chatData[chatbotId].details;
    var detailsPane = document.getElementById('sidebar');
    detailsPane.innerHTML = `
        <div id="detailsHeader">Customer Details</div>
        <hr>
        <div class="detailText"><strong>First Name:</strong> ${details.firstName}</div><hr>
        <div class="detailText"><strong>Last Name:</strong> ${details.lastName}</div><hr>
        <div class="detailText"><strong>Intention:</strong> ${chatData[chatbotId].intention}</div><hr>
        <div class="detailText"><strong>Phone:</strong> ${details.phone}</div><hr>
        <div class="detailText"><strong>Email:</strong> ${details.email}</div><hr>
        <div id="contactButtons">
            <button class="contactBtn"><i class="fas fa-phone-alt"></i></button>
            <button class="contactBtn"><i class="fas fa-envelope"></i></button>
            <button class="contactBtn"><i class="fas fa-comment-dots"></i></button>
        </div>
    `;
}

function toggleSetting(settingNumber) {
    var setting = document.getElementById('setting' + settingNumber);
    if (setting.checked) {
        console.log('Setting ' + settingNumber + ' is ON');
    } else {
        console.log('Setting ' + settingNumber + ' is OFF');
    }
}

async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/e9d35fab-ce40-40c8-b8bc-2972ee13f226",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

function setupWebhook() {
    socket.on('newMessage', (data) => {
        const { chatbotId, message } = data;

        // Do something with the received message and chatbotId
        // For example, append the message to a div
        const messageDiv = document.getElementById('messages');
        const newMessageElement = document.createElement('p');
        newMessageElement.textContent = `Chatbot ${chatbotId} says: ${message.text}`;  // Assuming message.text contains the message text
        messageDiv.appendChild(newMessageElement);
    });
}

function updateChatInterface(chatbotId, message) {
    chatData[chatbotId].messages.push(message);
    openChat(chatbotId);
    var chatContent = '';
    chatData[chatbotId].messages.forEach(function (message) {
        var className = message.sender.toLowerCase();
        chatContent += '<div class="message ' + className + '">' + message.text + '<span class="time-stamp">' + message.time + '</span></div>';
    });
    document.getElementById('chatContent').innerHTML = chatContent;
}

//Initilize Connection

const socket = io('http://localhost:3000/torquegenius');


socket.on('connect', () => {
    console.log('Connected to the server');
});






async function sendMessage() {
    var message = document.getElementById('chatInput').value;
    document.getElementById('chatInput').value = '';

    // Assume the chatbotId is 6 for new conversations (adjust this as needed)
    var chatbotId = 6;
    socket.emit('sendMessage', { chatbotId, message });
}

document.getElementById('chatInput').addEventListener('keypress', function (event) {
    if (event.keyCode == 13 || event.which == 13) {  // 13 is the keyCode for the "Enter" key
        event.preventDefault();  // Prevents the default action of the "Enter" key (which is to create a new line)
        sendMessage();
    }
});

// Assume data comes from your backend or an API
// Chat Chart
var chatCtx = document.getElementById('chatChart').getContext('2d');
var chatChart = new Chart(chatCtx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
            label: '# of Chats',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Intentions Chart
var intentionsCtx = document.getElementById('intentionsChart').getContext('2d');
var intentionsChart = new Chart(intentionsCtx, {
    type: 'pie',
    data: {
        labels: ['Buy Car', 'Trade in', 'General Enquiry'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
});
