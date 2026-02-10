import { useRouter } from 'next/navigation'

const useHandle = () => {
    const router = useRouter()

    const handleClickMovie = (id: string | number) => {
        router.push(`/movie/detail/${id}`)
    }

    const handleClickViewMovie = (id: string | number) => {
        router.push(`/movie/view-movie/${id}`)
    }

    return {
        handleClickMovie,
        handleClickViewMovie
    }
}

export default useHandle