import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import SignIn from './SignIn';
import { LOGIN } from '../../../GraphQL/Auth';

const mockedContextValue = {
    setRefreshToken: jest.fn()
}

const mockLoginSuccess = {
    request: {
        query: LOGIN,
        variables: { username: 'testuser', password: 'password123' },
    },
    result: {
        data: {
            tokenAuth: {
                success: true,
                token: { token: 'access-token' },
                refreshToken: { token: 'refresh-token' },
            },
        },
    },
};

const mockLoginFailure = {
    request: {
        query: LOGIN,
        variables: { username: 'wronguser', password: 'wrongpassword' },
    },
    error: new Error('Invalid credentials'),
};

const mockGraphQLError = {
    request: {
        query: LOGIN,
        variables: { username: 'testuser', password: 'password123' },
    },
    error: new Error('Internal Server Error'),
};

const renderComponent = (mocks) => {
    return render(
        <MockedProvider mocks={mocks}>
            <MemoryRouter>
                <AuthContext.Provider value={mockedContextValue}>
                    <SignIn />
                </AuthContext.Provider>
            </MemoryRouter>
        </MockedProvider>
    )
}

describe('SignIn component', () => {

    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem')
        jest.spyOn(console, "log").mockImplementation(() => { });
        localStorage.setItem.mockClear();
        mockedContextValue.setRefreshToken.mockClear();
    })


    test('Render the component with its buttons and inputs', () => {
        renderComponent([]);
        expect(screen.getByRole('heading', /sign in/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    })

    describe('Input validation', () => {
        test('Show errors when the inputs are left empty', async () => {
            renderComponent([]);
            fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

            expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
            expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
        })

        test('Show error when the password is short', async () => {
            renderComponent([]);
            fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } })
            fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "123" } })

            fireEvent.click(screen.getByRole('button', { name: /Sign In/i }))

            expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument()
        })
    })

    describe('Authentication', () => {
        test('Success scenario: get refresh and access tokens', async () => {
            renderComponent([mockLoginSuccess])
            fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } })
            fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } })

            fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

            await waitFor(() => expect(mockedContextValue.setRefreshToken).toHaveBeenCalledWith('refresh-token'))
            expect(localStorage.setItem).toHaveBeenCalledWith('Access', 'access-token');
        })

        test('Failure scenario: get error when login fails', async () => {
            renderComponent([mockLoginFailure]);

            fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wronguser' } })
            fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } })

            fireEvent.click(screen.getByRole('button', { name: /Sign In/i }))

            await waitFor(() =>
                expect(console.log).toHaveBeenNthCalledWith(
                    2, // Check the second call
                    "An error has occurred ",
                    "Invalid credentials"
                )
            );
        })
    })
})