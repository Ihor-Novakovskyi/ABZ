import './UsersBlock.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import useGetUsers from '../services/useGetUsersData';
import Spinner from '../Spinner/Loading';
export default function UsersBlock(props) {
    const { token, update } = props;
    const {users, load, setPages, totalPages, pages} = useGetUsers({token, update})
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
                onClick={ loadUsers } 
                className={totalPages ===  pages ? 'disable' : ''} />
        </div>
    )
}
