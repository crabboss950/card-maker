import React, { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({FileInput, authService}) => {
    const [cards, setCard] = useState({
        '1':{
            id: '1',
            name: 'hajjong',
            company: 'Samsung',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'hajjong95@naver.com',
            message: 'go for it',
            fileName: 'hajjong',
            fileURL: null,
        },

        '2': {
            id: '2',
            name: 'hajjong0',
            company: 'Samsung',
            theme: 'light',
            title: 'Software Engineer',
            email: 'hajjong95@naver.com',
            message: 'go for it',
            fileName: 'hajjong',
            fileURL: 'hajjong.png'
        },

        '3': {
            id: '3',
            name: 'hajjong3',
            company: 'Samsung',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'hajjong95@naver.com',
            message: 'go for it',
            fileName: 'hajjong',
            fileURL: null,
        },
    });

    

    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if(!user) {
                navigate('/')
            }
        });
    });

    const createOrUpdateCard = card => {
        setCard(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
    };

    const deleteCard = card => {
        setCard(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
    };

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput={FileInput}
                    cards ={cards} 
                    addCard={createOrUpdateCard} 
                    updateCard={createOrUpdateCard} 
                    deleteCard={deleteCard}/>
                <Preview cards ={cards}/>
            </div>
            <Footer />
        </section>
    )
}

export default Maker;