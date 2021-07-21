import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
    return {
      useRouter() {
        return {
          asPath: "/",
        };
      },
    };
  });


describe('ActiveLink component', () => {
    it('active link renders correctly', () => {
        render (
          <ActiveLink href="/" activeClassName="active">
              <a>Home</a>
          </ActiveLink>
        )
    });

    it('active link renders correctly', () => {
        render (
          <ActiveLink href="/" activeClassName="active">
              <a>Home</a>
          </ActiveLink>
        )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Home')).toHaveClass('active') 
    
  });
})