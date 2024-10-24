# Todo-List Management Application

A todo-list management application

## Features

- Add tasks to todo-list
- Mark task as complete/incomplete
- Delete tasks from list
- Persist data with local storage (or external storage)
- Drag and drop tasks in lists
- Responsive design

## Technologies Used

- React.js
- react-beautiful-dnd (for drag-and-drop functionality)
- Tailwind CSS (for styling)
- JavaScript (ES6+)
- TypeScript
- Local Storage (for data storage)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aladefaruk/tudu.git

2. **Navigate to the project directory:**

   ```bash
   cd tudu

3. **Install dependencies:**

   ```bash
   npm install

### Running the Project

1. **Start the development server:**

   ```bash
   npm start

2. **Open the application in your browser:**
- The application will be available at http://localhost:3000
- Run this command on you browser console on starting the app: localStorage.clear()


### Building the Project

1. **Build the project:**

   ```bash
   npm run build


### Walkthrough the functionalities

1. **To Add a new task**

- Enter task name into the input form field provided and click the "Add +" button

2. **Toggling task as complete/incomplete**

- Toggle the check box infront of the task name to mark tasks as complete/incomplete
  - For completed task, you will see a line through the task name

2. **Toggling task as complete/incomplete**

- Click the delete button to delete corresponding task

3. **Tasks**

- Reorder the tasks vertically by simply dragging the task up and down 
