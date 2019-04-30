import firebase from 'react-native-firebase';
const db = firebase.firestore();

export const userRegister=(nome,sobrenome,email,telefone,senha) =>{
    const result = {
        erro:true,
        message:''
    };
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
            result.erro = false;            
        })
        .catch(error=>{
            result.erro=true;
            result.message= error.message;
        });
    return result;
}