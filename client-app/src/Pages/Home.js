import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {

    const [topUrl, setTopUrl] = useState([]);

    useEffect(() => {
        const getTopUrl = async () => {
            const { data } = await axios.get('/api/bookmarks/gettop5');
            setTopUrl(data);
        };
        getTopUrl();
    })

    const row = (u) => {
        return (
            <tr key={u.url}>
                <td><a href={u.url} target="_blank">{u.url}</a></td>
                <td>{u.count}</td>
            </tr>);
    }

    return (
        <>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <div className="row">
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topUrl && topUrl.map(u => row(u))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Home;