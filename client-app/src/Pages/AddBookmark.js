import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuthContext } from '../AuthContext';

const AddBookmark = () => {
    const { user } = useAuthContext();
    const { id } = user;
    const [bookmark, setBookmark] = useState({ Title: '', Url: '', UserId: id });
    const history = useHistory();


    const onTextChange = e => {
        let copy = { ...bookmark };
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
    };

    const submitBookmark = async () => {
        await axios.post('/api/bookmarks/addbookmark', bookmark);
        history.push('/my-bookmarks');
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <input type="text" name="Title" placeholder="Title" className="form-control" onChange={onTextChange} />
                <br />
                <input type="text" name="Url" placeholder="Url" className="form-control" onChange={onTextChange} />
                <br />
                <button className="btn btn-primary" onClick={submitBookmark}>Add</button>
            </div>
        </div>
    );
};

export default AddBookmark;