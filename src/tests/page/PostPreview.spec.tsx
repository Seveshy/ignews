import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession, useSession } from 'next-auth/client'
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';
import { useRouter } from 'next/router';

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '10 de Abril'
}

jest.mock('next-auth/client');
jest.mock('../../services/prismic');
jest.mock('next/router');

describe('Posts page', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<Post post={post} />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Post excerpt")).toBeInTheDocument()
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
    });

    // it("redirects user if no subscriptions is found", async () => {
    //     const useSessionMocked = mocked(useSession)
    //     const useRouterMocked = mocked(useRouter)
    //     const pushMock = jest.fn()

    //     useSessionMocked.mockResolvedValueOnce([
    //         { activeSubscription: 'fake-active-subscription' },
    //         false
    //     ] as any)

    //    useRouterMocked.mockReturnValueOnce({
    //        push: pushMock,
    //    } as any)

    //    render(<Post post={post} />)


    //     expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    // })


    // it("loads initial data", async () => {
    //     const getPrismicClientMocked = mocked(getPrismicClient)

    //     getPrismicClientMocked.mockReturnValueOnce({
    //         getByUID: jest.fn().mockResolvedValueOnce({
    //             data: {
    //                 title: [
    //                     { type: "heading", text: "My new post" }
    //                 ],
    //                 content: [
    //                     { type: "paragraph", text: "Post content" }
    //                 ],
    //             },
    //             last_publication_date: "04-01-2021"
    //         })
    //     } as any)


    //     const response = await getServerSideProps({
    //         params: { slug: 'my-new-post' },
    //       } as any);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 post: {
    //                     slug: "my-new-post",
    //                     title: "My new post",
    //                     content: "<p>Post content</p>",
    //                     updatedAt: "01 de abril de 2021"
    //                 }
    //             }
    //         })
    //     )
    // })
})