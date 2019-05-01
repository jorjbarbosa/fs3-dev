import firebase from 'react-native-firebase';
const db = firebase.firestore();
import {Alert} from "react-native";
export const userRegister= (nome,sobrenome,email,telefone,senha) =>{
    firebase.auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(function(){
            user = firebase.auth().currentUser;
            data = {
                nome:nome,
                sobrenome:sobrenome,
                telefone:telefone
            }
            db.collection('usuario').doc(user.uid).set(data);
            Alert.alert("Foi");         
        })
        .catch(error=>{
            Alert.alert(this.errorMessage(error.code));
        });
}
errorMessage=(code)=>{
    switch(code){
        case 'auth/email-already-in-use':
            return "Este e-mail já esta cadastrado";
        case 'auth/invalid-email':
            return "E-mail inserido não é valido";
        case 'auth/weak-password':
            return "Senha Inserida é muito fraca";
        default:
            return "Ocorreu um erro inesperado";
    }
}
