import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Page() {

	const { data, isLoading } = useSWR('/api/getUsers', fetcher)
	if (isLoading) return <div>loading</div>
	console.log(data)
	return <h1>got {data.length} users</h1>
	
}

