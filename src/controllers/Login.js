import firebase from 'react-native-firebase';
const db = firebase.firestore();


export const userLogin = (email,senha)=>{
    const result = {
        erro:true,
        message:''
    };
    firebase.auth().signInWithEmailAndPassword(email,senha)
    .then(()=>{
        this.result.erro = false;
    }).catch((error)=>{
        this.result.erro=true;
        this.result.message= this.errorMessage(error.code);
    });
}

