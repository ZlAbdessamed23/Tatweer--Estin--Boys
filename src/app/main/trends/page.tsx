// "use client"

// import React from 'react'
// import TrendsPieChart from './components/TrendsPieChart';
// import BankCardDisplay from './components/BankCardDisplay';
// import CardForm from './components/CardForm';

// const Trends = () => {

//     const fetchedData = [
//         { name: 'Field A', value: 400 },
//         { name: 'Field B', value: 300 },
//         { name: 'Field C', value: 300 },
//         { name: 'Field D', value: 200 },
//     ];

//     const fakeBankCardData = [
//         {
//             cardId: "1",
//             cardType: "Visa",
//             cardHolderName: "John Doe",
//             cardNumber: "1234 5678 9012 3456",
//             cardExpirationDate: "12/26"
//         },
//         {
//             cardId: "2",
//             cardType: "MasterCard",
//             cardHolderName: "Jane Smith",
//             cardNumber: "9876 5432 1098 7654",
//             cardExpirationDate: "11/24"
//         },
//         {
//             cardId: "3",
//             cardType: "American Express",
//             cardHolderName: "Alice Brown",
//             cardNumber: "3782 822463 10005",
//             cardExpirationDate: "07/25"
//         }
//     ];


//     return (
//         <div>
//             <div className='flex gap-4 mb-8'>
//                 <div className='w-2/5'>
//                     <h2 className='text-xl text-main-blue font-medium mb-8'>News</h2>
//                     <TrendsPieChart data={fetchedData} />
//                 </div>
//                 <div className='flex flex-col gap-8'>
//                     <h2 className='text-xl text-main-blue font-medium'>Cards List</h2>
//                     {
//                         fakeBankCardData.map((data,i) => (<BankCardDisplay key={i} props={data} />))
//                     }
//                 </div>

//             </div>
//             <div className='flex gap-4'>
//                 <div className='w-2/3'>
//                     <h2 className='text-xl text-main-blue font-medium mb-8'>Add New Card</h2>
//                     <CardForm />
//                 </div>
//                 <div className='flex flex-col gap-8'>
//                     <h2 className='text-xl text-main-blue font-medium'>Cards List</h2>
//                     {
//                         fakeBankCardData.map((data,i) => (<BankCardDisplay key={i} props={data} />))
//                     }
//                 </div>

//             </div>
//         </div>
//     )
// };

// export default Trends





"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Trend {
    trandeId: string;
    trandeName: string;
    trandeDescription: string;
    trandeAmount: number;
    trandeDate: string;
}

export default function TrendingPage() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrends = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<{ trends: Trend[] }>("/api/main/trends");
            setTrends(response.data.trends);
        } catch (err) {
            const errorMessage = axios.isAxiosError(err)
                ? err.response?.data?.message
                : "Failed to fetch trends";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrends();
    }, []);

    return (
        <main className="container mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    📊 Real-Time Trends
                </h1>
            </header>

            <section className="space-y-4">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent" />
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-red-700">{error}</p>
                        <button
                            onClick={fetchTrends}
                            className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && trends.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">No trends found</h3>
                        <p className="mt-2 text-gray-500">
                            Check back later for new trending data.
                        </p>
                    </div>
                )}

                {trends.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {trends.map((trend) => (
                            <article
                                key={trend.trandeId}
                                className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold text-lg">{trend.trandeName}</h3>
                                <p className="mt-2 text-gray-600">{trend.trandeDescription}</p>
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                    <span>${trend.trandeAmount.toLocaleString()}</span>
                                    <time>
                                        {new Date(trend.trandeDate).toLocaleDateString()}
                                    </time>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}