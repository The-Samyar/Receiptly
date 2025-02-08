import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import SignIn from './SignIn';

const mockedContextValue = {
    setRefreshToken: jest.fn()
}

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


    test('Render the component with its buttons and inputs', () => {
        renderComponent([]);
        expect(screen.getByRole('heading',/sign in/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Sign in/i})).toBeInTheDocument();
    })

    describe('Input validation', () => {
        test('Show errors when the inputs are left empty', async() => { 
            renderComponent([]);
            fireEvent.click(screen.getByRole('button', {name: /Sign in/i}));

            expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
            expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
        })
     })
})