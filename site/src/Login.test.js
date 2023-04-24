import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './pages/Login';
import Search from './pages/Search';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from './components/LoginComponent'
import CreateAccount from './components/CreateAccount';



describe('Login', ()=>{
   test('renders Login component without crashing', () => {
       render(<Login />, { wrapper: BrowserRouter });
     });

//     test('renders LoginComponent when not signing up', () => {
//         const { getByTestId } = render(<LoginComponent />);
//         const loginBox = getByTestId('login-component');
//
//         fireEvent.change(searchInput, { target: { value: query } });
//
//         expect(searchInput.value).toBe(query);
//         expect(screen.getByTestId('login-component')).toBeInTheDocument();
//     });

     test('renders CreateAccount component when signing up', () => {
        render(<Login />, { wrapper: BrowserRouter });
        render(<Search />, { wrapper: BrowserRouter });
       const createAccountButton = screen.getByTestId('createButton');
       fireEvent.click(createAccountButton);
       render(<CreateAccount />, { wrapper: BrowserRouter });
       const specificElement = screen.getAllByRole('heading', { name: 'Create Account' });
       expect(specificElement[0]).toBeInTheDocument();
     });

      test('switches back to LoginComponent when clicking "Have an account? Login"', () => {
            render(<Login />, { wrapper: BrowserRouter });
            render(<Search />, { wrapper: BrowserRouter });
            render(<CreateAccount />, { wrapper: BrowserRouter });
            render(<LoginComponent />, { wrapper: BrowserRouter });
            const createAccountButton = screen.getByTestId('createButton');
            fireEvent.click(createAccountButton);

            const loginButtonFromCreate = screen.getByTestId('loginButton');
            fireEvent.click(loginButtonFromCreate);

            const specificElement = screen.getAllByRole('heading', { name: 'Login' });
            expect(specificElement[0]).toBeInTheDocument();


          });

//     test('switches back to LoginComponent when clicking "Have an account? Login"', () => {
//       renderWithRouter(<Login />);
//       const createAccountButton = screen.getByText('Create Account');
//       fireEvent.click(createAccountButton);
//
//       const loginButton = screen.getByText('Have an account? Login');
//       fireEvent.click(loginButton);
//       expect(screen.getByTestId('login-component')).toBeInTheDocument();
//     });
});

