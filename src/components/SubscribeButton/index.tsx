import { Session } from "next-auth"
import { useSession, signIn } from "next-auth/client"
import { useRouter } from "next/router"
import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripe-js"
import styles from "./styles.module.scss"


interface UserSubscriptionSession extends Session {
    activeSubscription?: any;
}

export type SessionProps = [UserSubscriptionSession, boolean]

export default function SubscribeButton() {
    const [session]: SessionProps = useSession()
    const router = useRouter()

    async function handleSubscribe() {
        if (!session) {
            return signIn("github")
        }

        if (session?.activeSubscription) {
            return router.push("/posts")
        }

        try {
            const response = await api.post("/subscribe")

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <button
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >Subscribe now</button>
    )
}