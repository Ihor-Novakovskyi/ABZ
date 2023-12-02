import './UsersBlock.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import useGetUsers from '../services/useGetUsersData';
import Spinner from '../Spinner/Loading';
export default function UsersBlock(props) {
    const { token } = props;
    const {users, error, load, setPages, setLoad, totalPages, pages} = useGetUsers({token})
    const currentInfo = !!users.length ?
        users.map(el => <Card key={el.id} { ...el } />) :
        <Spinner/>;
    console.log('users', users)
    console.log(currentInfo)
    const loadUsers = () => { 
        setPages((prevPages) => { 
            if ((prevPages + 1) <= totalPages) { 
                return prevPages + 1
            } 
            return prevPages;
        })
        // setLoad(false);
    }
    return (
        <div className='card-block'>
            <h1 className='card-block__slogan'>
                Working with GET request
            </h1>
            <div className='card-block__cards'>
                {currentInfo}
            </div>
            { users.length !== 0 && load ?
               <Spinner/>
                :
                null }

            <Button 
                label="Show more" 
                actionClick={ loadUsers } 
                className={totalPages ===  pages ? 'disable' : ''} />
        </div>
    )
}
