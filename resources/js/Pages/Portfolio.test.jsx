import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Portfolio from './Portfolio';

// Mock the generic layout and components that might break without proper context
vi.mock('@/Layouts/MainLayout', () => ({
    default: ({ children }) => <div data-testid="main-layout">{children}</div>
}));
vi.mock('@inertiajs/react', () => ({
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ children, href }) => <a href={href}>{children}</a>,
    usePage: () => ({ props: { url: '/portfolio' } })
}));

describe('Portfolio Page', () => {
    it('renders the portfolio page title correctly', () => {
        render(<Portfolio />);
        
        // Assert that the main title exists
        expect(screen.getByText(/Kompilasi Karya/i)).toBeInTheDocument();
        expect(screen.getByText(/Inovasi Digital/i)).toBeInTheDocument();
    });

    it('renders the initial tab as Web & Application', () => {
        render(<Portfolio />);
        
        // We should see the active tab (using getAllByText because it appears in header and sidebar)
        const elements = screen.getAllByText('Web & Application');
        expect(elements.length).toBeGreaterThan(0);
    });
});
