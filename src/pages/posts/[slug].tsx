import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { Head } from "next/document";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from "./post.module.scss"

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            {/* <Head>
        <title>{post.title} | Ignews</title>
      </Head> */}

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    )
}

interface UserSubscriptionSession extends Session {
    activeSubscription?: any;
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    // check if user signed in
    const session: UserSubscriptionSession = await getSession({ req })

    // check if user has a subscription
    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const prismic = getPrismicClient(req)
    const { slug } = params
    const response = await prismic.getByUID("post", String(slug), {})

    let post = {}

    if (response) {
        post = {
            slug,
            title: RichText.asText(response.data.title),
            content: RichText.asHtml(response.data.content),
            updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        }
    }

    return {
        props: { post }
    }
}