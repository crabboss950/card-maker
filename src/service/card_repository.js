import firebaseApp from "./firebase";

class CaedRepository {
    saveCard(userId, card){
        firebaseApp.database().ref(`${userId}/${card.id}`).set(card);
    }

    removeCard(userId, card){
        firebaseApp.database().ref(`${userId}/${card.id}`).remove();
    }
}

export default CaedRepository;