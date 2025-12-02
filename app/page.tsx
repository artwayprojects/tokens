import CreateToken from '@/app/components/CreateToken'
import ListTokens from '@/app/components/SearchTokens'

export default function Home() {
    return (
        <main className="min-h-screen grid-bg relative relative z-10 max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8">
            <CreateToken />

            <ListTokens />
        </main>
    )
}
