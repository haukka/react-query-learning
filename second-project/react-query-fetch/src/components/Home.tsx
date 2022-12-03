import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';

const Home = () => {
    const { data, isLoading, isError, refetch }: any = useQuery(['cat'], () => {
        return axios.get('https://catfact.ninja/fact').then((res: any) => {
            console.log(res.data);
            return res.data;
        });
    });

    if (isError) {
        return <h1> Error </h1>;
    }

    if (isLoading) {
        return <h1> Loading...</h1>;
    }


    return (
        <div>
            <h1>Home page</h1>
            <p>{data.fact}</p>
            <button onClick={refetch}> Update the data </button>
        </div>
    );
};

export default Home;