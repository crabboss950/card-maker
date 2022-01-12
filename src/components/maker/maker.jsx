import React, { useCallback, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';


const Maker = ({FileInput, authService, cardRepository}) => {
    const navigate = useNavigate();
    const navigateState = navigate?.location?.state;
    const [cards, setCard] = useState({});
    const [userId, setUserID] = useState(navigateState && navigateState.id);

    // const navigate = useNavigate();
    const onLogout = useCallback(() => {
        authService.logout();
    }, [authService]);

    useEffect(() => {
        if (!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCard(cards);
        });
        return() => stopSync();
    }, [userId, cardRepository]);

    useEffect(() => {
        authService.onAuthChange(user => {
            if(user) {
                setUserID(user.uid);
            } else {
                navigate('/');
            }
        });
    }, [authService, userId, navigate]);

    const createOrUpdateCard = card => {
        setCard(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = card => {
        setCard(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
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
};

export default Maker;