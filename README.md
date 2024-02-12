# Mini Trello Task Tracker

The Mini Trello Task Tracker (`mini_trello_tt`) is a lightweight project management tool inspired by Trello. It allows users to create, update, and organize tasks across different columns, such as TODO, IN PROGRESS, and DONE, with features like drag-and-drop for task reordering and a mock GraphQL server for backend simulation.

https://github.com/mykrenko/Mini-Trello/assets/132960479/7fb815c9-a9a4-43b8-ae5c-31328af05070

## Features

- **Task Management**: Create, update, and delete tasks.
- **Drag-and-Drop**: Reorder tasks within and across columns.
- **Sorting**: Organize tasks by creation date or in their original order.
- **Mock GraphQL Server**: Simulate backend functionality for development and testing.
- **Responsive UI**: Built with TailwindCSS for a responsive design that works on desktop and mobile devices.

## Technologies

- React 18 for the frontend.
- Apollo Client 3.9 for state management and GraphQL operations.
- TailwindCSS for styling.
- Vite as the build tool for fast development and production builds.
- ESLint for code linting.

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mykrenko/Mini-Trello.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. (Optional) Start the mock GraphQL server in a separate terminal:

   ```bash
   npm run mock-server-start
   ```

### Usage

After starting the development server, the application will be available at `http://localhost:3000`. Use the interface to add, update, delete, and reorder tasks.

## Scripts

- `npm run dev`: Start the Vite development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run preview`: Preview the production build locally.
- `npm run mock-server-start`: Start the mock GraphQL server.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes or enhancements.

## License

This project is open-source and available under the [MIT License](LICENSE).
