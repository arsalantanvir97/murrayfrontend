# CNT Murray Admin Frontend

Welcome to the admin frontend repository for CNT Murray, an online invoice generator. This React-based project serves as the user interface for administrators, providing tools to manage users, invoices, and other aspects of the platform.

## Features

- **Admin Authentication**:
  - Admins can sign in to their accounts securely.
- **User Management**:
  - Admins can view a list of users, edit user details, and manage user accounts.
- **Invoice Management**:
  - Admins can register an invoice against a user, triggering an email notification containing a payment link. Admins can also view a list of invoices, update invoice details, and manage invoice statuses.
- **Email Notifications**:
  - Users receive an email containing a link to view and pay their invoice on our portal.
- **Payment Processing**:
  - Users can securely pay their invoices on our portal. Once payment is successful, the invoice status is updated automatically.
- **Dashboard**:
  - Admins have access to a dashboard providing an overview of key metrics and performance indicators.
- **Responsive Design**:
  - The frontend is fully responsive, ensuring a seamless experience across devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for managing application state.
- **React Router**: Library for handling routing in React applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **Lazy Loading**: Components are lazily loaded to improve initial loading times and optimize performance.
- **Semantic UI React**: UI framework for building responsive and accessible web apps.
- **Other Dependencies**: Check `package.json` for a full list.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/arsalantanvir97/murrayfrontend.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm start
    ```

## Usage

Once the development server is running, admins can access the CNT Murray admin frontend in their web browser. They can sign in to their accounts, view and manage users, register and manage invoices, and access the dashboard for key metrics and performance indicators.
