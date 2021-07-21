import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('next/router', () => {
    return {
      useRouter() {
        return {
          asPath: "/",
        };
      },
    };
  });

  jest.mock('next-auth/client', () => {
      return {
          useSession() {
              return [null, false]
          }
      }
  });


describe('ActiveLink component', () => {
    it('active link renders correctly', () => {
        render (
            <Header />
        )
    expect(screen.getByText('Home')).toBeInTheDocument()
    
    })
})