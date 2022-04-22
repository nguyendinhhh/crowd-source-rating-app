import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('The user should be able to navigate to other sites by clicking on the Go Home and Login', () => {
    render(<Navbar />)
    screen.debug
})