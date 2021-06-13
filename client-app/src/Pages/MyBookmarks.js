import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyBookmarks = () => {

    const { user } = useAuthContext();
    const [bookmarks, setBookmarks] = useState([]);
    const [editId, setEditId] = useState(0);
    const [title, setTitle] = useState();

    const getMyBookmarks = async () => {
        const { data } = await axios.get(`/api/bookmarks/getbookmarks?id=${user.id}`);
        setBookmarks(data);
    };

    useEffect(() => {
        getMyBookmarks();
    }, []);

    const onDeleteClick = async id => {
        await axios.post(`api/bookmarks/delete?id=${id}`);
        getMyBookmarks();
    }

    const editClick = b => {
        setEditId(b.id);
        setTitle(b.title);

    };

    const onTitleChange = e => {
        setTitle(e.target.value);
    };

    const update = async () => {
        await axios.post(`api/bookmarks/update?title=${title}&&id=${editId}`);
        getMyBookmarks();
        cancel();
    };

    const cancel = () => {
        setEditId(0);
        setTitle('');
    };

    const row = b => {
        return (<tr key={b.id}>
            <td>
                {editId !== b.id && b.title}
                {editId === b.id && <input type='text' value={title} className='form-control' onChange={onTitleChange} />}
            </td>
            <td><a href={b.url} target="_blank">{b.url}</a></td>
            <td>
                {editId !== b.id && <button className="btn btn-success" onClick={() => editClick(b)}>Edit Title</button>}
                {editId === b.id &&
                    <>
                        <button className="btn btn-primary" onClick={update}>Update</button>
                        <button className="btn btn-warning" onClick={cancel}>Cancel</button>
                    </>}


                <button className="btn btn-danger" onClick={() => onDeleteClick(b.id)}>Delete</button>
            </td>
        </tr>);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome back {user.firstName} {user.lastName}</h1>
                    <Link to='/add-bookmark' className='btn btn-primary btn-block'>Add Bookmark</Link>
                </div>
            </div>
            <div className="row">
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks && bookmarks.map(b => row(b))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyBookmarks;